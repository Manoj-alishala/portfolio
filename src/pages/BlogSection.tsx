import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "001",
    slug: "building-vchat-with-webrtc",
    title: "Building Real-Time Voice Calls with WebRTC & Socket.io",
    excerpt:
      "How I architected peer-to-peer voice calling without a media server — from STUN/TURN negotiation to handling edge cases on spotty networks.",
    date: "2026-01-15",
    readTime: "5 min",
    tags: ["WebRTC", "Socket.io", "Architecture"],
    content: `## The Challenge

When I set out to build VChat, I wanted real-time voice calls that didn't rely on expensive media servers. WebRTC promised peer-to-peer connections, but the reality was far more complex than the documentation suggested.

## The Signaling Problem

WebRTC needs a signaling channel to exchange SDP offers and ICE candidates between peers. I chose Socket.io because VChat already used it for chat messaging — killing two birds with one stone.

The flow looks like this:
1. User A clicks "Call" → generates an SDP offer
2. Socket.io sends the offer to User B
3. User B accepts → generates an SDP answer
4. Both peers exchange ICE candidates via Socket.io
5. Direct peer-to-peer connection established

## Handling Edge Cases

The hardest part wasn't the happy path — it was handling:
- **Symmetric NAT**: Some university networks block P2P. I added TURN server fallback.
- **Connection drops**: Implemented ICE restart on disconnection events.
- **Browser differences**: Firefox and Chrome handle getUserMedia differently.

## Key Takeaway

WebRTC is powerful but fragile. The 80/20 rule applies hard — getting a basic call working takes 20% of the effort, but handling all edge cases takes the remaining 80%.`,
  },
  {
    id: "002",
    slug: "lessons-from-bluestock",
    title: "What I Learned from My First Engineering Internship",
    excerpt:
      "Reflections from my time at Bluestock Fintech — from automating data pipelines to understanding how real engineering teams ship code.",
    date: "2026-02-10",
    readTime: "4 min",
    tags: ["Career", "Fintech", "Python"],
    content: `## Walking Into the Unknown

My first day at Bluestock Fintech was intimidating. The codebase was massive, the deployment pipeline had a dozen stages, and everyone spoke in acronyms I'd never heard.

## The Real Learning

The biggest lesson wasn't technical — it was understanding how engineering teams actually work:

1. **Code reviews matter more than code**: My mentor spent more time reviewing my PRs than I spent writing them. Every review made me a better engineer.
2. **Automation is everything**: I was tasked with automating financial report generation. What took analysts 4 hours per day now runs in 12 minutes.
3. **30% accuracy improvement**: By standardizing data validation rules in the pipeline, we caught inconsistencies that had been slipping through for months.

## The Technical Wins

- Built Python scripts for automated ETL (Extract, Transform, Load) pipelines
- Integrated with internal REST APIs for data aggregation
- Set up scheduled cron jobs for daily report generation

## What I'd Tell My Past Self

Don't be afraid to ask "dumb" questions. Every senior engineer I met said the same thing — they wished they'd asked more questions earlier in their careers.`,
  },
  {
    id: "003",
    slug: "why-i-chose-react",
    title: "Why I Still Choose React in 2026",
    excerpt:
      "With so many frontend frameworks available, here's my honest take on why React remains my go-to for building production applications.",
    date: "2026-03-22",
    readTime: "3 min",
    tags: ["React", "Frontend", "Opinion"],
    content: `## The Framework Debate

Every year, someone declares React is dead. And every year, React remains the most-used frontend framework. Here's why I keep choosing it:

## Ecosystem Maturity

React's ecosystem is unmatched:
- **Framer Motion** for animations (this portfolio uses it everywhere)
- **React Router** for client-side routing
- **TanStack Query** for server state management
- **Vite** for blazing-fast development

## Component Mental Model

The component model is the closest thing to "thinking in UI" I've found. Every piece of this portfolio is a component — from the ScrollStack cards to the SplashCursor.

## The Honest Downsides

React isn't perfect:
- **Bundle size**: A hello world React app is bigger than it should be
- **Over-engineering**: It's easy to reach for React when vanilla JS would suffice
- **State management**: Still no consensus on the "right" way to manage state

## My Rule of Thumb

Use React when you need interactivity, component reuse, and ecosystem support. Use vanilla JS/HTML for everything else. This portfolio needed React. A landing page for a restaurant doesn't.`,
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BlogSection = () => {
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
    <section className="w-full bg-white text-black font-sans py-24 md:py-32 px-6 md:px-12 lg:px-16">
      <motion.div
        className="max-w-[1400px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24"
        >
          <div className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-black/40">
              Thoughts & Writing
            </h2>
          </div>
          <div className="md:col-span-9">
            <p className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-black/70">
              Technical write-ups, career reflections, and lessons from
              building real software.
            </p>
          </div>
        </motion.div>

        {/* Blog posts */}
        <div className="flex flex-col">
          {blogPosts.map((post, i) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link
                to={`/blog/${post.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 border-t border-black/10 hover:border-black/30 transition-colors duration-300"
              >
                {/* Number + Date */}
                <div className="md:col-span-2 flex items-start gap-4 md:flex-col md:gap-2">
                  <span className="text-xs font-bold text-black/20">
                    {post.id}
                  </span>
                  <span className="text-xs font-medium text-black/40">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Title + Excerpt */}
                <div className="md:col-span-8">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-300 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-sm md:text-base text-black/50 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider border border-black/10 text-black/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read time + Arrow */}
                <div className="md:col-span-2 flex items-start md:justify-end">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-black/30 uppercase tracking-wider">
                      {post.readTime}
                    </span>
                    <svg
                      className="w-4 h-4 text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-black/10" />
        </div>
      </motion.div>
    </section>
  );
};

export default BlogSection;
