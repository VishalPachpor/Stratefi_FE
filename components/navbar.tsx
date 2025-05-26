"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wallet,
  BarChart3,
  TrendingUp,
  Settings,
  Menu,
  X,
  Brain,
  Shield,
  Zap,
  Globe,
  User,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  badge?: string;
}

interface DropdownSection {
  title: string;
  links: NavLink[];
}

const navLinks: NavLink[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: <BarChart3 className="h-4 w-4" />,
    description: "Overview & analytics",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: <TrendingUp className="h-4 w-4" />,
    description: "Your yield positions",
  },
  {
    href: "/markets",
    label: "Markets",
    icon: <Globe className="h-4 w-4" />,
    description: "Explore opportunities",
    badge: "Hot",
  },
  {
    href: "/strategies",
    label: "Strategies",
    icon: <Brain className="h-4 w-4" />,
    description: "AI-powered optimization",
  },
  {
    href: "/security",
    label: "Security",
    icon: <Shield className="h-4 w-4" />,
    description: "Risk management",
  },
];

const dropdownSections: DropdownSection[] = [
  {
    title: "Trading",
    links: [
      {
        href: "/yield-farming",
        label: "Yield Farming",
        icon: <TrendingUp className="h-4 w-4" />,
        description: "Optimized farming strategies",
      },
      {
        href: "/liquidity-pools",
        label: "Liquidity Pools",
        icon: <Zap className="h-4 w-4" />,
        description: "Provide liquidity & earn",
      },
      {
        href: "/staking",
        label: "Staking",
        icon: <Shield className="h-4 w-4" />,
        description: "Secure networks & earn rewards",
      },
    ],
  },
  {
    title: "Analytics",
    links: [
      {
        href: "/performance",
        label: "Performance",
        icon: <BarChart3 className="h-4 w-4" />,
        description: "Track your returns",
      },
      {
        href: "/ai-insights",
        label: "AI Insights",
        icon: <Brain className="h-4 w-4" />,
        description: "Market intelligence",
        badge: "New",
      },
      {
        href: "/reports",
        label: "Reports",
        icon: <Settings className="h-4 w-4" />,
        description: "Detailed analytics",
      },
    ],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Mock wallet connection
  const connectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl opacity-0"
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  StratiFi
                </h1>
                <p className="text-xs text-slate-400 -mt-1">
                  AI Yield Optimizer
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavItem key={link.href} link={link} pathname={pathname} />
              ))}

              {/* More Dropdown */}
              {/* <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("more")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors">
                  <span>More</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <AnimatePresence>
                  {activeDropdown === "more" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-96 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-4 p-4">
                        {dropdownSections.map((section) => (
                          <div key={section.title}>
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                              {section.title}
                            </h3>
                            <div className="space-y-1">
                              {section.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className="block p-2 rounded-lg hover:bg-slate-800/50 transition-colors group"
                                >
                                  <div className="flex items-center space-x-2">
                                    <div className="text-blue-400 group-hover:text-blue-300">
                                      {link.icon}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-white">
                                          {link.label}
                                        </span>
                                        {link.badge && (
                                          <Badge
                                            variant="outline"
                                            className="text-xs border-blue-500/20 text-blue-400"
                                          >
                                            {link.badge}
                                          </Badge>
                                        )}
                                      </div>
                                      {link.description && (
                                        <p className="text-xs text-slate-400">
                                          {link.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> */}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Wallet Connection */}
              {/* <Button
                onClick={connectWallet}
                className={cn(
                  "hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300",
                  isWalletConnected
                    ? "bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                )}
                size="sm"
              >
                <Wallet className="h-4 w-4" />
                <span>
                  {isWalletConnected ? "0x1234...5678" : "Connect Wallet"}
                </span>
              </Button> */}

              {/* User Menu (when connected) */}
              {isWalletConnected && (
                <div className="hidden sm:block relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                  >
                    <User className="h-4 w-4 text-white" />
                  </motion.button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {/* Mobile Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                      pathname === link.href
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                    )}
                  >
                    {link.icon}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{link.label}</span>
                        {link.badge && (
                          <Badge
                            variant="outline"
                            className="text-xs border-blue-500/20 text-blue-400"
                          >
                            {link.badge}
                          </Badge>
                        )}
                      </div>
                      {link.description && (
                        <p className="text-xs text-slate-400">
                          {link.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}

                {/* Mobile Wallet Connection */}
                {/* <Button
                  onClick={connectWallet}
                  className={cn(
                    "w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-all duration-300",
                    isWalletConnected
                      ? "bg-green-600/20 border border-green-500/30 text-green-400"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  )}
                >
                  <Wallet className="h-4 w-4" />
                  <span>
                    {isWalletConnected ? "0x1234...5678" : "Connect Wallet"}
                  </span>
                </Button> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
}

// Individual Navigation Item Component
interface NavItemProps {
  link: NavLink;
  pathname: string;
}

function NavItem({ link, pathname }: NavItemProps) {
  const isActive = pathname === link.href;

  return (
    <Link
      href={link.href}
      className="relative group flex items-center space-x-2"
    >
      <motion.div
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300",
          isActive
            ? "text-blue-400"
            : "text-slate-300 hover:text-white group-hover:bg-slate-800/30"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {link.icon}
        <span className="font-medium">{link.label}</span>
        {link.badge && (
          <Badge
            variant="outline"
            className="text-xs border-blue-500/20 text-blue-400"
          >
            {link.badge}
          </Badge>
        )}
      </motion.div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full"
          layoutId="active-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}
