import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children }: PropsWithChildren) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.3, ease: [0.1, 0.3, 0.2, 0.8] }}
    >
      {children}
    </motion.div>
  );
}
