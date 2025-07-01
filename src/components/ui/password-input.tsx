import ICONS from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { forwardRef, useState } from "react";

const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, value, disabled, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isDisabled = value === "" || value === undefined || disabled;

  return (
    <div className="relative">
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={cn("hide-password-toggle pr-10", className)}
        value={value}
        disabled={disabled}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={isDisabled}
      >
        <Image
          src={
            showPassword && !isDisabled
              ? ICONS.showPassword
              : ICONS.hidePassword
          }
          alt={showPassword ? "hide password" : "show password"}
          width={18}
          height={18}
        />
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>

      {/* hides browser's native password toggle */}
      <style>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
export { PasswordInput };
