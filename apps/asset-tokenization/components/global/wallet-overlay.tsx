"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function WalletOverlay() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false);

  useEffect(() => {
    if (!isConnected && !hasAttemptedConnection && openConnectModal) {
      const timer = setTimeout(() => {
        openConnectModal();
        setHasAttemptedConnection(true);
      }, 1000); // 1 second delay

      return () => clearTimeout(timer);
    }
  }, [isConnected, hasAttemptedConnection, openConnectModal]);

  // Reset the connection attempt flag when the user disconnects
  useEffect(() => {
    if (!isConnected) {
      setHasAttemptedConnection(false);
    }
  }, [isConnected]);

  return null;
}
