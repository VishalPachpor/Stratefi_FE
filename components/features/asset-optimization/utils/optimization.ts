// Utility functions for asset optimization
import { Asset } from "../asset-card";

export const generateResearchNote = (
  asset: Asset,
  action: "borrow" | "lend"
) => {
  const protocols = asset.protocols.filter((p) => p.type === action);

  // Handle case when no protocols are found
  if (protocols.length === 0) {
    return {
      asset: asset.name,
      action: action,
      bestProtocol: "No protocols available",
      bestApy: 0,
      avgApy: "0.0",
      protocolCount: 0,
      riskLevel: "unknown",
      recommendation: `No ${action} protocols are currently available for ${asset.name}.`,
      keyFactors: [
        `No ${action} protocols found for ${asset.name}`,
        "Consider checking back later for new protocols",
        "You may want to try a different asset or action",
      ],
    };
  }

  const bestProtocol = protocols.reduce((best, current) =>
    current.apy > best.apy ? current : best
  );
  const avgApy =
    protocols.reduce((sum, p) => sum + p.apy, 0) / protocols.length;

  const researchNotes = {
    asset: asset.name,
    action: action,
    bestProtocol: bestProtocol.name,
    bestApy: bestProtocol.apy,
    avgApy: avgApy.toFixed(1),
    protocolCount: protocols.length,
    riskLevel: bestProtocol.risk,
    recommendation: "",
    keyFactors: [] as string[],
  };

  if (action === "lend") {
    researchNotes.recommendation = `Based on our analysis of ${protocols.length} lending protocols, ${bestProtocol.name} offers the highest yield at ${bestProtocol.apy}% APY for your ${asset.name}.`;
    researchNotes.keyFactors = [
      `${bestProtocol.name} has the highest APY among all ${asset.name} lending options`,
      `Average lending APY across all protocols is ${avgApy}%`,
      `${bestProtocol.name} maintains a ${bestProtocol.risk} risk profile`,
      `Protocol has strong liquidity with ${bestProtocol.pools[0].tvl} TVL`,
    ];
  } else {
    researchNotes.recommendation = `Our analysis of ${protocols.length} borrowing protocols shows ${bestProtocol.name} provides the most favorable terms for borrowing against your ${asset.name}.`;
    researchNotes.keyFactors = [
      `${bestProtocol.name} offers the lowest borrowing costs`,
      `Average borrowing rate across protocols is ${avgApy}%`,
      `Collateral efficiency is optimized for ${asset.name}`,
      `Protocol maintains ${bestProtocol.risk} risk level with good liquidity`,
    ];
  }

  return researchNotes;
};
