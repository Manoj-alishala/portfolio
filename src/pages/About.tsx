import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
  // Safe window height check for SSR
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh(); // Set on mount
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  const { scrollY } = useScroll();

  // Scroll mapping: 
  // As the user scrolls from 0 to 100vh (the Hero height), 
  // the text precisely fades in and slides up. We stagger the start/end points.

  // Section 1: Context Label
  const y1 = useTransform(scrollY, [0, vh * 0.4], [80, 0]);
  const opacity1 = useTransform(scrollY, [0, vh * 0.3], [0, 1]);

  // Section 2: Education
  const y2 = useTransform(scrollY, [vh * 0.05, vh * 0.45], [80, 0]);
  const opacity2 = useTransform(scrollY, [vh * 0.05, vh * 0.35], [0, 1]);

  // Section 3: Certifications
  const y3 = useTransform(scrollY, [vh * 0.12, vh * 0.52], [80, 0]);
  const opacity3 = useTransform(scrollY, [vh * 0.12, vh * 0.42], [0, 1]);

  // Section 4: Experience
  const y4 = useTransform(scrollY, [vh * 0.2, vh * 0.6], [80, 0]);
  const opacity4 = useTransform(scrollY, [vh * 0.2, vh * 0.5], [0, 1]);

  // Section 5: Focus
  const y5 = useTransform(scrollY, [vh * 0.3, vh * 0.7], [80, 0]);
  const opacity5 = useTransform(scrollY, [vh * 0.3, vh * 0.6], [0, 1]);

  return (
    <section className="min-h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-16 flex items-start justify-center relative pt-32 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 w-full max-w-[1600px] mx-auto">

        {/* Left Column: Context Label */}
        <motion.div
          className="md:col-span-3 lg:col-span-3 pt-2"
          style={{ y: y1, opacity: opacity1 }}
        >
          <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-black/80">
            Background & Data
          </h2>
        </motion.div>

        {/* Right Column: The Data List */}
        <div className="md:col-span-9 lg:col-span-9 flex flex-col gap-8 md:gap-10">

          {/* 01. EDUCATION */}
          <motion.div style={{ y: y2, opacity: opacity2 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1 text-black/70">
              01. Education
            </h3>
            <div className="flex flex-col">
              <p className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-black">
                SR University, Ananthsagar, Telangana
              </p>
              <p className="font-sans text-base md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                B.Tech, Computer Science & Engineering — Data Science (2023–2027)
              </p>
              <p className="font-sans text-xs md:text-base font-normal text-black/50 leading-tight tracking-tight mt-1">
                CGPA: 8.1/10
              </p>
            </div>
          </motion.div>

          {/* 02. CERTIFICATIONS */}
          <motion.div style={{ y: y3, opacity: opacity3 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1 text-black/70">
              02. Certifications
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-black">
                  AWS Certified AI Practitioner (AIF-C01)
                </p>
                <p className="font-sans text-xs md:text-base font-normal text-black/50 leading-tight tracking-tight mt-1">
                  Foundational understanding of AI services, workflows, and responsible AI principles on AWS
                </p>
              </div>
              <div>
                <p className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-black">
                  Microsoft Certified: Azure AI Fundamentals
                </p>
                <p className="font-sans text-xs md:text-base font-normal text-black/50 leading-tight tracking-tight mt-1">
                  Cloud & AI service exposure aligned with enterprise technology
                </p>
              </div>
              <div>
                <p className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-black">
                  Oracle Data Platform 2025 — Foundations Associate
                </p>
                <p className="font-sans text-xs md:text-base font-normal text-black/50 leading-tight tracking-tight mt-1">
                  Data warehousing & platform architecture foundations
                </p>
              </div>
            </div>
          </motion.div>

          {/* 03. EXPERIENCE */}
          <motion.div style={{ y: y4, opacity: opacity4 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1 text-black/70">
              03. Experience
            </h3>

            <div className="flex flex-col gap-6">
              <div>
                <p className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-black">
                  Bluestock Fintech
                </p>
                <p className="font-sans text-base md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Software Development Engineer Intern (Nov 2025 – Dec 2025)
                </p>
                <p className="font-sans text-xs md:text-base font-normal text-black/50 leading-tight tracking-tight mt-1">
                  Fintech data pipelines · Python automation · 30% report accuracy improvement
                </p>
              </div>
            </div>
          </motion.div>

          {/* 04. FOCUS */}
          <motion.div style={{ y: y5, opacity: opacity5 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1 text-black/70">
              04. Focus
            </h3>
            <ul className="flex flex-col">
              <li className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-black">
                Full Stack Software Engineering
              </li>
              <li className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-black">
                Cloud & AI-Powered Applications
              </li>
              <li className="font-sans text-base md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-black">
                Fintech & Data Systems
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;