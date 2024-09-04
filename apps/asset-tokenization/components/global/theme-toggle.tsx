"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface ThemeToggleProps {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

const skeletonSizes = {
  icon: "h-10 w-10",
  default: "h-10 w-16",
  sm: "h-9 w-14",
  lg: "h-11 w-20",
} as const;

export function ThemeToggle({ variant = "outline", size = "icon", className }: ThemeToggleProps) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleSetTheme = useCallback(
    (newTheme: string) => {
      console.log("newTheme", newTheme);
      setTheme(newTheme);
    },
    [setTheme],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    const skeletonSize = skeletonSizes[size as keyof typeof skeletonSizes] || skeletonSizes.icon;
    return <Skeleton className={`${skeletonSize} rounded-md ${className}`} />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className} aria-label="Toggle theme">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {size !== "icon" && <span className="ml-2">{resolvedTheme}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map(({ value, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleSetTheme(value)}
            className={theme === value ? "bg-accent" : ""}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
