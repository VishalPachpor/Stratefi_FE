import { AssetCard, Asset } from "./asset-card";

interface AssetListProps {
  walletAssets: Asset[];
  selectedAsset: string | null;
  handleAssetSelect: (assetId: string) => void;
  isInView: boolean;
}

export function AssetList({
  walletAssets,
  selectedAsset,
  handleAssetSelect,
  isInView,
}: AssetListProps) {
  return (
    <div>
      <h3 className="text-xl font-medium mb-4 flex items-center">
        <span className="mr-2 rounded-full bg-blue-500/20 p-1">
          {/* Icon if needed */}
        </span>
        Your Assets
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {walletAssets.map((asset, index) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            isSelected={selectedAsset === asset.id}
            onSelect={handleAssetSelect}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}
