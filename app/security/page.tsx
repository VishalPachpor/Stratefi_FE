"use client";

import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  Lock,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const securityFeatures = [
  {
    id: 1,
    title: "Smart Contract Audits",
    description: "All protocols undergo comprehensive security audits",
    status: "active",
    icon: <Shield className="h-6 w-6" />,
    level: 95,
  },
  {
    id: 2,
    title: "Real-time Risk Monitoring",
    description: "24/7 monitoring of protocol health and market conditions",
    status: "active",
    icon: <Eye className="h-6 w-6" />,
    level: 98,
  },
  {
    id: 3,
    title: "Automated Risk Management",
    description: "Automatic position adjustments based on risk parameters",
    status: "active",
    icon: <Zap className="h-6 w-6" />,
    level: 92,
  },
  {
    id: 4,
    title: "Insurance Coverage",
    description: "Protocol insurance for eligible positions",
    status: "partial",
    icon: <Lock className="h-6 w-6" />,
    level: 75,
  },
];

const riskMetrics = [
  { label: "Overall Risk Score", value: 85, status: "good" },
  { label: "Protocol Diversification", value: 92, status: "excellent" },
  { label: "Liquidity Risk", value: 78, status: "good" },
  { label: "Smart Contract Risk", value: 88, status: "good" },
  { label: "Market Risk", value: 74, status: "moderate" },
  { label: "Counterparty Risk", value: 91, status: "excellent" },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Security & Risk Management
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Comprehensive security measures and intelligent risk management to
            protect your assets
          </p>
        </motion.div>

        {/* Security Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">Secure</p>
                <p className="text-sm text-slate-400">
                  All Systems Operational
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-sm text-slate-400">Active Monitoring</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-6 text-center">
                <Lock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">95%</p>
                <p className="text-sm text-slate-400">Insurance Coverage</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Security Features</CardTitle>
                <CardDescription>
                  Multi-layered security approach to protect your investments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {securityFeatures.map((feature, index) => (
                  <SecurityFeatureCard
                    key={feature.id}
                    feature={feature}
                    index={index}
                  />
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Risk Assessment</CardTitle>
                <CardDescription>
                  Real-time risk metrics across different categories
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskMetrics.map((metric, index) => (
                  <RiskMetricItem
                    key={metric.label}
                    metric={metric}
                    index={index}
                  />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Risk Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <span>Risk Alerts & Notifications</span>
              </CardTitle>
              <CardDescription>
                Recent security events and risk notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        All Systems Normal
                      </p>
                      <p className="text-xs text-slate-400">
                        Last checked: 2 minutes ago
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-green-500/20 text-green-400"
                  >
                    Resolved
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Protocol Health Check
                      </p>
                      <p className="text-xs text-slate-400">
                        Automated monitoring active
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-blue-500/20 text-blue-400"
                  >
                    Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Risk Rebalancing
                      </p>
                      <p className="text-xs text-slate-400">
                        Auto-adjustment completed
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-purple-500/20 text-purple-400"
                  >
                    Completed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

interface SecurityFeatureCardProps {
  feature: {
    id: number;
    title: string;
    description: string;
    status: string;
    icon: React.ReactNode;
    level: number;
  };
  index: number;
}

function SecurityFeatureCard({ feature, index }: SecurityFeatureCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-green-500/20 text-green-400";
      case "partial":
        return "border-yellow-500/20 text-yellow-400";
      case "inactive":
        return "border-red-500/20 text-red-400";
      default:
        return "border-slate-500/20 text-slate-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg"
    >
      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white">
        {feature.icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-white">{feature.title}</h4>
        <p className="text-sm text-slate-400">{feature.description}</p>
        <div className="mt-2 flex items-center space-x-2">
          <Progress value={feature.level} className="flex-1 h-2" />
          <span className="text-xs text-slate-400">{feature.level}%</span>
        </div>
      </div>
      <Badge variant="outline" className={getStatusColor(feature.status)}>
        {feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
      </Badge>
    </motion.div>
  );
}

interface RiskMetricItemProps {
  metric: {
    label: string;
    value: number;
    status: string;
  };
  index: number;
}

function RiskMetricItem({ metric, index }: RiskMetricItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-400";
      case "good":
        return "text-blue-400";
      case "moderate":
        return "text-yellow-400";
      case "poor":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between"
    >
      <span className="text-sm text-slate-400">{metric.label}</span>
      <div className="flex items-center space-x-2">
        <Progress value={metric.value} className="w-20 h-2" />
        <span
          className={`text-sm font-medium ${getStatusColor(metric.status)}`}
        >
          {metric.value}%
        </span>
      </div>
    </motion.div>
  );
}
