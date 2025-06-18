"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== "undefined";

  // Only render PrivyProvider if we have an App ID and we're in the browser
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID || !isBrowser) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        appearance: {
          theme: "dark",
          accentColor: "#3b82f6",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
