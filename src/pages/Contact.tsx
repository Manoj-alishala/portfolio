import { motion } from "framer-motion";
import { useState } from "react";

const MY_EMAIL = "a.manoj.career@gmail.com";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Build a mailto: link with the form data pre-filled
      const { firstName, lastName, email, subject, message } = formData;
      const fullName = `${firstName} ${lastName}`.trim();
      const body = `Hi Manoj,\n\n${message}\n\n---\nFrom: ${fullName}\nEmail: ${email}`;
      const mailtoUrl = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open the user's email client
      window.location.href = mailtoUrl;

      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="h-screen w-full bg-white text-black font-sans px-4 md:px-8 lg:px-12 overflow-hidden flex items-center justify-center relative">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 max-w-[1400px] w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full py-2">
          <motion.div variants={itemVariants} className="mb-8 lg:mb-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-left">
              Contact <br />
              Me <span className="inline-block ml-2">→</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 lg:mt-0 hidden lg:block">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-black/60">
              Contact Form
            </h2>
            <p className="text-base md:text-lg font-normal leading-relaxed text-black/80 max-w-md text-left">
              Send me a message and I'll get back to you as soon as possible. Let's build something great together.
            </p>

            {/* Direct contact info */}
            <div className="mt-6 flex flex-col gap-2">
              <a href={`mailto:${MY_EMAIL}`} className="text-sm font-bold uppercase tracking-wider hover:underline underline-offset-4 w-fit">
                {MY_EMAIL}
              </a>
              <a href="tel:+918341407986" className="text-sm font-bold uppercase tracking-wider hover:underline underline-offset-4 w-fit text-black/60">
                +91 8341407986
              </a>
              <span className="text-sm font-medium uppercase tracking-wider text-black/40">
                Warangal, Telangana
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <motion.div className="lg:col-span-5 flex flex-col justify-center" variants={itemVariants}>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider">First Name*</label>
                <input
                  type="text" id="firstName" name="firstName"
                  value={formData.firstName} onChange={handleChange}
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider">Last Name*</label>
                <input
                  type="text" id="lastName" name="lastName"
                  value={formData.lastName} onChange={handleChange}
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email & Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">Email*</label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider">Subject*</label>
                <input
                  type="text" id="subject" name="subject"
                  value={formData.subject} onChange={handleChange}
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider">Message*</label>
              <textarea
                id="message" name="message" rows={3}
                value={formData.message} onChange={handleChange}
                className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            {/* Submit */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex items-center gap-3 text-lg font-bold uppercase tracking-wider hover:text-black/70 transition-colors disabled:opacity-50"
              >
                {status === "sending" ? "Opening…" : "Send Message"}
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>

              {status === "success" && (
                <p className="text-sm text-green-600 font-medium">✓ Your email client should open. Send the email to complete!</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-500 font-medium">✗ Something went wrong. Try emailing me directly at {MY_EMAIL}</p>
              )}
            </div>

          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
