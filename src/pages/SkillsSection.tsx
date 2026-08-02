import { motion } from "framer-motion";
import { useState } from "react";

interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Cloud & AI" | "Databases & DevTools";
  level: "Advanced" | "Proficient" | "Certified";
  icon: string;
  projects: string[];
}

const skills: Skill[] = [
  {
    name: "React.js",
    category: "Frontend",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    projects: ["AI Resume Analyzer", "VChat", "Manoj Cars"],
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    projects: ["All Web Apps"],
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    projects: ["Portfolio Website"],
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    projects: ["Manoj Cars", "Portfolio"],
  },
  {
    name: "Node.js",
    category: "Backend",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    projects: ["VChat", "Manoj Cars"],
  },
  {
    name: "Express.js",
    category: "Backend",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    projects: ["VChat", "Manoj Cars"],
  },
  {
    name: "Python",
    category: "Backend",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    projects: ["AI Resume Analyzer", "Bluestock ETL"],
  },
  {
    name: "Java",
    category: "Backend",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    projects: ["Data Structures & OOP"],
  },
  {
    name: "Socket.io & WebRTC",
    category: "Backend",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    projects: ["VChat Application"],
  },
  {
    name: "REST APIs",
    category: "Backend",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    projects: ["AI Resume Analyzer", "Manoj Cars"],
  },
  {
    name: "AWS (AI Practitioner)",
    category: "Cloud & AI",
    level: "Certified",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    projects: ["AI Resume Deployments"],
  },
  {
    name: "Microsoft Azure AI",
    category: "Cloud & AI",
    level: "Certified",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    projects: ["Cloud AI Services"],
  },
  {
    name: "Natural Language Processing",
    category: "Cloud & AI",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    projects: ["AI Resume Analyzer"],
  },
  {
    name: "MongoDB",
    category: "Databases & DevTools",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    projects: ["VChat", "Manoj Cars"],
  },
  {
    name: "Oracle Data Platform",
    category: "Databases & DevTools",
    level: "Certified",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    projects: ["Enterprise Data Warehouse"],
  },
  {
    name: "Git & GitHub",
    category: "Databases & DevTools",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    projects: ["CI/CD & Version Control"],
  },
  {
    name: "Docker",
    category: "Databases & DevTools",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    projects: ["Containerized Services"],
  },
];

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Cloud & AI",
  "Databases & DevTools",
] as const;

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const INITIAL_VISIBLE = 8; // 2 rows on xl (4 cols), ~2 rows on lg (3 cols)

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [unlocked, setUnlocked] = useState(false);

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const visibleSkills = unlocked ? filteredSkills : filteredSkills.slice(0, INITIAL_VISIBLE);
  const hasMore = filteredSkills.length > INITIAL_VISIBLE;

  return (
    <section id="skills" className="w-full bg-black text-white font-sans py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-white/30" />
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
                Technical Stack
              </h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
              Skills & Expertise
            </h3>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setUnlocked(false); }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-full cursor-pointer ${selectedCategory === cat
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="relative">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
            layout
          >
            {visibleSkills.map((skill, index) => {
              const isNewlyRevealed = unlocked && index >= INITIAL_VISIBLE;
              return (
              <motion.div
                key={skill.name}
                layout
                initial={isNewlyRevealed ? { opacity: 0, y: 15 } : false}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: isNewlyRevealed ? 0.25 : 0, delay: isNewlyRevealed ? (index - INITIAL_VISIBLE) * 0.03 : 0 }}
                className="group relative bg-white/[0.03] border border-white/10 hover:border-white/30 p-4 md:p-6 flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.06]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center p-1 bg-white/5 rounded-md group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-5 h-5 md:w-7 md:h-7 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <span
                      className={`text-[8px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-widest px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-full border ${skill.level === "Certified"
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                          : skill.level === "Advanced"
                            ? "border-sky-500/30 text-sky-400 bg-sky-500/10"
                            : "border-white/20 text-white/60 bg-white/5"
                        }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <h4 className="text-sm md:text-lg font-bold tracking-tight mb-1 text-white group-hover:text-white transition-colors">
                    {skill.name}
                  </h4>
                  <p className="text-[10px] md:text-xs text-white/40 font-medium">
                    {skill.category}
                  </p>
                </div>

                <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Used in
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold text-white/70 group-hover:text-white transition-colors">
                    {skill.projects.slice(0, 2).join(", ")}
                  </span>
                </div>
              </motion.div>
              );
            })}
          </motion.div>

          {/* Gradient fade overlay + Unlock button */}
          {!unlocked && hasMore && (
            <div className="relative mt-0">
              {/* Gradient fade hint */}
              <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

              {/* Unlock button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center pt-10 relative z-20"
              >
                <button
                  onClick={() => setUnlocked(true)}
                  className="group relative flex items-center gap-3 px-8 py-4 bg-white/[0.04] border border-white/15 hover:border-white/40 hover:bg-white/[0.08] transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  {/* Animated shimmer sweep */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                  {/* Lock icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300 relative z-10"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>

                  <span className="relative z-10 text-xs font-black uppercase tracking-[0.25em] text-white/60 group-hover:text-white transition-colors duration-300">
                    Unlock All Skills
                  </span>

                  {/* Count badge */}
                  <span className="relative z-10 text-[10px] font-bold text-white/30 bg-white/5 px-2 py-0.5 rounded-full group-hover:text-white/60 group-hover:bg-white/10 transition-all duration-300">
                    +{filteredSkills.length - INITIAL_VISIBLE}
                  </span>
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
