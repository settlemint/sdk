import { AddressAvatar } from "@/components/ui/address-avatar/address-avatar";
import CollapsedBreadcrumb from "@/components/ui/collapsed-breadcrumb/collapsed-breadcrumb";
import { ThemeToggle } from "@/components/ui/dark-mode/theme-toggle";
import { DataTable } from "@/components/ui/data-table/data-table";

export default function Home() {
  return (
    <div className="w-full max-w-3xl px-4 mx-auto mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SettleMint Starterkit Template Registry</h1>
        <ThemeToggle />
      </div>
      <div>
        <div className="mt-8 mb-8 border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <h2 className="text-lg font-bold">All components</h2>
          <div className="mt-8 mb-8">
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
              <code className="text-xs text-gray-800 dark:text-gray-200">
                bunx shadcn@latest add https://console.settlemint.com/registry/all.json
              </code>
            </pre>
          </div>
        </div>
        <div className="mt-8 mb-8 border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <h2 className="text-lg font-bold">Query Client Provider</h2>
          <div className="mt-8 mb-8">
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
              <code className="text-xs text-gray-800 dark:text-gray-200">
                bunx shadcn@latest add https://console.settlemint.com/registry/query-client.json
              </code>
            </pre>
          </div>
        </div>
        <div className="mt-8 mb-8 border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <h2 className="text-lg font-bold">Collapsed Breadcrumb</h2>
          <div className="mt-8 mb-8">
            <CollapsedBreadcrumb
              maxVisibleItems={3}
              items={[
                { label: "Home", href: "/" },
                { label: "Some label", href: "/some-path" },
                { label: "Some other label", href: "/some-other-path" },
                { label: "Some other label 2", href: "/some-other-path2" },
                { label: "Some other label 3", href: "/some-other-path3" },
                { label: "Some other label 4", href: "/some-other-path4" },
                { label: "Some other label 5", href: "/some-other-path5" },
                { label: "Some other label 6", href: "/some-other-path6" },
                { label: "Some other label 7", href: "/some-other-path7" },
                { label: "Some other label 8", href: "/some-other-path8" },
              ]}
            />
          </div>
          <div className="mt-8 mb-8">
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
              <code className="text-xs text-gray-800 dark:text-gray-200">
                bunx shadcn@latest add https://console.settlemint.com/registry/collapsed-breadcrumb.json
              </code>
            </pre>
          </div>
        </div>
        <div className="mt-8 mb-8 border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <h2 className="text-lg font-bold">Theme toggle</h2>
          <p className="text-sm text-muted-foreground mb-2">Wrap your topmost layout in a ThemeProvider</p>
          <div className="mt-8 mb-8">
            <ThemeToggle />
          </div>
          <div className="mt-8 mb-8">
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
              <code className="text-xs text-gray-800 dark:text-gray-200">
                bunx shadcn@latest add https://console.settlemint.com/registry/dark-mode.json
              </code>
            </pre>
          </div>
        </div>
        <div className="mt-8 mb-8 border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <h2 className="text-lg font-bold">Address avatar</h2>
          <div className="mt-8 mb-8 flex flex-wrap gap-4">
            <AddressAvatar address="0x0d1d4e623d10f9fba5db95830f7d449b28135b2e" />
            <AddressAvatar address="0x0d1d4e623d10f9fba5db95830f7d449b28135b2e" variant="small" />
            <AddressAvatar address="0x0d1d4e623d10f9fba5db95830f7d449b28135b2e" badge />
            <AddressAvatar email="test@example.com" />
          </div>
          <div className="mt-8 mb-8">
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
              <code className="text-xs text-gray-800 dark:text-gray-200">
                bunx shadcn@latest add https://console.settlemint.com/registry/address-avatar.json
              </code>
            </pre>
          </div>
        </div>
        <div className="mt-8 mb-8 border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <h2 className="text-lg font-bold">Data table</h2>
          <div className="mt-8 mb-8 flex flex-wrap gap-4">
            <DataTable
              columns={[
                {
                  accessorKey: "name",
                  header: "Name",
                },
                {
                  accessorKey: "email",
                  header: "Email",
                },
              ]}
              data={[
                {
                  name: "John Doe",
                  email: "john.doe@example.com",
                },
                {
                  name: "Jane Doe",
                  email: "jane.doe@example.com",
                },
              ]}
              filterPlaceholder="Search"
              filterColumn="name"
            />
          </div>
          <div className="mt-8 mb-8">
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
              <code className="text-xs text-gray-800 dark:text-gray-200">
                bunx shadcn@latest add https://console.settlemint.com/registry/data-table.json
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
