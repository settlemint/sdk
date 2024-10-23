import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const addressAvatarIndicatorVariants = cva("", {
  variants: {
    variant: {
      tiny: "h-2 w-2",
      small: "h-2 w-2",
      big: "h-3 w-3",
    },
  },
  defaultVariants: {
    variant: "tiny",
  },
});

export function AddressAvatarIndicator({ variant }: { variant?: "big" | "small" | "tiny" }) {
  return (
    <span className={cn(addressAvatarIndicatorVariants({ variant }), "absolute -top-0.5 -right-0.5 flex")}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      <span
        className={cn(addressAvatarIndicatorVariants({ variant }), "relative inline-flex rounded-full bg-primary")}
      />
    </span>
  );
}
