import type { PropsWithChildren } from "react";
import Reveal from "./reveal/Reveal.tsx";

type Props = PropsWithChildren<{
  id: string;
  title?: string;
  className?: string;
}>;

export default function Section({ id, title, className, children }: Props) {
  return (
    <section id={id} className={`section ${className ?? ""}`}>
      <div className="sectionInner">
        {title && (
          <Reveal>
            <div className="sectionHeader">
              <h3 className="h3">{title}</h3>
              <div className="hairline" />
            </div>
          </Reveal>
        )}
        <div className="sectionBody">{children}</div>
      </div>
    </section>
  );
}
