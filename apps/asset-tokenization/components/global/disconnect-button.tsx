"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Button, type ButtonProps } from "../ui/button";
import { clearAllCookies } from "./actions/clear-cookies";

interface DisconnectButtonProps extends ButtonProps {}

export function DisconnectButton({ variant = "outline", size = "icon", className }: DisconnectButtonProps) {
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (!isConnected) {
    return null;
  }

  const handleDisconnect = () => {
    startTransition(async () => {
      try {
        disconnect();

        // Clear all cookies using the server action
        await clearAllCookies();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    });
  };

  return (
    <Button variant={variant} size={size} className={className} onClick={handleDisconnect} disabled={isPending}>
      <LogOut className="h-4 w-4" />
    </Button>
  );
}
