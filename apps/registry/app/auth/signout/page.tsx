import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import Link from "next/link";

export default function SignOut() {
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign out</h1>
        <p className="text-balance text-muted-foreground">Are you sure you want to sign out?</p>
      </div>
      <div className="grid gap-4">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit" className="w-full">
            Sign out
          </Button>
        </form>
      </div>
      <div className="mt-4 text-center text-sm">
        Made a mistake?{" "}
        <Link href="/" className="underline">
          Go back home
        </Link>
      </div>
    </>
  );
}
