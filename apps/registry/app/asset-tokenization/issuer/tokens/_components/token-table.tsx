"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnCell } from "@/components/ui/data-table/data-table-column-cell";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { formatTokenValue } from "@/lib/number";
import { theGraphClient, theGraphGraphql } from "@/lib/settlemint/the-graph";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

const ListAllTokens = theGraphGraphql(`
  query ListAllTokens($orderBy: ERC20Contract_orderBy = name, $orderDirection: OrderDirection = asc, $first: Int = 10, $skip: Int = 0) {
  erc20Contracts(
    orderBy: $orderBy
    orderDirection: $orderDirection
    first: $first
    skip: $skip
  ) {
    id
    name
    symbol
    totalSupply
    decimals
  }
}
`);

export function TokenTable() {
  const tokens = useSuspenseQuery({
    queryKey: ["all-tokens"],
    queryFn: () => {
      return theGraphClient.request(ListAllTokens, {});
    },
  });

  return (
    <DataTable
      columns={[
        {
          accessorKey: "name",
          header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="name" />;
          },
          cell: ({ getValue }) => {
            const value = getValue<string>();
            return <DataTableColumnCell value={value} />;
          },
        },
        {
          accessorKey: "symbol",
          header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Symbol" />;
          },
          cell: ({ getValue }) => {
            const value = getValue<string>();
            return <DataTableColumnCell value={value} />;
          },
        },
        {
          accessorKey: "decimals",
          header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Decimals" type="numeric" />;
          },
          cell: ({ getValue }) => {
            const value = getValue<string>();
            return <DataTableColumnCell value={value} type="numeric" />;
          },
        },
        {
          accessorKey: "totalSupply",
          header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Total Supply" type="numeric" />;
          },
          cell: ({ getValue }) => {
            const value = getValue<string>();
            return (
              <DataTableColumnCell value={formatTokenValue(Number.parseFloat(value.toString()), 2)} type="numeric" />
            );
          },
        },
        {
          id: "actions",
          cell: ({ row }) => {
            const { id } = row.original;

            return (
              <div className="flex items-center space-x-2 px-4 py-2 justify-end">
                <Link prefetch={false} href={`/issuer/tokens/${id}/details`}>
                  <Button variant="outline">
                    <FolderOpen className="w-4 h-4" />
                    Details
                  </Button>
                </Link>
              </div>
            );
          },
        },
      ]}
      data={tokens.data.erc20Contracts ?? []}
      filterColumn="name"
      filterPlaceholder="Search by token name..."
    />
  );
}
