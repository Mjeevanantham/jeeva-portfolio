"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  onClick?: () => void;
  asChild?: boolean;
}

/**
 * Magnetic Button Component
 * 
 * Button with magnetic hover effect that follows the cursor.
 */
export function MagneticButton({
  children,
  className,
  magneticStrength = 0.3,
  onClick,
  asChild = false,
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 500,
    damping: 100,
  });
  const mouseYSpring = useSpring(y, {
    stiffness: 500,
    damping: 100,
  });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * magneticStrength);
    y.set(yPct * magneticStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      className: cn("relative", className, (children.props as { className?: string }).className),
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onClick,
      style: {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...((children.props as { style?: React.CSSProperties }).style || {}),
      },
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
        }}
        className="block"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
