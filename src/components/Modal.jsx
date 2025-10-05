import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  isOpen,
  onClose,
  children,
  animation = "slideZoom",   // "slide" | "zoom" | "slideZoom"
  direction = "right",        // "left" | "right" | "up" | "down"
  duration = 0.4,
  className
}) {
  // helper: trả về offset theo hướng
  const offset = (dir, axis = "x") => {
    const map = {
      left:  { x: "-100vw", y: 0 },
      right: { x: "100vw",  y: 0 },
      up:    { x: 0,        y: "-100vh" },
      down:  { x: 0,        y: "100vh" },
    }[dir];
    return axis === "x" ? map.x : map.y;
  };

  const slideHidden  = { x: offset(direction, "x"), y: offset(direction, "y"), opacity: 0 };
  const slideVisible = { x: 0, y: 0, opacity: 1, transition: { type: "tween", duration } };
  const slideExit    = { x: offset(opposite(direction), "x"), y: offset(opposite(direction), "y"), opacity: 0, transition: { duration } };

  const zoomHidden   = { scale: 0.9, opacity: 0 };
  const zoomVisible  = { scale: 1,   opacity: 1, transition: { scale: { type: "spring", stiffness: 260, damping: 20 }, opacity: { duration: Math.min(0.25, duration) } } };
  const zoomExit     = { scale: 0.9, opacity: 0, transition: { duration: Math.max(0.3, duration) } };

  const variants = (() => {
    if (animation === "slide") return { hidden: slideHidden, visible: slideVisible, exit: slideExit };
    if (animation === "zoom")  return { hidden: zoomHidden,  visible: zoomVisible,  exit: zoomExit };
    // slideZoom (kết hợp)
    return {
      hidden: { ...slideHidden, ...zoomHidden },
      visible:{ ...slideVisible, ...zoomVisible },
      exit:   { ...slideExit,   ...zoomExit },
    };
  })();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
        {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
              relative z-[110] p-4  border-2 border-transparent
              min-w-[85%] max-w-[85%] min-h-[250px]
              bg-gradient-to-tl from-black/90 to-sky-900/95 to-90% bg-clip-padding
              [border-image:linear-gradient(to_bottom,rgba(56,189,248,.95),rgba(56,189,248,.10))_1]

              ${className}
            `}
          >
            <div className="">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// tiện ích: trả về hướng ngược lại
function opposite(dir) {
  return { left: "right", right: "left", up: "down", down: "up" }[dir] || "left";
}
