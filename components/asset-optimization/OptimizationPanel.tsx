import { motion } from "framer-motion";
import { ChatInterface } from "./chat-interface";
import { ResearchNote } from "./ResearchNote";
import { ProtocolList } from "./ProtocolList";
import { VaultsLoading } from "./VaultsLoading";
import { EmptyState } from "./EmptyState";
import { OptimizationProgress } from "./optimization-progress";
import { RiskAssessment } from "./risk-assessment";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Asset, Protocol } from "./asset-card";

interface OptimizationPanelProps {
  selectedAsset: string | null;
  selectedAssetData: Asset | undefined;
  selectedAction: "borrow" | "lend" | null;
  isLoadingVaults: boolean;
  showChat: boolean;
  isOptimizing: boolean;
  isOptimized: boolean;
  optimizationProgress: number;
  handleActionSelect: (action: "borrow" | "lend") => void;
  handlePoolSelect: (poolId: string) => void;
  handleOptimize: () => void;
}

export function OptimizationPanel({
  selectedAsset,
  selectedAssetData,
  selectedAction,
  isLoadingVaults,
  showChat,
  isOptimizing,
  isOptimized,
  optimizationProgress,
  handleActionSelect,
  handlePoolSelect,
  handleOptimize,
}: OptimizationPanelProps) {
  if (!selectedAsset) {
    return (
      <EmptyState
        title="Select an Asset to Optimize"
        description="Choose an asset from your wallet to begin optimization"
      />
    );
  }

  if (showChat && selectedAssetData) {
    return (
      <ChatInterface asset={selectedAssetData} onSelect={handleActionSelect} />
    );
  }

  if (selectedAction && isLoadingVaults && selectedAssetData) {
    return (
      <VaultsLoading
        selectedAssetData={selectedAssetData}
        selectedAction={selectedAction}
      />
    );
  }

  if (selectedAction && selectedAssetData) {
    // Show optimization progress if optimizing
    if (isOptimizing) {
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
                    Finding the best yield strategies
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Optimization in progress...</span>
                <span>{Math.round(optimizationProgress)}%</span>
              </div>
              <OptimizationProgress
                progress={optimizationProgress}
                protocolCount={
                  selectedAssetData?.protocols.filter(
                    (p) => p.type === selectedAction
                  ).length || 0
                }
              />
            </div>
          </div>
        </div>
      );
    }

    // Show optimization results if optimized
    if (isOptimized) {
      const bestProtocol = selectedAssetData?.protocols
        .filter((p) => p.type === selectedAction)
        .reduce((best, current) => (current.apy > best.apy ? current : best));
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
                    Optimization complete
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-green-500/20 p-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Optimization Complete</h4>
                    <p className="text-sm text-slate-300">
                      We've found the optimal strategy for your{" "}
                      {selectedAssetData?.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Potential APY</p>
                  <p className="text-2xl font-bold text-green-500">
                    {bestProtocol ? (bestProtocol.apy * 1.1).toFixed(1) : "0.0"}
                    %
                  </p>
                </div>
              </div>
            </motion.div>
            <div className="mb-6">
              <h4 className="mb-3 font-medium">Recommended Strategy</h4>
              <div className="rounded-lg border border-slate-800 bg-slate-800/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-2">
                      <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold">
                        {bestProtocol?.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium">{bestProtocol?.name}</h5>
                      <p className="text-sm text-slate-400">
                        Recommended for{" "}
                        {selectedAction === "lend" ? "lending" : "borrowing"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">APY</p>
                    <p className="text-xl font-bold text-green-400">
                      {bestProtocol?.apy}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <RiskAssessment
              protocols={
                selectedAssetData?.protocols.filter(
                  (p) => p.type === selectedAction
                ) || []
              }
            />
            <div className="mt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Apply Optimized Strategy
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Show research note and protocol list (default state)
    const protocols = selectedAssetData.protocols.filter(
      (p) => p.type === selectedAction
    );
    return (
      <>
        <ResearchNote asset={selectedAssetData} action={selectedAction} />
        <h4 className="mb-3 font-medium">
          Available Protocols for {selectedAssetData?.name}
        </h4>
        <ProtocolList
          protocols={protocols}
          selectedAssetData={selectedAssetData}
          selectedAction={selectedAction}
          handlePoolSelect={handlePoolSelect}
        />
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleOptimize}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Find Optimal Strategy <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </>
    );
  }

  // Fallback state
  return (
    <EmptyState
      title="Please select an action"
      description="Choose whether you want to borrow or lend"
    />
  );
}
