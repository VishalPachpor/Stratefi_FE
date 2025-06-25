import { motion } from "framer-motion";
import { generateResearchNote } from "./utils/optimization";
import { Asset } from "./asset-card";

interface ResearchNoteProps {
  asset: Asset;
  action: "borrow" | "lend";
}

export function ResearchNote({ asset, action }: ResearchNoteProps) {
  const protocols = asset.protocols.filter((p) => p.type === action);
  if (protocols.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 rounded-lg border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 p-1">
              <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-sm font-bold text-white">!</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <h4 className="text-lg font-medium text-white">
                No Protocols Available
              </h4>
              <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs text-yellow-400">
                {action === "lend" ? "Lending" : "Borrowing"} Unavailable
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              No {action} protocols are currently available for {asset.name}.
              This could be due to market conditions, protocol updates, or
              temporary unavailability.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <h5 className="text-sm font-medium text-white mb-2">
                Suggestions:
              </h5>
              <ul className="space-y-1 text-sm text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Try selecting a different asset</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Check back later for new protocols</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>
                    Consider the opposite action (lend instead of borrow)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const research = generateResearchNote(asset, action);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
              <span className="text-sm font-bold text-white">AI</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <h4 className="text-lg font-medium text-white">
              AI Research Analysis
            </h4>
            <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
              {action === "lend" ? "Lending" : "Borrowing"} Analysis
            </span>
          </div>
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              {research.recommendation}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Best Protocol:</span>
                  <span className="text-sm font-medium text-white">
                    {research.bestProtocol}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Best APY:</span>
                  <span className="text-sm font-medium text-green-400">
                    {research.bestApy}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Average APY:</span>
                  <span className="text-sm font-medium text-slate-300">
                    {research.avgApy}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Protocols Analyzed:
                  </span>
                  <span className="text-sm font-medium text-white">
                    {research.protocolCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Risk Level:</span>
                  <span
                    className={`text-sm font-medium ${
                      research.riskLevel === "low"
                        ? "text-green-400"
                        : research.riskLevel === "medium"
                        ? "text-yellow-400"
                        : research.riskLevel === "high"
                        ? "text-red-400"
                        : "text-slate-400"
                    }`}
                  >
                    {research.riskLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Asset:</span>
                  <span className="text-sm font-medium text-white">
                    {research.asset}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-4">
              <h5 className="text-sm font-medium text-white mb-2">
                Key Factors:
              </h5>
              <ul className="space-y-1">
                {research.keyFactors.map((factor, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-2 text-sm text-slate-300"
                  >
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{factor}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
