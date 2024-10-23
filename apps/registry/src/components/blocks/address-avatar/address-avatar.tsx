import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { getGravatarUrl } from "react-awesome-gravatar";
import { http, type Address, createPublicClient } from "viem";
import { mainnet } from "viem/chains";
import { AddressAvatarIndicator } from "./address-avatar-indicator";

const addressAvatarVariants = cva("rounded-md", {
  variants: {
    variant: {
      tiny: "w-4 h-4 rounded-full",
      small: "w-6 h-6 rounded-sm",
      big: "w-10 h-10 rounded-md",
    },
  },
  defaultVariants: {
    variant: "tiny",
  },
});

interface AddressAvatarProps extends HTMLAttributes<HTMLDivElement> {
  address?: string | null;
  email?: string | null;
  indicator?: boolean;
  variant?: "big" | "small" | "tiny";
}

async function getEnsAvatarUrl(address?: string | null) {
  if (address) {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    });

    const ensName = await publicClient.getEnsName({
      address: address as Address,
    });

    if (ensName) {
      return `https://metadata.ens.domains/mainnet/avatar/${ensName}`;
    }
  }

  return undefined;
}

/**
 * AddressAvatar component displays an avatar based on the provided address or email.
 */
export async function AddressAvatar({ address, email, className, indicator, variant, ...props }: AddressAvatarProps) {
  const ensAvatar = await getEnsAvatarUrl(address);
  const gravatarAvatar = getGravatarUrl(email ?? "", {
    default: "identicon",
    size: 400,
  });

  return (
    <div {...props} className={cn(addressAvatarVariants({ variant }), className, "relative")}>
      <Avatar className={cn(addressAvatarVariants({ variant }), className)}>
        <AvatarImage src={ensAvatar ?? gravatarAvatar} alt={email ?? address ?? ""} />
      </Avatar>
      {indicator && <AddressAvatarIndicator variant={variant} />}
    </div>
  );
}
