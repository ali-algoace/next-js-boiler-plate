"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/app/i18n/settings";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/store/language-store";
import { Globe } from "lucide-react";
import React from "react";

interface LanguageDropdownProps {
  type?: "label" | "icon" | "iconText";
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  type = "label",
}) => {
  const { setLanguage, language } = useLanguageStore((state) => state);

  const handleLanguageChange = async (lang: string) => {
    setLanguage(lang);
  };

  const selectedLang = languages.find((lang) => lang.code === language);

  return (
    <Select
      onValueChange={(value: string) => handleLanguageChange(value)}
      value={language}
    >
      <SelectTrigger
        hideIcon={type === "icon" || type === "iconText"}
        className={cn(
          "border-none focus:ring-0 bg-red-600 shadow-none [&>span]:flex [&>span]:gap-2 [&>span]:items-center text-muted dark:text-[#CBCBCB]",
          type === "icon" || type === "iconText" ? "w-auto" : "w-[160px]"
        )}
      >
        {type === "icon" ? (
          <Globe size={20} />
        ) : type === "label" ? (
          <SelectValue>
            <span className="flex gap-2 items-center">
              {selectedLang && selectedLang.icon}{" "}
              {type === "label" && selectedLang?.label}
            </span>
          </SelectValue>
        ) : (
          <SelectValue className="flex gap-2 items-center">
            <Globe size={20} />
            <span className="underline underline-offset-4">
              {selectedLang?.label}
            </span>
          </SelectValue>
        )}
      </SelectTrigger>
      <SelectContent className="z-[9999999]">
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="[&>span]:flex [&>span]:gap-2 [&>span]:items-center"
          >
            {`${lang.icon} ${lang.label}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageDropdown;
