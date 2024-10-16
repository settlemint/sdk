"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type HTMLAttributes, forwardRef, useState } from "react";
import { getGravatarUrl } from "react-awesome-gravatar";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { http, type Address, createPublicClient } from "viem";
import { mainnet } from "viem/chains";

interface AddressAvatarProps extends HTMLAttributes<HTMLDivElement> {
  address?: string | null;
  email?: string | null;
  badge?: boolean;
  variant?: "big" | "small";
}

/**
 * AddressAvatar component displays an avatar based on the provided address or email.
 * It shows a skeleton loader while the avatar is being fetched and fades in the actual image when loaded.
 */
export const AddressAvatar = forwardRef<HTMLDivElement, AddressAvatarProps>(
  ({ address, email, className, badge, variant = "big", ...props }, ref) => {
    const { data: avatar } = useSuspenseQuery({
      queryKey: ["avatar", email, address],
      queryFn: async () => {
        if (address) {
          const publicClient = createPublicClient({
            chain: mainnet,
            transport: http(),
          });

          const ensName = await publicClient.getEnsName({
            address: address as Address,
          });

          if (ensName) {
            return { ensName, avatar: `https://metadata.ens.domains/mainnet/avatar/${ensName}` };
          }
        }
        if (email) {
          const avatarUrl = getGravatarUrl(email ?? "", {
            default: "identicon",
            size: 400,
          });

          return { avatar: avatarUrl };
        }
        return null;
      },
    });

    const [imageLoaded, setImageLoaded] = useState(false);

    return (
      <div className="relative">
        <Avatar
          ref={ref}
          className={cn("cursor-pointer relative", variant === "big" ? "w-10 h-10" : "w-6 h-6", className)}
          {...props}
        >
          <AvatarFallback>
            {!address && (
              <Skeleton className={cn("rounded-full absolute inset-0", imageLoaded ? "opacity-0" : "opacity-100")} />
            )}
            {address && <Jazzicon diameter={variant === "big" ? 40 : 20} seed={jsNumberForAddress(address)} />}
          </AvatarFallback>
          {avatar?.avatar && (
            <AvatarImage
              src={avatar.avatar}
              className={cn("transition-opacity duration-300", imageLoaded ? "opacity-100" : "opacity-0")}
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </Avatar>
        {badge && (
          <span className="absolute -top-0.5 -right-0.5  flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </span>
        )}
      </div>
    );
  },
);

AddressAvatar.displayName = "AddressAvatar";
