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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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
    // { name: "Contact", href: "#contact" },
    // { name: "Blog", href: "#blog" },
  ],
  resources: [
    {
      name: "Docs",
      href: "https://docs.stratifi.xyz/docs/category/stratifi-ai-agent",
    },
    // { name: "Community", href: "#community" },
    // { name: "Tutorials", href: "#tutorials" },
    // { name: "Webinars", href: "#webinars" },
    // { name: "Status Page", href: "#status" },
  ],
  // legal: [
  //   // { name: "Privacy Policy", href: "#privacy" },
  //   // { name: "Terms of Service", href: "#terms" },
  //   // { name: "Cookie Policy", href: "#cookies" },
  //   // { name: "Compliance", href: "#compliance" },
  //   // { name: "Licenses", href: "#licenses" },
  // ],
};

const socialLinks = [
  {
    name: "Twitter",
    icon: Twitter,
    href: "#twitter",
    color: "hover:text-blue-400",
  },
  // {
  //   name: "LinkedIn",
  //   icon: Linkedin,
  //   href: "#linkedin",
  //   color: "hover:text-blue-600",
  // },
  // {
  //   name: "GitHub",
  //   icon: Github,
  //   href: "#github",
  //   color: "hover:text-gray-400",
  // },
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
    <footer ref={ref} className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Company Info & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {/* Logo */}
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <span className="text-2xl font-bold text-white">
                  StratiFi AI Agent
                </span>
              </div>

              <p className="text-slate-400 mb-8 leading-relaxed">
                Intelligent Autonomous DeFi
              </p>

              {/* Newsletter Signup */}
              {/* <div className="mb-8">
                <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Get weekly updates on market insights and platform features.
                </p>
              </div> */}

              {/* Social Links */}
              {/* <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${social.color} transition-colors duration-200`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div> */}
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="lg:col-span-1"
              >
                <h4 className="text-white font-semibold mb-6 capitalize">
                  {category === "legal" ? "Legal" : category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        className="text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          {/*<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 pt-12 border-t border-slate-800"
          >
            <h4 className="text-white font-semibold mb-8 text-center">
              Get in Touch
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center md:justify-start"
                >
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 mr-4">
                    <contact.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{contact.label}</p>
                    <p className="text-white">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>*/}
        </div>

        <Separator className="bg-slate-800" />

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-slate-400 text-sm">
                © 2025 StratiFi. All rights reserved.
              </p>
              {/* <div className="flex items-center space-x-4 text-sm text-slate-500">
                <span>🔒 SOC 2 Certified</span>
                <span>🛡️ GDPR Compliant</span>
                <span>⚡ 99.9% Uptime</span>
              </div> */}
            </div>

            {/* Back to Top */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </motion.div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
        </div>
      </div>
    </footer>
  );
}
