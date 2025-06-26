import { Asset, Protocol } from "../asset-card";

/**
 * Builds the Stratefi app URL with asset and pool parameters
 * @param asset - The selected asset data
 * @param protocol - The selected protocol data
 * @param action - The action type (borrow/lend)
 * @returns The complete URL for the Stratefi app
 */
export function buildStratefiUrl(
  asset: Asset,
  protocol: Protocol,
  action: "borrow" | "lend"
): string {
  const token = asset.symbol.toLowerCase();
  const pool = protocol.pools[0]?.id || protocol.id;

  // Base URL for the Stratefi app
  const baseUrl = "https://agent.xyz/asset";

  // Build query parameters
  const params = new URLSearchParams({
    token,
    pool,
    action, // Include the action type for context
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Redirects to the Stratefi app with the given parameters
 * @param asset - The selected asset data
 * @param protocol - The selected protocol data
 * @param action - The action type (borrow/lend)
 * @param openInNewTab - Whether to open in a new tab (default: false)
 */
export function redirectToStratefi(
  asset: Asset,
  protocol: Protocol,
  action: "borrow" | "lend",
  openInNewTab: boolean = false
): void {
  const url = buildStratefiUrl(asset, protocol, action);
  
  // Log the redirect for debugging
  console.log(`Redirecting to Stratefi app:`, {
    url,
    asset: asset.symbol,
    protocol: protocol.name,
    action,
    openInNewTab
  });
  
  if (openInNewTab) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = url;
  }
}

/**
 * Gets a human-readable description of the URL being generated
 * @param asset - The selected asset data
 * @param protocol - The selected protocol data
 * @param action - The action type (borrow/lend)
 * @returns A description string
 */
export function getUrlDescription(
  asset: Asset,
  protocol: Protocol,
  action: "borrow" | "lend"
): string {
  return `Redirecting to ${protocol.name} for ${action}ing ${asset.name} (${asset.symbol})`;
}
