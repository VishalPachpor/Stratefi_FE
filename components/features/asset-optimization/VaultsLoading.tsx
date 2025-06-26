import { motion } from "framer-motion";
import { Asset } from "./asset-card";

interface VaultsLoadingProps {
  selectedAssetData: Asset;
  selectedAction: "borrow" | "lend";
}

export function VaultsLoading({
  selectedAssetData,
  selectedAction,
}: VaultsLoadingProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
              {selectedAssetData?.icon}
            </div>
            <div>
              <h3 className="text-xl font-medium">
                {selectedAssetData?.name} Optimization
              </h3>
              <p className="text-sm text-slate-400">
                AI is analyzing available vaults...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* AI Thinking Animation */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
              <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-lg font-bold text-white">AI</span>
              </div>
            </div>
            {/* Thinking dots */}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-blue-500"
            />
          </motion.div>
          {/* Loading Text */}
          <div className="text-center space-y-2">
            <motion.h4
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg font-medium text-white"
            >
              AI is thinking...
            </motion.h4>
            <p className="text-sm text-slate-400">
              Analyzing {selectedAction === "lend" ? "lending" : "borrowing"}{" "}
              protocols for {selectedAssetData?.name}
            </p>
          </div>
          {/* Loading Steps */}
          <div className="w-full max-w-md space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-3 text-sm"
            >
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-slate-300">Scanning DeFi protocols</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center space-x-3 text-sm"
            >
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="text-slate-300">Calculating optimal yields</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="flex items-center space-x-3 text-sm"
            >
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-slate-300">
                Preparing vault recommendations
              </span>
            </motion.div>
          </div>
          {/* Progress Bar */}
          <div className="w-full max-w-md">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
