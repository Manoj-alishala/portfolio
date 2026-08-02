import { motion } from "framer-motion";
import { useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  relationship: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Manoj consistently demonstrated exceptional problem-solving skills during his internship. His ability to automate complex data pipelines and improve report accuracy by 30% was remarkable for someone at his level.",
    name: "Bluestock Fintech",
    role: "Internship Supervisor",
    relationship: "SDE Internship — Nov–Dec 2025",
  },
  {
    quote:
      "One of the most dedicated students I've worked with. Manoj doesn't just complete assignments — he builds production-grade solutions. His AI Resume Analyzer project was genuinely innovative.",
    name: "SR University",
    role: "Faculty Advisor",
    relationship: "B.Tech CSE — Data Science",
  },
  {
    quote:
      "Working with Manoj on the VChat project was a great experience. He architected the entire WebRTC signaling system and Socket.io messaging layer — the kind of engineering depth you rarely see from peers.",
    name: "Project Collaborator",
    role: "Peer Developer",
    relationship: "VChat Application",
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
      transition: { duration: 0.8, ease },
    },
  };

  return (
    <section className="w-full bg-black text-white font-sans py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
      <motion.div
        className="max-w-[1400px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 mb-16 md:mb-24"
        >
          <span className="w-12 h-[1px] bg-white/30" />
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            Testimonials
          </h2>
        </motion.div>

        {/* Main quote area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Quote */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8"
          >
            <motion.blockquote
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease }}
              className="relative"
            >
              {/* Large opening quote mark */}
              <span className="absolute -top-6 -left-2 md:-top-10 md:-left-4 text-6xl md:text-8xl font-black text-white/5 leading-none select-none">
                "
              </span>

              <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug tracking-tight relative z-10">
                {testimonials[activeIndex].quote}
              </p>

              <div className="mt-8 flex flex-col gap-1">
                <span className="text-base md:text-lg font-bold">
                  — {testimonials[activeIndex].name}
                </span>
                <span className="text-sm text-white/50">
                  {testimonials[activeIndex].role}
                </span>
                <span className="text-xs text-white/30 uppercase tracking-wider mt-1">
                  {testimonials[activeIndex].relationship}
                </span>
              </div>
            </motion.blockquote>
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`group text-left px-5 py-4 border transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? "border-white/30 bg-white/5"
                      : "border-white/8 hover:border-white/20"
                  }`}
                >
                  <span
                    className={`text-sm font-bold block transition-colors duration-300 ${
                      i === activeIndex ? "text-white" : "text-white/40"
                    }`}
                  >
                    {t.name}
                  </span>
                  <span
                    className={`text-xs transition-colors duration-300 ${
                      i === activeIndex ? "text-white/60" : "text-white/20"
                    }`}
                  >
                    {t.role}
                  </span>
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="mt-8 lg:mt-0 flex items-center gap-4">
              <span className="text-4xl font-black tabular-nums text-white/20">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="w-8 h-[1px] bg-white/20" />
              <span className="text-sm font-bold text-white/20">
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
