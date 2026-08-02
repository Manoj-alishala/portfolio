import { motion } from "framer-motion";

const About = () => {
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
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="about" className="w-full bg-white text-black font-sans px-6 md:px-12 lg:px-16 py-24 md:py-32 flex justify-center">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 w-full max-w-[1400px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Left Column: Context Label */}
        <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-3 pt-2">
          <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-black/50">
            Background & Data
          </h2>
        </motion.div>

        {/* Right Column: The Data List */}
        <div className="md:col-span-9 lg:col-span-9 flex flex-col gap-12 md:gap-16">
          {/* 01. EDUCATION */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1 text-black/40">
              01. Education
            </h3>
            <div className="flex flex-col">
              <p className="font-sans text-xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-black">
                SR University, Ananthsagar, Telangana
              </p>
              <p className="font-sans text-lg md:text-2xl font-bold text-black/70 leading-tight tracking-tight mt-1">
                B.Tech, Computer Science & Engineering — Data Science (2023–2027)
              </p>
              <p className="font-sans text-sm md:text-base font-bold text-black/40 uppercase tracking-widest mt-2">
                CGPA: 8.1/10
              </p>
            </div>
          </motion.div>

          {/* 02. CERTIFICATIONS */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 md:gap-6">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1 text-black/40">
              02. Certifications
            </h3>
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-sans text-xl md:text-2xl font-black leading-tight tracking-tight text-black">
                  AWS Certified AI Practitioner (AIF-C01)
                </p>
                <p className="font-sans text-sm md:text-base font-medium text-black/60 leading-relaxed mt-1">
                  Foundational understanding of AI services, workflows, and responsible AI principles on AWS
                </p>
              </div>
              <div>
                <p className="font-sans text-xl md:text-2xl font-black leading-tight tracking-tight text-black">
                  Microsoft Certified: Azure AI Fundamentals
                </p>
                <p className="font-sans text-sm md:text-base font-medium text-black/60 leading-relaxed mt-1">
                  Cloud & AI service exposure aligned with enterprise technology
                </p>
              </div>
              <div>
                <p className="font-sans text-xl md:text-2xl font-black leading-tight tracking-tight text-black">
                  Oracle Data Platform 2025 — Foundations Associate
                </p>
                <p className="font-sans text-sm md:text-base font-medium text-black/60 leading-relaxed mt-1">
                  Data warehousing & platform architecture foundations
                </p>
              </div>
            </div>
          </motion.div>

          {/* 03. EXPERIENCE */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1 text-black/40">
              03. Experience
            </h3>
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-sans text-xl md:text-3xl font-black leading-tight tracking-tight text-black">
                  Bluestock Fintech
                </p>
                <p className="font-sans text-lg md:text-2xl font-bold text-black/70 leading-tight tracking-tight mt-1">
                  Software Development Engineer Intern (Nov 2025 – Dec 2025)
                </p>
                <p className="font-sans text-sm md:text-base font-bold text-black/40 uppercase tracking-widest mt-2">
                  Fintech Data Pipelines · Python Automation · 30% Report Accuracy
                </p>
              </div>
            </div>
          </motion.div>

          {/* 04. FOCUS */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1 text-black/40">
              04. Focus
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="font-sans text-xl md:text-3xl font-black leading-tight tracking-tight text-black">
                Full Stack Software Engineering
              </li>
              <li className="font-sans text-xl md:text-3xl font-black leading-tight tracking-tight text-black">
                Cloud & AI-Powered Applications
              </li>
              <li className="font-sans text-xl md:text-3xl font-black leading-tight tracking-tight text-black">
                Fintech & Data Systems
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;