import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Auth() {
  return (
    <Card className="w-full max-w-sm bg-accent border-accent">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Connect your wallet</CardTitle>
        <CardDescription className="text-center">
          A wallet serves as your digital identity and secure storage for blockchain based assets. Connect your existing
          browser extension or mobile wallet easily. No wallet? No worries - use social login or create an email wallet
          for a quick and secure start.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <ConnectButton />
      </CardFooter>
    </Card>
  );
}
