import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

// Reuse the same projects data from SelectedWorks
const projects = [
  {
    id: "001",
    slug: "data-analysis-agent",
    title: "AI Data Analysis Agent",
    stack: [
      "Python",
      "Streamlit",
      "Meta Llama 3.3 (70B)",
      "NVIDIA NIM API",
      "Docker",
      "Matplotlib",
    ],
    description:
      "Chat with your CSV data in plain English — powered by Meta Llama 3.3 70B with auto-plotting, reasoning traces, and code transparency.",
    links: {
      live: "https://data-analysis-agent-v.streamlit.app/",
      code: "https://github.com/Manoj-alishala/Data-Analysis-Agent",
    },
    image: "/p5.png",
    problem:
      "Non-technical business stakeholders often struggle to write complex SQL queries or Python pandas code to extract insights from raw CSV datasets, resulting in data bottlenecks.",
    solution:
      "Engineered an autonomous Data Analysis Agent powered by Meta's Llama 3.3 70B model via NVIDIA NIM. Users can upload any CSV, ask questions in natural language, view model thinking traces, inspect generated Python code, and view automatically rendered charts.",
    impact: [
      "Sub-second AI reasoning & query parsing with NVIDIA NIM cloud endpoints",
      "Automated Matplotlib & Seaborn chart generation for visual insights",
      "Full transparency with collapsible model thinking panels and code inspection",
      "Containerized deployment using Docker and Docker Compose",
    ],
    architecture:
      "Streamlit frontend backed by a Python agentic workflow. Communicates with NVIDIA's Llama 3.3 70B NIM API to interpret user queries against dataframe schemas, generate sandboxed Pandas code, execute data transformations, and render dynamic Matplotlib charts.",
    role: "AI & Full Stack Developer — built agent workflow, LLM integration, Docker containerization, and Streamlit interface.",
    duration: "2 weeks",
  },
  {
    id: "002",
    slug: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    stack: ["Python", "NLP", "React.js", "REST API", "Cloud Deploy"],
    description:
      "An AI-powered application that analyzes candidate resumes against job descriptions using NLP — surfacing skill gaps and alignment scores.",
    links: {
      live: "https://ai-resume-analyzer-rqnw.onrender.com",
      code: "https://github.com/Manoj-alishala/AI-Resume-Analyzer",
    },
    image: "/p1.png",
    problem:
      "Recruiters spend an average of 7 seconds scanning a resume. Manual screening is slow, biased, and inconsistent — especially when matching candidates to specific job descriptions with nuanced skill requirements.",
    solution:
      "Built an AI-powered platform that parses resumes and job descriptions using Natural Language Processing, then generates a quantified alignment score highlighting matched skills, gaps, and improvement suggestions.",
    impact: [
      "Reduced resume screening time by ~70%",
      "Deployed on Render with CI/CD pipeline",
      "RESTful API architecture for frontend-backend decoupling",
      "Real-time NLP processing with async task handling",
    ],
    architecture:
      "React.js frontend communicates with a Python Flask backend via REST APIs. The NLP engine uses TF-IDF vectorization and cosine similarity to score resume-job alignment. Results are streamed asynchronously to the frontend for real-time feedback.",
    role: "Full Stack Developer — designed system architecture, built NLP pipeline, React UI, and deployment infrastructure.",
    duration: "3 weeks",
  },
  {
    id: "003",
    slug: "vchat-application",
    title: "VChat Application",
    stack: [
      "Node.js",
      "Express.js",
      "Socket.io",
      "WebRTC",
      "React.js",
      "MongoDB",
    ],
    description:
      "A secure real-time communication platform supporting one-to-one chat, group chat, and voice/video calls.",
    links: {
      live: "https://chat-application-zchp.onrender.com/",
      code: "https://github.com/Manoj-alishala/VChat",
    },
    image: "/p2.png",
    problem:
      "Existing chat solutions are either too complex to self-host or lack real-time features like voice calls and dynamic group management. Students and small teams need a lightweight, privacy-first communication tool.",
    solution:
      "Engineered a full-featured real-time chat platform with Socket.io for instant messaging, WebRTC for peer-to-peer voice/video calls, and a friend request-acceptance model for trust-based connections.",
    impact: [
      "Sub-100ms message delivery via WebSocket",
      "Peer-to-peer voice calls without a media server",
      "Dynamic group creation with role-based management",
      "Persistent chat history with MongoDB",
    ],
    architecture:
      "Node.js/Express backend with Socket.io for real-time event-driven messaging. WebRTC handles peer-to-peer media streams with STUN/TURN server fallback. MongoDB stores user profiles, chat history, and group metadata. React frontend with optimistic UI updates.",
    role: "Full Stack Developer — built the entire stack from database schema to WebRTC signaling server.",
    duration: "4 weeks",
  },
  {
    id: "004",
    slug: "manoj-cars",
    title: "Manoj Cars — Vehicle Consultancy Platform",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    description:
      "A full-stack vehicle marketplace with Admin Dashboard and integrated communication APIs.",
    links: {
      live: "https://manojcars.live",
      code: "https://github.com/Manoj-alishala",
    },
    image: "/p3.png",
    problem:
      "Local vehicle consultancies rely on manual inquiry handling via phone calls and paper records, leading to lost leads, slow response times, and no online presence for discovery.",
    solution:
      "Built a production-grade vehicle marketplace with real-time inventory management, WhatsApp & Click-to-Call API integration for instant customer communication, and Nodemailer automation for transactional email confirmations.",
    impact: [
      "Live production deployment at manojcars.live",
      "Reduced inquiry response time with automated notifications",
      "Secure admin dashboard with JWT authentication",
      "Full CRUD inventory management with image uploads",
    ],
    architecture:
      "React.js SPA with responsive design communicates with Node.js/Express REST API. MongoDB stores vehicle listings, user accounts, and inquiry records. Integrated WhatsApp Business API, Click-to-Call, and Nodemailer for multi-channel customer engagement.",
    role: "Full Stack Developer — end-to-end development from requirement gathering to production deployment.",
    duration: "5 weeks",
  },
  {
    id: "005",
    slug: "movie-discovery",
    title: "Movie Discovery Platform",
    stack: ["React.js", "REST APIs (TMDB/OMDb)", "CSS3"],
    description:
      "A dynamic movie discovery app with real-time search, filtering, and modular component architecture.",
    links: {
      live: "https://movie-app-e5vq.onrender.com/",
      code: "https://github.com/Manoj-alishala/Movie-app",
    },
    image: "/p4.png",
    problem:
      "Movie enthusiasts struggle to discover content across multiple platforms. Existing solutions are cluttered with ads and lack clean, fast search and filtering capabilities.",
    solution:
      "Developed a clean, performant movie discovery interface that aggregates data from TMDB and OMDb APIs with instant search, genre filtering, and efficient state management for handling large datasets.",
    impact: [
      "Instant search with debounced API calls",
      "Genre-based filtering with multi-select support",
      "Responsive grid layout across all devices",
      "Modular component architecture for scalability",
    ],
    architecture:
      "React.js frontend with custom hooks for data fetching and caching. Dual API integration (TMDB for discovery, OMDb for detailed metadata). CSS3 Grid with responsive breakpoints. Debounced search input to minimize API calls.",
    role: "Frontend Developer — designed the UI, integrated APIs, and optimized search performance.",
    duration: "2 weeks",
  },
  {
    id: "006",
    slug: "pixfindr",
    title: "PixFindr — Image Search Engine",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Unsplash API"],
    description:
      "A responsive and dynamic image search application powered by the Unsplash API with dark mode and category browsing.",
    links: {
      live: "https://pixfindr.vercel.app/",
      code: "https://github.com/Manoj-alishala/Pixfindr",
    },
    image: "/p6.png",
    problem:
      "Users need a fast, visually appealing way to search for high-quality, royalty-free images without navigating cluttered interfaces or dealing with slow page loads.",
    solution:
      "Developed a lightweight, high-performance image search engine using vanilla JavaScript. Implemented category-based quick searches, infinite scrolling via pagination, and a theme switcher for enhanced user accessibility.",
    impact: [
      "Real-time fetching and rendering from the Unsplash REST API",
      "Built-in Dark/Light mode theme toggler with local storage persistence",
      "Fully responsive masonry-style grid layout using Bootstrap",
      "Infinite scrolling experience for seamless image discovery",
    ],
    architecture:
      "Frontend-only application using HTML5, CSS3, and ES6 JavaScript. Utilizes the browser's Fetch API to communicate with Unsplash endpoints. Bootstrap handles the responsive grid layout, and custom CSS provides interactive hover states and theme toggling.",
    role: "Frontend Developer — built the entire application interface, API integration, and theme logic.",
    duration: "1 week",
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-4">404</h1>
          <p className="text-white/60 mb-8">Project not found</p>
          <Link
            to="/"
            className="text-sm font-bold uppercase tracking-wider hover:underline underline-offset-4"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Back navigation */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between mix-blend-difference"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
      >
        <Link
          to="/"
          className="group flex items-center gap-2 text-white hover:opacity-70 transition-opacity"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            Back
          </span>
        </Link>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
          Case Study / {project.id}
        </span>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 pt-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/80 z-0" />

        <motion.div
          className="relative z-10 max-w-[1400px] w-full mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">
              Project {project.id}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8"
          >
            {project.title}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border border-white/20 text-white/70"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            {project.links.live !== "#" && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-3 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors"
              >
                Live Site
                <svg
                  className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            )}
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-3 border border-white/30 text-xs font-bold uppercase tracking-wider hover:border-white transition-colors"
            >
              Source Code
              <svg
                className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Project Image */}
      <motion.section
        className="px-6 md:px-12 lg:px-16 pb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="max-w-[1400px] mx-auto border border-white/10 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-video object-cover"
          />
        </div>
      </motion.section>

      {/* Problem → Solution → Impact */}
      <section className="px-6 md:px-12 lg:px-16 pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left: Labels + Meta */}
          <motion.div
            className="lg:col-span-4 flex flex-col gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-3">
                Role
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-white/80">
                {project.role}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-3">
                Duration
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-white/80">
                {project.duration}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-col gap-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm font-medium text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Problem / Solution / Impact / Architecture */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-4">
                01 — The Problem
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug tracking-tight">
                {project.problem}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-4">
                02 — The Solution
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug tracking-tight">
                {project.solution}
              </p>
            </motion.div>

            {/* Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-4">
                03 — Architecture
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-white/70">
                {project.architecture}
              </p>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
                04 — Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.impact.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 border border-white/10 px-5 py-4"
                  >
                    <span className="text-xs font-bold text-white/30 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm md:text-base font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <motion.section
        className="px-6 md:px-12 lg:px-16 py-20 border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-2">
              Next Project
            </p>
            {(() => {
              const currentIndex = projects.findIndex(
                (p) => p.slug === slug
              );
              const nextProject =
                projects[(currentIndex + 1) % projects.length];
              return (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="group flex items-center gap-3"
                >
                  <span className="text-3xl md:text-5xl font-black uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {nextProject.title}
                  </span>
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })()}
          </div>

          <Link
            to="/"
            className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
          >
            ← All Projects
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default CaseStudy;
