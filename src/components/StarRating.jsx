import React, { useState } from "react";
import { motion } from "framer-motion";

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

export function StarDisplay({ rating, size = "sm" }) {
  const sizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
  const sz = sizes[size] || sizes.sm;

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sz} ${star <= Math.round(rating) ? "star-filled" : "star-empty"} transition-colors`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

export function StarInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const labels = ["", "Tệ", "Chán", "Ổn", "Tốt", "Xuất sắc"];

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hovered || value);
        return (
          <motion.button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            whileHover={{ scale: 1.25, rotate: -6 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="relative"
          >
            <svg
              className={`w-9 h-9 transition-all duration-200 ${
                active ? "text-amber-400" : "text-slate-700"
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
              style={
                active
                  ? { filter: "drop-shadow(0 0 10px rgba(251,191,36,0.7))" }
                  : undefined
              }
            >
              <path d={STAR_PATH} />
            </svg>
          </motion.button>
        );
      })}
      {value > 0 && (
        <motion.span
          key={value}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-2 font-display font-semibold text-amber-400"
        >
          {labels[value]}
        </motion.span>
      )}
    </div>
  );
}
