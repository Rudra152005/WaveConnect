import React from "react";
import {
  MessageSquare,
  Shield,
  Globe,
  Users,
  Image as ImageIcon,
  Activity,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Real-Time Messaging",
    description:
      "Experience zero-latency chat powered by advanced Socket.IO technology.",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "End-to-end encryption ensures your conversations stay strictly between you and them.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Globe,
    title: "Connect Globally",
    description:
      "Break down borders with instant translation and worldwide servers.",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    icon: Users,
    title: "Group Chats",
    description:
      "Create communities with powerful group management tools.",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    icon: ImageIcon,
    title: "Media Sharing",
    description:
      "Share high-quality photos, videos, and files without compression.",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    icon: Activity,
    title: "Live Status",
    description:
      "See who's online, typing, or reading your messages in real-time.",
    gradient: "from-red-400 to-pink-400",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative bg-[#050505] mt-20 mb-12 py-20 md:py-32"
    >
      {/* Container */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        {/* HEADING BLOCK — FIXED */}
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
            Powerful{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl">
            Crafted for those who value aesthetics, speed, and security.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="min-h-[230px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center px-8"
              >
                <div
                  className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient}
                  flex items-center justify-center`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
