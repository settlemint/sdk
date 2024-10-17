import { AddressAvatar } from "@/components/ui/address-avatar/address-avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { shortHex } from "@/lib/hex";
import { formatTokenValue } from "@/lib/number";
import Link from "next/link";

/**
 * Represents a balance of a token.
 */
export type Balance = {
  /** The value of the balance. */
  value: string;
  /** The name of the token. */
  name: string | null;
  /** The symbol of the token. */
  symbol: string | null;
};

/**
 * Renders an EVM address with a hover card displaying additional information.
 * @param props - The component props.
 * @param props.address - The EVM address to display.
 * @param props.explorerUrl - The URL of the blockchain explorer (optional).
 * @param props.balances - An array of token balances associated with the address.
 * @returns The rendered EvmAddress component.
 */
export function EvmAddress({
  address,
  balances,
  explorerUrl,
}: { address: string; explorerUrl?: string; balances: Balance[] }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex items-center space-x-2">
          <AddressAvatar address={address} variant="small" />
          <span>{shortHex(address)}</span>
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
        <div className="mt-2">
          <BalanceDisplay balances={balances} />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

/**
 * Renders a display of token balances.
 * @param props - The component props.
 * @param props.balances - An array of token balances to display.
 * @returns The rendered BalanceDisplay component.
 */
function BalanceDisplay({
  balances,
}: {
  balances: Balance[];
}) {
  return (
    <dl className="text-sm">
      {balances.map((balance) => (
        <div key={balance.symbol} className="flex items-center justify-between">
          <dt className="text-muted-foreground">{balance.name}:</dt>
          <dd>
            {formatTokenValue(Number.parseFloat(balance.value), 2)} {balance.symbol}
          </dd>
        </div>
      ))}
    </dl>
  );
}
