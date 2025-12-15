import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Zap, Shield, Waves } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="
        relative
        min-h-[850px]
        nav-offset
        pt-32
        pb-24
        md:pt-40
        md:pb-32
        overflow-hidden
        bg-[#050505]
      "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-[#050505] -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 blur-[140px] rounded-full" />

      {/* MAIN CONTAINER – FIXED SPACING */}
      <div
        className="
          max-w-7xl
          mx-auto
          p-8
          md:p-16
          lg:p-24
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-16
          items-center
          relative
          z-10
        "
      >
        {/* Border / Frame Effect */}
        <div className="absolute inset-0 border border-white/5 rounded-3xl -z-10 pointer-events-none" />
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-purple-500/30 text-purple-300 text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
            v2.0 is now live
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-8 text-white tracking-tight">
            Chat in{" "}
            <span className="bg-gradient-to-br from-purple-600 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-flow">
              Waves
            </span>
            .
            <br />
            Connect in{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Style
            </span>
            .
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
            Experience the future of messaging with real-time communication,
            stunning aesthetic, and crystal clear connections. Join the wave
            today.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link
              to="/signup"
              className="group relative px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_4px_15px_rgba(176,38,255,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(176,38,255,0.55)] overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </Link>

            <Link
              to="/login"
              className="px-8 py-3.5 rounded-full font-semibold text-gray-300 bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-purple-500 hover:text-white transition-all hover:-translate-y-0.5"
            >
              Live Demo
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center gap-8 text-gray-400 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>End-to-End Encrypted</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          {/* Floating Card 1 */}
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 right-12 p-4 bg-[#0f0f13]/70 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                <div className="h-2 w-16 bg-white/10 rounded" />
              </div>
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            animate={{ y: [10, -10, 10], x: [10, -10, 10] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 left-14 p-4 bg-[#0f0f13]/70 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <div className="text-white text-sm font-medium">
                File Sent
                <span className="block text-xs text-green-400">Success</span>
              </div>
            </div>
          </motion.div>

          {/* Abstract Shape */}
          <div className="relative w-full aspect-square max-w-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 blur-[70px] rounded-full animate-pulse-glow" />
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full opacity-80"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B026FF" />
                  <stop offset="100%" stopColor="#00D9FF" />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient)"
                d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.4C93.5,8.4,82.2,21.1,70.6,31.6C59,42.1,47,50.3,34.8,56.5C22.6,62.7,10.2,66.9,-1.3,69.1C-12.8,71.4,-24.6,71.7,-35.8,66.3C-47,60.9,-57.6,49.8,-66.2,37.1C-74.8,24.4,-81.4,10.1,-80.2,-3.6C-79.1,-17.3,-70.2,-30.4,-60.1,-41.3C-50,-52.2,-38.7,-60.9,-26.8,-69.3C-14.9,-77.7,-2.4,-85.8,12.3,-84C27,-82.2,46.9,-70.5,44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
