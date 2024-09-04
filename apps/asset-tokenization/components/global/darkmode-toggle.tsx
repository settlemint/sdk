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
import { useCallback } from "react";

interface DarkModeToggleProps {
  variant?: ButtonProps["variant"];
  className?: string;
}

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

export function DarkModeToggle({ variant = "outline", className }: DarkModeToggleProps) {
  const { setTheme, theme } = useTheme();

  const handleSetTheme = useCallback(
    (newTheme: string) => {
      console.log("newTheme", newTheme);
      setTheme(newTheme);
    },
    [setTheme],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="icon" className={className} aria-label="Toggle theme">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
