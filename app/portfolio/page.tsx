"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, BarChart3, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PortfolioPage() {
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
            Portfolio Overview
          </h1>
          <p className="text-slate-300 text-lg">
            Track your DeFi positions and yield optimization performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Value"
            value="$125,420.50"
            change="+12.3%"
            icon={<DollarSign className="h-6 w-6" />}
            positive={true}
          />
          <StatsCard
            title="24h Yield"
            value="$342.18"
            change="+8.7%"
            icon={<TrendingUp className="h-6 w-6" />}
            positive={true}
          />
          <StatsCard
            title="Active Positions"
            value="12"
            change="+2"
            icon={<BarChart3 className="h-6 w-6" />}
            positive={true}
          />
          <StatsCard
            title="Risk Score"
            value="Low"
            change="Stable"
            icon={<Shield className="h-6 w-6" />}
            positive={true}
          />
        </div>

        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Your Positions</CardTitle>
            <CardDescription>
              Active yield farming and staking positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-4"
              >
                <TrendingUp className="h-16 w-16 text-blue-400 mx-auto" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Portfolio Coming Soon
              </h3>
              <p className="text-slate-400">
                Connect your wallet to view your positions and optimize your
                yields.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive: boolean;
}

function StatsCard({ title, value, change, icon, positive }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-blue-400">{icon}</div>
            <Badge
              variant="outline"
              className={
                positive
                  ? "border-green-500/20 text-green-400"
                  : "border-red-500/20 text-red-400"
              }
            >
              {change}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
