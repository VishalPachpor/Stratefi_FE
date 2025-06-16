"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Twitter,
  Github,
  Linkedin,
  MessageCircle,
  ArrowUp,
  X,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const footerLinks = {
  // product: [
  //   { name: "Features", href: "#features" },
  //   // { name: "Pricing", href: "#pricing" },
  //   { name: "Security", href: "#security" },
  //   // { name: "API Docs", href: "#api" },
  //   // { name: "Roadmap", href: "#roadmap" },
  // ],
  company: [
    { name: "X", href: "https://x.com/stratifixyz" },
    { name: "Telegram", href: "https://t.me/stratifixyz" },
    { name: "Discord", href: "https://discord.gg/mwaP3SRz2e" },
    { name: "Contact Us", href: "/contacts" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ],
  resources: [
    {
      name: "Docs",
      href: "https://docs.stratifi.xyz/docs/category/stratifi-ai-agent",
    },
  ],
};

const socialLinks = [
  {
    name: "Twitter",
    icon: Twitter,
    href: "#twitter",
    color: "hover:text-blue-400",
  },

  {
    name: "Discord",
    icon: MessageCircle,
    href: "#discord",
    color: "hover:text-purple-400",
  },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@defiplatform.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  {
    icon: MapPin,
    label: "Address",
    value: "123 DeFi Street, Crypto Valley, CV 12345",
  },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Logo */}
          <div className="flex-1 mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold text-white">StratiFi</span>
            </div>
            {/* Social Icons below logo */}
            <div className="flex justify-center gap-8 mt-4 mb-2">
              <a
                href="https://x.com/stratifixyz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-7 h-7" />
              </a>
              <a
                href="https://t.me/stratifixyz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Send className="w-7 h-7" />
              </a>
              <a
                href="https://discord.gg/mwaP3SRz2e"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.8732.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1835 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.1046 2.1568 2.4189 0 1.3333-.9555 2.419-2.1569 2.419zm7.9748 0c-1.1836 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.1046 2.1568 2.4189 0 1.3333-.946 2.419-2.1568 2.419Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            {/* Products */}
            <div>
              <h4 className="text-white font-bold mb-4">Products</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/portfolio"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                {/* Add more product links if available */}
              </ul>
            </div>
            {/* Company */}
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/contacts"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                {/* Add more company links if available */}
              </ul>
            </div>
            {/* Resources */}
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://docs.stratifi.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Whitepaper
                  </a>
                </li>
              </ul>
            </div>
            {/* Developers */}
            <div>
              <h4 className="text-white font-bold mb-4">Developers</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/api"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    API/SDK
                  </a>
                </li>
                {/* Add more developer links if available */}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-slate-400 text-sm">
            © Stratifi {new Date().getFullYear()}
          </span>
          <div className="flex gap-8">
            <a
              href="/privacy-policy"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Terms and conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
