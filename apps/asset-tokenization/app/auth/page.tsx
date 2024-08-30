import { ConnectButton } from "@/components/global/connect-button";
import { Logo } from "@/components/public/logo";

export default function Auth() {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 h-full">
        <div className="mx-auto grid w-[350px] lg:w-[500px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Connect your wallet</h1>
            <p className="text-balance text-muted-foreground">
              A wallet serves as your digital identity and secure storage for blockchain based assets. Connect your
              existing browser extension or mobile wallet easily. No wallet? No worries - use social login or create an
              email wallet for a quick and secure start.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="h-[40px] flex justify-center">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block h-full bg-cover bg-center">
        <div className="flex flex-col items-center justify-center h-full">
          <Logo variant="vertical" className="w-1/2" />
          <div className="text-xl font-bold">Asset Tokenization Starter Kit</div>
        </div>
      </div>
    </div>
  );
}
