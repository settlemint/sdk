"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnCell } from "@/components/ui/data-table/data-table-column-cell";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { EvmAddress } from "@/components/ui/evm-address/evm-address";
import { EvmAddressBalances } from "@/components/ui/evm-address/evm-address-balances";
import { formatTokenValue } from "@/lib/number";
import { useTokenDetails } from "../../_queries/token-details";

export function BalancesTable({ address }: { address: string }) {
  const { data } = useTokenDetails(address);

  const balances = data?.erc20Contract?.balances ?? [];
  const totalSupply = data?.erc20Contract?.totalSupply ?? "0";

  return (
    <DataTable
      columns={[
        {
          accessorKey: "account.id",
          id: "address",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Holder Address" />,
          cell: ({ row }) => {
            const value = row.original.account?.id;
            return (
              <DataTableColumnCell
                value={
                  value ? (
                    <EvmAddress address={value}>
                      <EvmAddressBalances address={value} />
                    </EvmAddress>
                  ) : null
                }
              />
            );
          },
        },
        {
          accessorKey: "lastTransaction",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Last Transaction" />,
          cell: ({ row }) => {
            const transfersFrom = row.original.account?.ERC20transferFromEvent;
            const firstTransfer = (transfersFrom ?? []).sort((a, b) => Number(b.timestamp) - Number(a.timestamp))[0];

            if (!firstTransfer) {
              return <DataTableColumnCell value="N/A" />;
            }

            const date = new Date(Number(firstTransfer.timestamp) * 1000);
            return <DataTableColumnCell value={date.toLocaleString()} />;
          },
        },
        {
          accessorKey: "value",
          header: ({ column }) => <DataTableColumnHeader type="numeric" column={column} title="Balance" />,
          cell: ({ row }) => {
            const value = row.original.value;
            return <DataTableColumnCell type="numeric" value={formatTokenValue(Number.parseFloat(value), 2)} />;
          },
        },
        {
          accessorKey: "percentage",
          header: ({ column }) => <DataTableColumnHeader type="numeric" column={column} title="% of Total Supply" />,
          cell: ({ row }) => {
            const value = row.original.value;
            const percentage =
              totalSupply !== "0" ? (Number.parseFloat(value) / Number.parseFloat(totalSupply)) * 100 : 0;
            return <DataTableColumnCell type="numeric" value={`${percentage.toFixed(2)}%`} />;
          },
        },
        {
          accessorKey: "account.ERC20transferToEvent",
          header: ({ column }) => (
            <DataTableColumnHeader type="numeric" column={column} title="Number of transactions received" />
          ),
          cell: ({ row }) => {
            const transfersTo = row.original.account?.ERC20transferToEvent;
            return (
              <DataTableColumnCell
                type="numeric"
                value={Array.isArray(transfersTo) ? transfersTo.length.toString() : "0"}
              />
            );
          },
        },
        {
          accessorKey: "account.ERC20transferFromEvent",
          header: ({ column }) => (
            <DataTableColumnHeader type="numeric" column={column} title="Number of transactions sent" />
          ),
          cell: ({ row }) => {
            const transfersFrom = row.original.account?.ERC20transferFromEvent;
            return (
              <DataTableColumnCell
                type="numeric"
                value={Array.isArray(transfersFrom) ? transfersFrom.length.toString() : "0"}
              />
            );
          },
        },
      ]}
      data={balances}
      filterColumn="address"
      filterPlaceholder="Search by address..."
    />
  );
}
