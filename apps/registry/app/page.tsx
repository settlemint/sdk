import CollapsedBreadcrumb from "@/components/ui/collapsed-breadcrumb/collapsed-breadcrumb";
import { ThemeToggle } from "@/components/ui/dark-mode/theme-toggle";

export default function Home() {
  return (
    <div className="w-full max-w-3xl px-4 mx-auto mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SettleMint Starterkit Template Registry</h1>
        <ThemeToggle />
      </div>
      <div>
        <div className="mt-8 mb-8 border border-gray-200 rounded-md p-4">
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
            <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
              <code className="text-xs">
                bunx shadcn@latest add https://console.settlemint.com/registry/collapsed-breadcrumb.json
              </code>
            </pre>
          </div>
        </div>
        <div className="mt-8 mb-8 border border-gray-200 rounded-md p-4">
          <h2 className="text-lg font-bold">Theme toggle</h2>
          <p className="text-sm text-muted-foreground mb-2">Wrap your topmost layout in a ThemeProvider</p>
          <div className="mt-8 mb-8">
            <ThemeToggle />
          </div>
          <div className="mt-8 mb-8">
            <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
              <code className="text-xs">
                bunx shadcn@latest add https://console.settlemint.com/registry/dark-mode.json
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
