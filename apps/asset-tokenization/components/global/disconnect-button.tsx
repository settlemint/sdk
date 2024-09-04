"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { Button, type ButtonProps } from "../ui/button";

interface DisconnectButtonProps {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

export function DisconnectButton({ variant = "outline", size = "icon", className }: DisconnectButtonProps) {
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const router = useRouter();

  if (!isConnected) {
    return <div className={`w-9 h-9 ${className}`} />;
  }

  const handleDisconnect = () => {
    disconnect();
    router.push("/");
  };

  return (
    <Button variant={variant} size={size} className={className} onClick={handleDisconnect}>
      <LogOut className="h-4 w-4" />
    </Button>
  );
}
