"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wallet,
  Home as HomeIcon,
  TrendingUp,
  Book,
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
  external?: boolean;
}

const navLinks: NavLink[] = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon className="h-4 w-4" />,
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
    href: "https://docs.stratifi.xyz/",
    label: "Docs",
    icon: <Book className="h-4 w-4" />,
    description: "Platform documentation",
    external: true,
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
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-slate-900 border-b border-slate-700/50 shadow-lg"
            : "bg-slate-900"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
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
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
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
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg transition-colors font-medium",
                      pathname === link.href
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                    )}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg transition-colors font-medium",
                      pathname === link.href
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                    )}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>

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

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center space-x-2"
      >
        <div
          className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300",
            "text-slate-300 hover:text-white group-hover:bg-slate-800/30"
          )}
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
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className="relative group flex items-center space-x-2"
    >
      <div
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300",
          isActive
            ? "text-blue-400"
            : "text-slate-300 hover:text-white group-hover:bg-slate-800/30"
        )}
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
      </div>
      {isActive && (
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
