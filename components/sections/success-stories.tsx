"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, TrendingUp, DollarSign, Users, Quote } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "DeFi Investor",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    testimonial:
      "Increased my DeFi returns by 340% in just 6 months. The AI optimization is incredible and the risk management gives me peace of mind.",
    earnings: "+$125,000",
    timeframe: "6 months",
  },
  {
    name: "Marcus Rodriguez",
    role: "Crypto Trader",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    testimonial:
      "Finally, a platform that actually delivers on its promises. The automated rebalancing saved me countless hours and maximized my yields.",
    earnings: "+$89,500",
    timeframe: "4 months",
  },
  {
    name: "Emily Watson",
    role: "Portfolio Manager",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    testimonial:
      "Managing client portfolios across multiple DeFi protocols has never been easier. The transparency and reporting features are top-notch.",
    earnings: "+$200,000",
    timeframe: "8 months",
  },
  {
    name: "David Kim",
    role: "Yield Farmer",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    testimonial:
      "Went from manual yield farming to AI-powered optimization. My APY increased from 12% to 45% while reducing time spent by 90%.",
    earnings: "+$67,800",
    timeframe: "3 months",
  },
];

const stats = [
  {
    icon: Users,
    label: "Happy Users",
    value: "24,689+",
    color: "text-blue-400",
  },
  {
    icon: DollarSign,
    label: "Total Earnings Generated",
    value: "$2.1B+",
    color: "text-green-400",
  },
  {
    icon: TrendingUp,
    label: "Average APY Increase",
    value: "340%",
    color: "text-purple-400",
  },
  {
    icon: Star,
    label: "User Satisfaction",
    value: "98.7%",
    color: "text-yellow-400",
  },
];

const caseStudies = [
  {
    title: "From $10K to $100K",
    subtitle: "College Student's Journey",
    description:
      "How Alex turned his student loan into a six-figure portfolio using our AI optimization",
    growth: "900%",
    period: "12 months",
    strategy: "Diversified Yield Farming",
  },
  {
    title: "Corporate Treasury Success",
    subtitle: "Fortune 500 Company",
    description:
      "Enterprise adoption resulted in $50M additional revenue from treasury management",
    growth: "15%",
    period: "6 months",
    strategy: "Conservative DeFi",
  },
  {
    title: "Retirement Fund Boost",
    subtitle: "401k to DeFi Migration",
    description:
      "Traditional investor achieved 10x returns by transitioning to DeFi strategies",
    growth: "1000%",
    period: "18 months",
    strategy: "Risk-Adjusted Portfolio",
  },
];

export default function SuccessStories() {
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
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real People,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Real Results
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join thousands of successful investors who have transformed their
            financial future with our AI-powered DeFi optimization platform.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-slate-800">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <Quote className="h-6 w-6 text-slate-600 mb-3" />
                  <p className="text-slate-300 mb-4 italic">
                    "{testimonial.testimonial}"
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                    <div>
                      <span className="text-green-400 font-bold text-lg">
                        {testimonial.earnings}
                      </span>
                      <span className="text-slate-400 text-sm ml-2">
                        earned
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-blue-500/30 text-blue-400"
                    >
                      {testimonial.timeframe}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Featured Case Studies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge
                      variant="outline"
                      className="border-purple-500/30 text-purple-400"
                    >
                      {study.strategy}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">
                        +{study.growth}
                      </div>
                      <div className="text-sm text-slate-400">
                        {study.period}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-400 transition-colors">
                    {study.title}
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    {study.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{study.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Write Your Success Story?
              </h3>
              <p className="text-slate-300 mb-6">
                Join our community of successful DeFi investors and start
                maximizing your returns today.
              </p>
              <div className="text-sm text-slate-400">
                Average user sees results within the first 30 days
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
