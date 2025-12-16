import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, CheckCircle, FileCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SecurityPage = () => {
    const securityFeatures = [
        {
            icon: Lock,
            title: "End-to-End Encryption",
            description: "All messages are encrypted using AES-256 encryption. Only you and your recipient can read them.",
            color: "from-purple-500 to-fuchsia-500"
        },
        {
            icon: Shield,
            title: "Zero-Knowledge Architecture",
            description: "We never store your encryption keys. Your data remains private, even from us.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Eye,
            title: "Privacy First",
            description: "No tracking, no ads, no data mining. Your conversations are yours alone.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Server,
            title: "Secure Infrastructure",
            description: "Enterprise-grade security with regular audits and compliance certifications.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: FileCheck,
            title: "Data Protection",
            description: "GDPR and CCPA compliant. Full control over your data with easy export and deletion.",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: CheckCircle,
            title: "Two-Factor Authentication",
            description: "Extra layer of security with 2FA support to protect your account.",
            color: "from-indigo-500 to-purple-500"
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 flex flex-col">
            <Navbar />

            <main className="flex-grow flex flex-col gap-24 pb-24">
                {/* Hero Section */}
                <section className="relative min-h-[600px] nav-offset flex flex-col justify-center pb-0 md:pb-0 overflow-hidden bg-[#050505]">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-black to-[#050505] -z-10" />
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/10 blur-[140px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-500/10 blur-[140px] rounded-full" />

                    <div className="max-w-7xl mx-auto p-8 md:p-16 lg:p-24 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-green-500/30 text-green-300 text-xs font-medium mb-8">
                                <Shield className="w-4 h-4" />
                                Bank-Grade Security
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-8 text-white tracking-tight">
                                Your Privacy is{" "}
                                <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                                    Our Priority
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                                WaveConnect uses military-grade encryption and zero-knowledge architecture
                                to ensure your conversations remain completely private and secure.
                            </p>

                            {/* CTA */}
                            <Link
                                to="/signup"
                                className="inline-block group relative px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(16,185,129,0.55)] overflow-hidden"
                            >
                                <span className="relative z-10">Get Started Securely</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Security Features Grid */}
                <section className="relative py-0 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-8 md:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Security Features
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                Every layer of WaveConnect is built with security in mind
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {securityFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative p-8 rounded-2xl bg-[#0f0f13]/70 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                                >
                                    {/* Gradient Glow on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 rounded-2xl`} />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                                            <feature.icon className="w-7 h-7 text-white" />
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 text-white">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Certifications Section */}
                <section className="relative py-0 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-8 md:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#0f0f13] to-[#1a1a1f] border border-white/10"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Compliance & Certifications
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                                We adhere to the highest industry standards and are compliant with major data protection regulations
                            </p>

                            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-300 font-semibold">
                                <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10">GDPR</div>
                                <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10">CCPA</div>
                                <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10">SOC 2</div>
                                <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10">ISO 27001</div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SecurityPage;
