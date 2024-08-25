import { ConnectButton } from "../global/connect-button";
import { DarkModeToggle } from "../global/darkmode-toggle";

export function SecureHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 px-4">
      <h1 className="text-xl font-semibold">Asset Tokenization</h1>
      <div className="ml-auto flex items-center gap-2">
        <DarkModeToggle variant="ghost" />
        <ConnectButton />
      </div>
    </header>
  );
}
