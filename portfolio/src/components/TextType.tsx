import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { gsap } from "gsap";
import "./TextType.css";

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;

  text: string | string[];
  as?: ElementType;

  typingSpeed?: number;
  deletingSpeed?: number;

  initialDelay?: number;
  pauseDuration?: number;
  loop?: boolean;

  variableSpeed?: { min: number; max: number };

  startOnVisible?: boolean;
  reverseMode?: boolean;

  smartDelete?: boolean;
}

type Segments = { prefix: string; core: string; suffix: string };

function computeSegments(
  from: string,
  to: string
): { fromSeg: Segments; toSeg: Segments } {
  const a = from;
  const b = to;
  const minLen = Math.min(a.length, b.length);

  // common prefix
  let p = 0;
  while (p < minLen && a[p] === b[p]) p++;
    // common suffix
  let s = 0;
  while (
    s < minLen - p &&
    a[a.length - 1 - s] === b[b.length - 1 - s]
  )
    s++;

  return {
    fromSeg: {
      prefix: a.slice(0, p),
      core: a.slice(p, a.length - s),
      suffix: a.slice(a.length - s),
    },
    toSeg: {
      prefix: b.slice(0, p),
      core: b.slice(p, b.length - s),
      suffix: b.slice(b.length - s),
    },
  };
}

export default function TextType({
  text,
  as: Component = "div",

  typingSpeed = 85, 
  deletingSpeed = 55, 
  initialDelay = 250,
  pauseDuration = 1800,
  loop = true,

  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "▎",
  cursorClassName = "",
  cursorBlinkDuration = 0.55,

  variableSpeed = { min: 70, max: 140 },

  startOnVisible = false,
  reverseMode = false,
  smartDelete = true,

  ...props
}: TextTypeProps & HTMLAttributes<HTMLElement>) {
  const textArray = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );

  const [prefix, setPrefix] = useState("");
  const [core, setCore] = useState("");
  const [suffix, setSuffix] = useState("");

  const [isVisible, setIsVisible] = useState(!startOnVisible);

  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idxRef = useRef(0);

  // invalidates stale timeouts when effect restarts
  const runIdRef = useRef(0);

  const clearTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const getDelayForType = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getText = useCallback(
    (i: number) => {
      const raw = textArray[i] ?? "";
      return reverseMode ? raw.split("").reverse().join("") : raw;
    },
    [textArray, reverseMode]
  );

  // Start on visible
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.1 }
    );

    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [startOnVisible]);

  // Cursor blink
  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;

    gsap.set(cursorRef.current, { opacity: 1 });
    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      tween.kill();
    };
  }, [showCursor, cursorBlinkDuration]);

  // Main engine (one loop, stable)
  useEffect(() => {
    if (!isVisible) return;

    // New run id => any old timeouts become no-ops
    runIdRef.current += 1;
    const runId = runIdRef.current;

    clearTimer();
    idxRef.current = 0;

    // reset display
    setPrefix("");
    setSuffix("");
    setCore("");

    const typeString = (full: string, done: () => void) => {
      let i = 0;
      const step = () => {
        if (runId !== runIdRef.current) return;
        if (i >= full.length) return done();

        const ch = full.charAt(i);
        if (!ch) return done(); 
        setCore((prev) => prev + ch);

        i += 1;
        timeoutRef.current = setTimeout(step, getDelayForType());
      };
      timeoutRef.current = setTimeout(step, initialDelay);
    };

    const deleteString = (str: string, done: () => void) => {
      let i = str.length;
      const step = () => {
        if (runId !== runIdRef.current) return;
        if (i <= 0) return done();

        i -= 1;
        setCore(str.slice(0, i));
        timeoutRef.current = setTimeout(step, deletingSpeed);
      };
      timeoutRef.current = setTimeout(step, deletingSpeed);
    };

    const cycle = () => {
      if (runId !== runIdRef.current) return;

      const idx = idxRef.current;
      const nextIdx = (idx + 1) % textArray.length;

      // stopping condition
      if (!loop && idx === textArray.length - 1) return;

      const from = getText(idx);
      const to = getText(nextIdx);

      if (!smartDelete) {
        setPrefix("");
        setSuffix("");
        setCore(from);

        timeoutRef.current = setTimeout(() => {
          if (runId !== runIdRef.current) return;

          deleteString(from, () => {
            if (runId !== runIdRef.current) return;

            timeoutRef.current = setTimeout(() => {
              if (runId !== runIdRef.current) return;

              setCore("");
              typeString(to, () => {
                if (runId !== runIdRef.current) return;

                idxRef.current = nextIdx;
                timeoutRef.current = setTimeout(cycle, pauseDuration);
              });
            }, 120);
          });
        }, pauseDuration);

        return;
      }

      const { fromSeg, toSeg } = computeSegments(from, to);

      setPrefix(fromSeg.prefix);
      setSuffix(fromSeg.suffix);
      setCore(fromSeg.core);

      timeoutRef.current = setTimeout(() => {
        if (runId !== runIdRef.current) return;

        deleteString(fromSeg.core, () => {
          if (runId !== runIdRef.current) return;

          timeoutRef.current = setTimeout(() => {
            if (runId !== runIdRef.current) return;

            let j = 0;
            const step = () => {
              if (runId !== runIdRef.current) return;

              if (j >= toSeg.core.length) {
                idxRef.current = nextIdx;
                timeoutRef.current = setTimeout(cycle, pauseDuration);
                return;
              }

              const ch = toSeg.core.charAt(j);
              if (!ch) {
                idxRef.current = nextIdx;
                timeoutRef.current = setTimeout(cycle, pauseDuration);
                return;
              }

              setCore((prev) => prev + ch);
              j += 1;
              timeoutRef.current = setTimeout(step, getDelayForType());
            };

            setPrefix(toSeg.prefix);
            setSuffix(toSeg.suffix);
            setCore("");
            timeoutRef.current = setTimeout(step, getDelayForType());
          }, 120);
        });
      }, pauseDuration);
    };

    const first = getText(0);
    typeString(first, () => {
      if (runId !== runIdRef.current) return;
      timeoutRef.current = setTimeout(cycle, pauseDuration);
    });

    return () => {
      // invalidate callbacks + clear pending timer
      runIdRef.current += 1;
      clearTimer();
    };
  }, [
    isVisible,
    textArray.length,
    getText,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
    loop,
    smartDelete,
    getDelayForType,
  ]);

  const fullDisplayed = `${prefix}${core}${suffix}`;
  const shouldHideCursor = hideCursorWhileTyping && core.length > 0;

  return createElement(
    Component,
    { ref: containerRef, className: `text-type ${className}`, ...props },
    <span className="text-type__content">{fullDisplayed}</span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`text-type__cursor ${cursorClassName} ${
          shouldHideCursor ? "text-type__cursor--hidden" : ""
        }`}
      >
        {cursorCharacter}
      </span>
    )
  );
}
