"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  CheckCircle,
  Award,
  Users,
  Zap,
  Globe,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const securityFeatures = [
  {
    icon: Shield,
    title: "Multi-Signature Security",
    description:
      "All transactions require multiple signatures for enhanced protection",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "Your data is encrypted using military-grade AES-256 encryption",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
  },
  {
    icon: Eye,
    title: "Real-time Monitoring",
    description: "24/7 security monitoring with immediate threat detection",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    icon: CheckCircle,
    title: "Smart Contract Audits",
    description:
      "Regular audits by leading security firms like Certik and ConsenSys",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
];

const trustMetrics = [
  {
    icon: Users,
    value: "50,000+",
    label: "Trusted Users",
    description: "Active users worldwide",
  },
  {
    icon: Shield,
    value: "$2.1B+",
    label: "Assets Secured",
    description: "Under management",
  },
  {
    icon: Award,
    value: "99.9%",
    label: "Uptime Record",
    description: "Platform availability",
  },
  {
    icon: CheckCircle,
    value: "0",
    label: "Security Breaches",
    description: "Since platform launch",
  },
];

const certifications = [
  {
    title: "SOC 2 Type II",
    description: "Independently verified security controls",
    status: "Certified",
  },
  {
    title: "ISO 27001",
    description: "Information security management standard",
    status: "Compliant",
  },
  {
    title: "PCI DSS Level 1",
    description: "Payment card industry security standards",
    status: "Certified",
  },
  {
    title: "GDPR Compliant",
    description: "European data protection regulation",
    status: "Compliant",
  },
];

const auditPartners = [
  { name: "CertiK", logo: "🛡️", description: "Smart contract security audit" },
  {
    name: "ConsenSys Diligence",
    logo: "🔍",
    description: "Blockchain security review",
  },
  { name: "OpenZeppelin", logo: "⚡", description: "Security framework audit" },
  {
    name: "Trail of Bits",
    logo: "🔒",
    description: "Cryptography & security audit",
  },
];

export default function SecurityTrust() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-slate-900/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-green-500/30 text-green-400"
          >
            Security & Trust
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Security First
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Your security is our top priority. We employ industry-leading
            security measures and undergo regular audits to ensure your assets
            are always protected.
          </p>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {trustMetrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 border-slate-800 text-center"
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-slate-800">
                    <metric.icon className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-green-400 font-semibold mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-slate-400">
                  {metric.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto p-4 rounded-xl ${feature.bgColor} mb-4 w-fit`}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-green-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Certifications & Compliance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-800 text-center"
              >
                <CardContent className="p-6">
                  <Badge
                    variant="outline"
                    className="mb-4 border-green-500/30 text-green-400"
                  >
                    {cert.status}
                  </Badge>
                  <h4 className="font-semibold text-white mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-slate-400">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Audit Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Audited by Industry Leaders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {auditPartners.map((partner, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{partner.logo}</div>
                  <h4 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Insurance & Protection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <Shield className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">
                    $50M Insurance Coverage
                  </h4>
                  <p className="text-slate-300">
                    Comprehensive protection for all user funds
                  </p>
                </div>

                <div className="text-center">
                  <Lock className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">
                    Cold Storage Security
                  </h4>
                  <p className="text-slate-300">
                    95% of funds stored in offline cold wallets
                  </p>
                </div>

                <div className="text-center">
                  <Globe className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">
                    Global Compliance
                  </h4>
                  <p className="text-slate-300">
                    Regulated in 40+ countries worldwide
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-700">
                <p className="text-slate-300 text-center">
                  ✓ Regular third-party audits &nbsp;&nbsp;&nbsp; ✓ Bug bounty
                  program &nbsp;&nbsp;&nbsp; ✓ 24/7 security monitoring
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
