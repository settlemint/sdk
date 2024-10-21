"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnCell } from "@/components/ui/data-table/data-table-column-cell";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { EvmAddress } from "@/components/ui/evm-address/evm-address";
import { EvmAddressBalances } from "@/components/ui/evm-address/evm-address-balances";
import { hasuraClient, hasuraGraphql } from "@/lib/settlemint/hasura";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

const ListAllUsers = hasuraGraphql(`
query ListAllUsers {
  starterkit_wallets(order_by: {email: asc}) {
    email
    role
    wallet
  }
}
`);

export function UsersTable() {
  const tokens = useSuspenseQuery({
    queryKey: ["all-users"],
    queryFn: () => {
      return hasuraClient.request(ListAllUsers, {});
    },
    refetchInterval: 2000,
  });

  return (
    <DataTable
      columns={[
        {
          accessorKey: "email",
          header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Email" />;
          },
          cell: ({ getValue }) => {
            const value = getValue<string>();
            return <DataTableColumnCell value={value} />;
          },
        },
        {
          accessorKey: "role",
          header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Role" />;
          },
          cell: ({ getValue }) => {
            const value = getValue<string>();
            return <DataTableColumnCell value={value} />;
          },
        },
        {
          accessorKey: "wallet",
          header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Address" />;
          },
          cell: ({ getValue }) => {
            const value = getValue<string>();
            return (
              <DataTableColumnCell
                value={
                  value ? (
                    <EvmAddress address={value} prefixLength={100}>
                      <EvmAddressBalances address={value} />
                    </EvmAddress>
                  ) : null
                }
              />
            );
          },
        },
        {
          id: "actions",
          cell: ({ row }) => {
            const { email } = row.original;

            return (
              <div className="flex items-center space-x-2 px-4 py-2 justify-end">
                <Link prefetch={false} href={`/issuer/users/${email}/details`}>
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
      data={tokens.data.starterkit_wallets ?? []}
      filterColumn="email"
      filterPlaceholder="Search by email..."
    />
  );
}
