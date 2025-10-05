import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const variantsByMode = (mode) => {
  switch (mode) {
    case "zoom":       // zoom-in khi vào, zoom-out khi rời
      return {
        initial: { opacity: 0, scale: 0.94 },
        animate: { opacity: 1, scale: 1 },
        exit:    { opacity: 0, scale: 1.04 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      };
    case "fade":
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit:    { opacity: 0 },
        transition: { duration: 0.18, ease: "linear" },
      };
    case "slideUp":
      return {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit:    { opacity: 0, y: -30 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
      };
    case "slide":     // mặc định cũ (ngang)
    default:
      return {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        exit:    { opacity: 0, x: -30 },
        transition: { duration: 0.18, ease: "linear" },
      };
  }
};

export default function PageTransitionWrapper({
  children,
  mode = "slide",          // 'slide' | 'zoom' | 'fade' | 'slideUp'
  duration,                // optional override thời lượng
  ease,                    // optional override ease
  presenceMode = "sync",   // 'sync' | 'wait' | 'popLayout'
}) {
  const location = useLocation();
  const v = variantsByMode(mode);
  const transition = {
    ...v.transition,
    ...(duration ? { duration } : {}),
    ...(ease ? { ease } : {}),
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode={presenceMode} initial={false}>
        <motion.div
          key={location.key || location.pathname}
          style={{ position: "absolute", inset: 0 }}
          initial={v.initial}
          animate={v.animate}
          exit={v.exit}
          transition={transition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
