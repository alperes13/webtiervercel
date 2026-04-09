"use client";
import { cn } from "@/lib/utils";
import {
  type HTMLMotionProps,
  type Variants,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useMemo } from "react";

const motionElements = {
  article: motion.article,
  div: motion.div,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementTag = keyof typeof motionElements;

interface TimelineContentProps extends HTMLMotionProps<"div"> {
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  as?: MotionElementTag;
}

export const TimelineContent = ({
  animationNum,
  timelineRef,
  customVariants,
  children,
  className,
  as: Component = "div",
  ...props
}: TimelineContentProps) => {
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const range = useMemo(() => {
    const start = animationNum * 0.1;
    const end = start + 0.1;
    return [start, end];
  }, [animationNum]);

  const opacity = useTransform(scrollYProgress, range, [0, 1]);
  const y = useTransform(scrollYProgress, range, [20, 0]);

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const MotionComponent = motionElements[Component];

  return (
    <MotionComponent
      style={{ opacity, y }}
      className={cn(className)}
      variants={customVariants || defaultVariants}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
