"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { settlemint } from "@/lib/settlemint";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount, useChainId, useSwitchChain, useWalletClient } from "wagmi";
import { DisconnectButton } from "./disconnect-button";

export function WalletOverlay() {
  const { isConnected, isConnecting } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [showUnsupportedChainModal, setShowUnsupportedChainModal] = useState(false);
  const { data: walletClient } = useWalletClient();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const chains = settlemint.node.wagmi.chains;
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  useEffect(() => {
    if (!isConnected && !isDisconnecting && !isConnecting && openConnectModal) {
      console.log("Opening connect modal", isDisconnecting);
      openConnectModal();
    }
  }, [isConnected, isConnecting, openConnectModal, isDisconnecting]);

  useEffect(() => {
    if (isConnected && chainId !== undefined) {
      const isConnectedToSupportedChain = chains.some((chain) => chain.id === chainId);
      setShowUnsupportedChainModal(!isConnectedToSupportedChain && !isDisconnecting);
    } else {
      setShowUnsupportedChainModal(false);
    }
  }, [isConnected, chainId, chains, isDisconnecting]);

  const addChainToWallet = async (chain: (typeof chains)[number]) => {
    if (!walletClient) {
      console.error("Wallet client not available");
      return;
    }

    try {
      // Add the chain
      await walletClient.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${chain.id.toString(16)}`,
            chainName: chain.name,
            nativeCurrency: {
              name: chain.nativeCurrency.name,
              symbol: chain.nativeCurrency.symbol,
              decimals: chain.nativeCurrency.decimals,
            },
            rpcUrls: [chain.rpcUrls.default.http[0]],
            blockExplorerUrls: [chain.blockExplorers?.default.url || "https://etherscan.io"],
            iconUrls: [`${process.env.SETTLEMINT_APP_URL}/apple-icon.png`],
          },
        ],
      });
    } catch (error) {
      console.error(`Failed to add ${chain.name} or switch to it:`, error);
    }
  };

  return (
    <AlertDialog open={showUnsupportedChainModal}>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <TriangleAlert className="w-4 h-4 mr-2" />
              <span>Unsupported Chain</span>
            </div>
            <DisconnectButton variant="ghost" />
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              Your connected wallet is not configured to connect to one of the required networks (
              {chains.map((chain) => chain.name).join(", ")}). Please add one of the following networks to your wallet:
            </p>
            <dl className="space-y-4">
              {chains.map((chain) => (
                <div key={chain.id} className="bg-secondary p-4 rounded-lg">
                  <dt className="font-semibold text-lg mb-2">{chain.name}</dt>
                  <dd className="text-sm grid grid-cols-2 gap-2">
                    <span>Chain ID:</span>
                    <span className="font-medium">{chain.id}</span>
                    <span>Symbol:</span>
                    <span className="font-medium">{chain.nativeCurrency.symbol}</span>
                    <span>RPC:</span>
                    <span className="font-medium break-all">{chain.rpcUrls.default.http[0]}</span>
                  </dd>
                  <div className="mt-4">
                    <Button onClick={() => addChainToWallet(chain)} className="mt-2">
                      Add to Wallet
                    </Button>
                    <Button onClick={() => switchChain({ chainId: chain.id })} className="mt-2 ml-2">
                      Switch to {chain.name}
                    </Button>
                  </div>
                </div>
              ))}
            </dl>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
