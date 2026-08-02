import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const RESUME_URL = "https://drive.google.com/file/d/1ZfSO6wkhTkf9Y4Txt7Sdb3JjH0GlhTcK/view?usp=sharing";
const RESUME_PREVIEW_URL = "https://drive.google.com/file/d/1ZfSO6wkhTkf9Y4Txt7Sdb3JjH0GlhTcK/preview";
const RESUME_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1ZfSO6wkhTkf9Y4Txt7Sdb3JjH0GlhTcK";

const ResumeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="relative bg-black text-white font-sans overflow-hidden"
      style={{ minHeight: showPreview ? "auto" : "100vh" }}
    >
      {/* Animated background grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Parallax gradient accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y: bgY }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <motion.div
          className="w-full max-w-[1400px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section label */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-white/30" />
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
                Résumé
              </h2>
            </div>
          </motion.div>

          {/* Big headline */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="mb-12 md:mb-20"
          >
            <h3 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.9] tracking-tighter">
              My Full
              <br />
              <span className="relative inline-block">
                Story
                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] md:h-[4px] bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ width: "100%" }}
                />
              </span>
            </h3>
          </motion.div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              <p className="text-base md:text-lg font-normal leading-relaxed text-white/70">
                Education, certifications, technical skills, work experience,
                and project highlights — all in one place. Download my resume
                for the complete picture.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[
                  { value: "3+", label: "Certifications" },
                  { value: "4+", label: "Projects" },
                  { value: "8.1", label: "CGPA" },
                ].map(({ value, label }) => (
                  <motion.div
                    key={label}
                    className="flex flex-col"
                    variants={itemVariants}
                  >
                    <span className="text-3xl md:text-4xl font-black tracking-tight">
                      {value}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 mt-1">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              {/* Primary CTA — Download Resume */}
              <a
                href={RESUME_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative block overflow-hidden border border-white/20 hover:border-white/60 transition-colors duration-500"
              >
                {/* Hover fill effect */}
                <motion.span
                  className="absolute inset-0 bg-white z-0"
                  initial={{ x: "-101%" }}
                  animate={{ x: isHovered ? "0%" : "-101%" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="relative z-10 flex items-center justify-between px-6 md:px-10 py-6 md:py-8">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight transition-colors duration-300 ${isHovered ? "text-black" : "text-white"}`}
                    >
                      Download Resume
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${isHovered ? "text-black/50" : "text-white/40"}`}
                    >
                      PDF • Manoj Aelishala
                    </span>
                  </div>

                  {/* Arrow icon */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border transition-all duration-300 ${isHovered ? "border-black/20 bg-black" : "border-white/20"}`}
                  >
                    <svg
                      className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isHovered ? "text-white" : "text-white"}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Secondary CTAs row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* View Online */}
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border border-white/10 hover:border-white/30 px-6 py-4 transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span className="text-sm font-bold uppercase tracking-wider text-white/60 group-hover:text-white transition-colors duration-300">
                    View on Google Drive
                  </span>
                </a>

                {/* Preview inline toggle */}
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="group flex items-center gap-3 border border-white/10 hover:border-white/30 px-6 py-4 transition-all duration-300 bg-transparent cursor-pointer text-left"
                >
                  <svg
                    className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {showPreview ? (
                      <path d="M18 6L6 18M6 6l12 12" />
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                  <span className="text-sm font-bold uppercase tracking-wider text-white/60 group-hover:text-white transition-colors duration-300">
                    {showPreview ? "Hide Preview" : "Preview Here"}
                  </span>
                </button>
              </div>

              {/* Embedded preview */}
              <motion.div
                initial={false}
                animate={{
                  height: showPreview ? "80vh" : 0,
                  opacity: showPreview ? 1 : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden rounded-sm border border-white/10"
              >
                {showPreview && (
                  <iframe
                    src={RESUME_PREVIEW_URL}
                    title="Resume Preview"
                    className="w-full h-full min-h-[80vh]"
                    style={{ border: "none" }}
                    allow="autoplay"
                    loading="lazy"
                  />
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom decorative line */}
          <motion.div
            className="mt-20 md:mt-28 flex items-center gap-4"
            variants={itemVariants}
          >
            <span className="flex-1 h-[1px] bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
              Scroll to continue
            </span>
            <span className="flex-1 h-[1px] bg-white/10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
