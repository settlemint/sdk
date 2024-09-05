"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/lib/i18n";
import { availableLanguageTags, languageTag } from "@/paraglide/runtime";
import { getEmoji, getNativeName } from "language-flag-colors";

interface LanguageToggleProps {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

export function LanguageToggle({ variant = "outline", size = "icon", className }: LanguageToggleProps) {
  const pathname = usePathname();
  const currentLanguage = languageTag();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className} aria-label="Toggle language">
          <span className="text-lg" aria-hidden="true">
            {getEmoji(currentLanguage)}
          </span>
          {size !== "icon" && <span className="ml-2">{getNativeName(currentLanguage)}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguageTags.map((lang) => (
          <DropdownMenuItem key={lang}>
            <Link href={pathname} locale={lang} hrefLang={lang} className="flex items-center">
              <span className="mr-2 text-lg" aria-hidden="true">
                {getEmoji(lang)}
              </span>
              {getNativeName(lang)}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
