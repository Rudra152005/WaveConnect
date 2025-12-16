import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Zap, Star, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PricingPage = () => {
    const pricingPlans = [
        {
            name: "Free",
            icon: Zap,
            price: "0",
            period: "Forever",
            description: "Perfect for personal use and small teams",
            features: [
                "Unlimited 1-on-1 messaging",
                "Up to 5 group chats",
                "End-to-end encryption",
                "File sharing (up to 25MB)",
                "Voice messages",
                "Basic themes"
            ],
            cta: "Get Started",
            color: "from-blue-500 to-cyan-500",
            popular: false
        },
        {
            name: "Pro",
            icon: Star,
            price: "9",
            period: "per month",
            description: "For power users and growing teams",
            features: [
                "Everything in Free",
                "Unlimited group chats",
                "Priority support",
                "File sharing (up to 100MB)",
                "Advanced themes & customization",
                "Video & voice calls",
                "Screen sharing",
                "Custom emojis"
            ],
            cta: "Start Free Trial",
            color: "from-purple-500 to-fuchsia-500",
            popular: true
        },
        {
            name: "Enterprise",
            icon: Sparkles,
            price: "Custom",
            period: "contact us",
            description: "For large organizations with special needs",
            features: [
                "Everything in Pro",
                "Dedicated account manager",
                "Custom integrations",
                "Advanced analytics",
                "SSO & SAML support",
                "Compliance & security reviews",
                "Custom SLA",
                "On-premise deployment option"
            ],
            cta: "Contact Sales",
            color: "from-orange-500 to-red-500",
            popular: false
        }
    ];

    const faqs = [
        {
            question: "Can I change my plan later?",
            answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
        },
        {
            question: "Is there a free trial for Pro?",
            answer: "Absolutely! We offer a 14-day free trial for the Pro plan with no credit card required."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and wire transfers for Enterprise customers."
        },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel anytime. You'll continue to have access until the end of your billing period."
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 flex flex-col">
            <Navbar />

            <main className="flex-grow flex flex-col gap-24 pb-24">
                {/* Hero Section */}
                <section className="relative min-h-[600px] nav-offset flex flex-col justify-center pb-0 md:pb-0 overflow-hidden bg-[#050505]">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-[#050505] -z-10" />
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500/10 blur-[140px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-fuchsia-500/10 blur-[140px] rounded-full" />

                    <div className="max-w-7xl mx-auto p-8 md:p-16 lg:p-24 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-purple-500/30 text-purple-300 text-xs font-medium mb-8">
                                <Sparkles className="w-4 h-4" />
                                Simple, Transparent Pricing
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-8 text-white tracking-tight">
                                Choose Your{" "}
                                <span className="bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent">
                                    Perfect Plan
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                                Start for free and scale as you grow. All plans include end-to-end encryption and premium features.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="relative py-0 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-8 md:px-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pricingPlans.map((plan, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`relative p-8 rounded-2xl bg-[#0f0f13]/70 backdrop-blur-xl border transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${plan.popular
                                        ? "border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                                        : "border-white/10 hover:border-white/20"
                                        }`}
                                >
                                    {/* Popular Badge */}
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-sm font-semibold">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="flex flex-col h-full">
                                        {/* Icon */}
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                                            <plan.icon className="w-7 h-7 text-white" />
                                        </div>

                                        {/* Plan Name */}
                                        <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>

                                        {/* Description */}
                                        <p className="text-gray-400 mb-6">{plan.description}</p>

                                        {/* Price */}
                                        <div className="mb-8">
                                            {plan.price === "Custom" ? (
                                                <div className="text-4xl font-bold text-white">Custom</div>
                                            ) : (
                                                <div className="flex items-baseline">
                                                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                                                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-4 mb-8 flex-grow">
                                            {plan.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-300">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <Link
                                            to={plan.name === "Enterprise" ? "/contact" : "/signup"}
                                            className={`block w-full py-3 rounded-xl font-semibold text-center transition-all mt-auto ${plan.popular
                                                ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg hover:shadow-purple-500/50"
                                                : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            {plan.cta}
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="relative py-0 bg-[#050505]">
                    <div className="max-w-3xl mx-auto px-8 md:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Have questions? We've got answers.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-2xl bg-[#0f0f13]/70 backdrop-blur-xl border border-white/10 text-center hover:border-purple-500/30 transition-colors"
                                >
                                    <h3 className="text-xl font-bold mb-3 text-white text-center">
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-center">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PricingPage;
