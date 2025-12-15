import React from "react";
import { Link } from "react-router-dom";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative pt-10 pb-8 px-4 sm:px-6 lg:px-8">
      <div 
        className="
          max-w-[1600px] 
          mx-auto 
          bg-[#050505] 
          rounded-3xl 
          border 
          border-white/10 
          overflow-hidden 
          relative
          pt-16 pb-12 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32
        "
      >
        {/* Background Decor */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight">
              Wave<span className="text-purple-500">Connect</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              The next generation of messaging. Connect with speed, style, and total security. 
              Join the wave today.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={Github} />
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Linkedin} />
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              <FooterLink to="/features">Features</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
              <FooterLink to="/download">Download</FooterLink>
              <FooterLink to="/changelog">Changelog</FooterLink>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-4">
              <FooterLink to="/docs">Documentation</FooterLink>
              <FooterLink to="/api">API Reference</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/community">Community</FooterLink>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/legal">Legal</FooterLink>
              <div className="pt-4">
                <a 
                  href="mailto:hello@waveconnect.com" 
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </div>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 px-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} WaveConnect. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-gray-500 text-sm">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500/20" /> by Rudhra Team
          </p>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const SocialLink = ({ href, icon: Icon }) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white hover:border-purple-500/50 transition-all duration-300"
  >
    <Icon className="w-4 h-4" />
  </a>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-400 hover:text-white transition-colors text-sm"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
