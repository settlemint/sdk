import { Logo } from "@/components/blocks/logo/logo";

export default function LogoPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Logo</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Logo />
        <Logo variant="vertical" />
        <Logo variant="icon" />
      </div>
    </>
  );
}
