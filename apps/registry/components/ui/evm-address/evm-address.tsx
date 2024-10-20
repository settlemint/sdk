import { AddressAvatar } from "@/components/ui/address-avatar/address-avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { shortHex } from "@/lib/hex";
import Link from "next/link";
import type { PropsWithChildren } from "react";

interface EvmAddressProps extends PropsWithChildren {
  /** The EVM address to display. */
  address: string;
  /** The URL of the blockchain explorer (optional). */
  explorerUrl?: string;
  prefixLength?: number;
  suffixLength?: number;
}

/**
 * Renders an EVM address with a hover card displaying additional information.
 * @param props - The component props.
 * @returns The rendered EvmAddress component.
 */
export function EvmAddress({ address, explorerUrl, children, prefixLength = 6, suffixLength = 4 }: EvmAddressProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex items-center space-x-2">
          <AddressAvatar address={address} variant="tiny" />
          <span>{shortHex(address, prefixLength, suffixLength)}</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex items-start">
          <h4 className="text-sm font-semibold grid grid-cols-[auto,1fr] gap-x-2 items-start">
            <AddressAvatar address={address} className="row-span-2" />
            <div className="flex flex-col">
              <span>{shortHex(address, 12, 8)}</span>
              {explorerUrl && (
                <Link
                  prefetch={false}
                  href={`${explorerUrl}/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate text-primary text-xs"
                >
                  View on the explorer
                </Link>
              )}
            </div>
          </h4>
        </div>
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}
