import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ease = [0.76, 0, 0.24, 1] as [number, number, number, number];

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "revealing" | "done">("counting");

  // Counter animation: 0 → 100
  useEffect(() => {
    if (phase !== "counting") return;

    const duration = 1800; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out curve so it accelerates at start, decelerates at end
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(100);
        // Brief pause at 100, then reveal
        setTimeout(() => setPhase("revealing"), 300);
      }
    };

    // Small delay before counter starts
    const timer = setTimeout(() => requestAnimationFrame(tick), 400);
    return () => clearTimeout(timer);
  }, [phase]);

  // After curtain lifts, signal completion
  useEffect(() => {
    if (phase === "revealing") {
      const timer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  // Want space between words fix this
  const nameLetters = "AELISHALA MANOJ".split("");

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
          initial={{ y: 0 }}
          animate={phase === "revealing" ? { y: "-100%" } : { y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease }}
        >
          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Centered name with staggered letter animation */}
          <div className="relative flex items-center gap-[2px] md:gap-1">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="font-sans font-black text-4xl md:text-8xl lg:text-9xl tracking-tighter text-white inline-block"
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: "inline-block", perspective: "400px" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
            {/* ® symbol */}
            <motion.span
              className="font-sans text-sm md:text-xl font-medium text-white/60 -mt-8 md:-mt-12 ml-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              ®
            </motion.span>
          </div>

          {/* Subtitle */}
          <motion.p
            className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30 mt-4 md:mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            Software Engineer
          </motion.p>

          {/* Counter */}
          <motion.div
            className="absolute bottom-10 md:bottom-14 right-8 md:right-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <span className="font-sans font-black text-5xl md:text-7xl tabular-nums tracking-tight text-white/10">
              {String(count).padStart(3, "0")}
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
            <motion.div
              className="h-full bg-white/40"
              initial={{ width: "0%" }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Top-left year label */}
          <motion.span
            className="absolute top-8 left-8 md:top-10 md:left-10 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Portfolio / 2026
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
