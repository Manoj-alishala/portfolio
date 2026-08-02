import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Direction the content slides in from. Default: "up" */
  direction?: "up" | "down" | "left" | "right";
  /** Delay before animation starts (seconds). Default: 0 */
  delay?: number;
  /** Animation duration (seconds). Default: 0.8 */
  duration?: number;
  /** Distance to slide in pixels. Default: 60 */
  distance?: number;
  /** Only animate once. Default: true */
  once?: boolean;
}

const getInitial = (direction: string, distance: number) => {
  switch (direction) {
    case "down":
      return { opacity: 0, y: -distance };
    case "left":
      return { opacity: 0, x: distance };
    case "right":
      return { opacity: 0, x: -distance };
    case "up":
    default:
      return { opacity: 0, y: distance };
  }
};

const SectionReveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 60,
  once = true,
}: SectionRevealProps) => {
  const initial = getInitial(direction, distance);

  const variants: Variants = {
    hidden: {
      ...initial,
      transition: { duration: duration * 0.6 },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
