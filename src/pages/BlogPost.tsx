import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { blogPosts } from "./BlogSection";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-4">404</h1>
          <p className="text-black/60 mb-8">Post not found</p>
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

  // Simple markdown-like rendering (handles ## headings, **bold**, - lists, paragraphs)
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={`list-${elements.length}`}
            className="list-disc list-inside space-y-2 text-base md:text-lg leading-relaxed text-black/70 mb-6 pl-2"
          >
            {listItems.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const renderInline = (text: string) => {
      // Handle **bold** text
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-black">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();

      if (trimmed === "") {
        flushList();
        return;
      }

      if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={i}
            className="text-2xl md:text-3xl font-black uppercase tracking-tight mt-12 mb-4"
          >
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith("- ") || trimmed.match(/^\d+\.\s/)) {
        const content = trimmed.startsWith("- ")
          ? trimmed.slice(2)
          : trimmed.replace(/^\d+\.\s/, "");
        listItems.push(content);
      } else {
        flushList();
        elements.push(
          <p
            key={i}
            className="text-base md:text-lg leading-relaxed text-black/70 mb-4"
          >
            {renderInline(trimmed)}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-black/5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
      >
        <Link
          to="/"
          className="group flex items-center gap-2 text-black hover:opacity-70 transition-opacity"
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
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/30">
          Blog / {post.id}
        </span>
      </motion.nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 md:px-12 pt-32 pb-20">
        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-xs font-bold text-black/30">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="w-4 h-[1px] bg-black/20" />
          <span className="text-xs font-bold text-black/30">
            {post.readTime} read
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.95] tracking-tight mb-8"
        >
          {post.title}
        </motion.h1>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="flex flex-wrap gap-2 mb-16"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-black/15 text-black/50"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="border-t border-black/10 pt-12"
        >
          {renderContent(post.content)}
        </motion.div>
      </article>

      {/* Next post */}
      <motion.section
        className="px-6 md:px-12 lg:px-16 py-16 border-t border-black/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/30 mb-2">
              Next Post
            </p>
            <Link
              to={`/blog/${nextPost.slug}`}
              className="group flex items-center gap-3"
            >
              <span className="text-xl md:text-2xl font-black uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                {nextPost.title}
              </span>
            </Link>
          </div>
          <Link
            to="/"
            className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors"
          >
            ← All Posts
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default BlogPost;
