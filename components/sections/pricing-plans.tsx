"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Star, Zap, Crown, ArrowRight, DollarSign } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const pricingPlans = [
  {
    name: "Starter",
    icon: DollarSign,
    description: "Perfect for beginners exploring DeFi",
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: "from-slate-600 to-slate-700",
    borderColor: "border-slate-700",
    popular: false,
    features: [
      "Up to $10K portfolio management",
      "5 protocol integrations",
      "Basic yield optimization",
      "Weekly performance reports",
      "Email support",
      "Mobile app access",
    ],
    limitations: [
      "No advanced AI features",
      "Limited to 3 rebalancing per month",
    ],
  },
  {
    name: "Professional",
    icon: Zap,
    description: "For serious DeFi investors and traders",
    monthlyPrice: 49,
    yearlyPrice: 490,
    color: "from-blue-600 to-purple-600",
    borderColor: "border-blue-500",
    popular: true,
    features: [
      "Up to $500K portfolio management",
      "25+ protocol integrations",
      "Advanced AI optimization",
      "Daily performance reports",
      "Priority support",
      "Advanced analytics dashboard",
      "Custom risk parameters",
      "API access",
      "Tax reporting tools",
    ],
    limitations: [],
  },
  {
    name: "Enterprise",
    icon: Crown,
    description: "For institutions and high-net-worth individuals",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    color: "from-yellow-500 to-orange-500",
    borderColor: "border-yellow-500",
    popular: false,
    features: [
      "Unlimited portfolio management",
      "All protocol integrations",
      "Custom AI strategies",
      "Real-time reporting",
      "Dedicated account manager",
      "White-label solutions",
      "Multi-signature support",
      "Advanced API & webhooks",
      "Custom integrations",
      "24/7 phone support",
      "Institutional insurance",
    ],
    limitations: [],
  },
];

const additionalFeatures = [
  {
    feature: "Smart Contract Audits",
    starter: "Basic",
    pro: "Advanced",
    enterprise: "Custom",
  },
  {
    feature: "Yield Optimization",
    starter: "Manual",
    pro: "AI-Powered",
    enterprise: "Custom AI",
  },
  {
    feature: "Support Level",
    starter: "Email",
    pro: "Priority",
    enterprise: "Dedicated",
  },
  {
    feature: "API Rate Limits",
    starter: "100/day",
    pro: "10K/day",
    enterprise: "Unlimited",
  },
];

export default function PricingPlans() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section ref={ref} className="py-20 lg:py-32">
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
            className="mb-4 border-yellow-500/30 text-yellow-400"
          >
            Pricing Plans
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Start for free and upgrade as your portfolio grows. All plans
            include our core features with varying levels of sophistication and
            support.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span
              className={`text-sm ${
                !isYearly ? "text-white" : "text-slate-400"
              }`}
            >
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-green-600"
            />
            <span
              className={`text-sm ${
                isYearly ? "text-white" : "text-slate-400"
              }`}
            >
              Yearly
            </span>
            <Badge
              variant="outline"
              className="border-green-500/30 text-green-400 ml-2"
            >
              Save 16%
            </Badge>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full ${plan.borderColor} ${
                  plan.popular
                    ? "border-2 shadow-2xl shadow-blue-500/20"
                    : "border"
                } bg-slate-900/50 hover:border-opacity-80 transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <CardHeader className="relative text-center">
                  <div
                    className={`mx-auto p-4 rounded-xl bg-gradient-to-br ${plan.color} mb-4 w-fit`}
                  >
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {plan.description}
                  </CardDescription>

                  <div className="py-6">
                    <div className="text-4xl font-bold text-white">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      <span className="text-lg font-normal text-slate-400">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-green-400 mt-1">
                        Save ${plan.monthlyPrice * 12 - plan.yearlyPrice} per
                        year
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-slate-300"
                      >
                        <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-800">
                      <p className="text-sm text-slate-500 mb-2">
                        Limitations:
                      </p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li
                            key={limitIndex}
                            className="text-sm text-slate-500 flex items-center"
                          >
                            <span className="w-1 h-1 bg-slate-500 rounded-full mr-2" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="relative">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                    size="lg"
                  >
                    {plan.name === "Starter"
                      ? "Get Started Free"
                      : "Start Free Trial"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            Feature Comparison
          </h3>
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left p-6 text-slate-400">Features</th>
                      <th className="text-center p-6 text-slate-400">
                        Starter
                      </th>
                      <th className="text-center p-6 text-blue-400">
                        Professional
                      </th>
                      <th className="text-center p-6 text-yellow-400">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {additionalFeatures.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-800 last:border-b-0"
                      >
                        <td className="p-6 text-white font-medium">
                          {item.feature}
                        </td>
                        <td className="p-6 text-center text-slate-300">
                          {item.starter}
                        </td>
                        <td className="p-6 text-center text-slate-300">
                          {item.pro}
                        </td>
                        <td className="p-6 text-center text-slate-300">
                          {item.enterprise}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ/Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                All Plans Include
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <h4 className="font-semibold mb-2">Bank-Level Security</h4>
                  <p className="text-sm">
                    End-to-end encryption and secure custody
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold mb-2">Mobile & Web Apps</h4>
                  <p className="text-sm">
                    Access your portfolio anywhere, anytime
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <h4 className="font-semibold mb-2">No Lock-in Period</h4>
                  <p className="text-sm">
                    Cancel or upgrade anytime without penalties
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-slate-400 text-sm">
                  All plans come with a 14-day free trial. No credit card
                  required for Starter plan.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
