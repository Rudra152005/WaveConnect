import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Heart, Rocket, Code, Users, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
    const values = [
        {
            icon: Heart,
            title: "User-Centric Design",
            description: "Every feature is built with you in mind. We prioritize simplicity, elegance, and user experience.",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: Zap,
            title: "Speed & Performance",
            description: "Lightning-fast messaging that feels instant. No lag, no waiting, just pure communication.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: Code,
            title: "Open Innovation",
            description: "We believe in transparency and continuous improvement through cutting-edge technology.",
            color: "from-blue-500 to-cyan-500"
        }
    ];

    const techStack = [
        { name: "React", category: "Frontend" },
        { name: "Node.js", category: "Backend" },
        { name: "Socket.IO", category: "Real-time" },
        { name: "MongoDB", category: "Database" },
        { name: "Redis", category: "Caching" },
        { name: "AWS", category: "Infrastructure" }
    ];



    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 flex flex-col">
            <Navbar />

            <main className="flex-grow flex flex-col gap-24 pb-0">
                {/* Hero Section */}
                <section className="relative min-h-[600px] pb-32 md:pb-40 overflow-hidden bg-[#050505]" style={{ paddingTop: '180px' }}>
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#050505] to-[#050505] -z-10" />
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/20 blur-[140px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-600/10 blur-[140px] rounded-full" />

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

                    <div className="max-w-7xl mx-auto p-8 md:p-16 lg:p-24 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-md">
                                <Rocket className="w-4 h-4" />
                                Store, Share, Connect
                            </div>

                            {/* Heading */}
                            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-tight mb-8 text-white tracking-tight">
                                Connecting the World <br className="hidden md:block" />
                                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent animate-gradient-x">
                                    Beyond Boundaries
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                                We're viewing communication through a new lens.
                                Seamless, secure, and beautifully designed for the modern web.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="relative py-32 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-8 md:px-16">
                        <div className="relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-y-1/2" />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="p-10 rounded-3xl bg-gradient-to-tr from-[#0F0F13] to-[#141419] border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full group-hover:bg-purple-500/20 transition-all duration-500" />

                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-8">
                                        <Target className="w-8 h-8 text-purple-400" />
                                    </div>

                                    <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-purple-300 transition-colors">Our Mission</h2>
                                    <p className="text-gray-400 leading-relaxed text-xl font-light">
                                        To create the most <span className="text-purple-400 font-medium">intuitive</span>,
                                        <span className="text-purple-400 font-medium"> secure</span>, and
                                        <span className="text-purple-400 font-medium"> beautiful</span> messaging platform
                                        that brings people closer together, regardless of distance using state-of-the-art technology.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="p-10 rounded-3xl bg-gradient-to-bl from-[#0F0F13] to-[#141419] border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                                >
                                    <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-all duration-500" />

                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-8">
                                        <Users className="w-8 h-8 text-blue-400" />
                                    </div>

                                    <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-blue-300 transition-colors">Our Vision</h2>
                                    <p className="text-gray-400 leading-relaxed text-xl font-light">
                                        A world where communication barriers don't exist, and everyone can
                                        connect <span className="text-blue-400 font-medium">effortlessly</span> with the people who matter most,
                                        in a digital space that feels like home.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="relative py-32 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-8 md:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-3xl md:text-6xl font-bold mb-6">
                                Core Values
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                The principles that guide every line of code we write
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group p-8 rounded-2xl bg-[#0f0f13]/70 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col relative overflow-hidden"
                                >
                                    <div className="flex flex-col h-full relative z-10">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                            <value.icon className="w-8 h-8 text-white" />
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                            {value.title}
                                        </h3>

                                        <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors">
                                            {value.description}
                                        </p>
                                    </div>

                                    {/* Glass Glow */}
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technology Stack */}
                <section className="relative py-32 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-8 md:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Built with Modern Technology
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                We use the latest and most reliable technologies to deliver the best experience
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {techStack.map((tech, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-xl bg-[#0f0f13]/70 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all text-center group h-full flex flex-col items-center justify-center"
                                >
                                    <div className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                                        {tech.name}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {tech.category}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>



                {/* CTA Section */}
                <section className="relative py-0 bg-[#050505] flex flex-col items-center justify-center">
                    <div className="max-w-4xl mx-auto px-8 md:px-16 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Join the Wave
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                                Be part of the communication revolution. Start connecting with WaveConnect today.
                            </p>

                            <Link
                                to="/signup"
                                className="inline-block group relative px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-[0_4px_15px_rgba(168,85,247,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(168,85,247,0.55)] overflow-hidden"
                            >
                                <span className="relative z-10">Get Started Free</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>


            <Footer />
        </div >
    );
};

export default AboutPage;
