import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Asset, Protocol } from "./asset-card";

interface ProtocolListProps {
  protocols: Protocol[];
  selectedAssetData: Asset;
  selectedAction: "borrow" | "lend";
  handlePoolSelect: (poolId: string) => void;
}

export function ProtocolList({
  protocols,
  selectedAssetData,
  selectedAction,
  handlePoolSelect,
}: ProtocolListProps) {
  if (protocols.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mb-4 rounded-full bg-slate-800 p-4 w-16 h-16 mx-auto flex items-center justify-center">
          <span className="text-2xl">📋</span>
        </div>
        <h5 className="text-lg font-medium text-white mb-2">
          No Protocols Found
        </h5>
        <p className="text-slate-400">
          No {selectedAction} protocols are currently available for{" "}
          {selectedAssetData?.name}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {protocols.map((protocol, index) => (
        <motion.div
          key={protocol.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.1 + index * 0.1,
          }}
          className="rounded-lg border border-slate-800 bg-slate-800/50 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-2">
                <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold">
                  {protocol.name.charAt(0)}
                </div>
              </div>
              <div>
                <h5 className="font-medium">{protocol.name}</h5>
                <p className="text-sm text-slate-400">
                  Protocol for {selectedAssetData?.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Current APY</p>
              <p className="text-xl font-bold text-green-400">
                {protocol.apy}%
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {protocol.features.map((feature, idx) => (
              <span
                key={idx}
                className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Risk Level:</span>
              <span
                className={`text-sm ${
                  protocol.risk === "low"
                    ? "text-green-400"
                    : protocol.risk === "medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {protocol.risk}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 hover:bg-slate-800"
              onClick={() => handlePoolSelect(protocol.pools[0].id)}
            >
              View Details
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
