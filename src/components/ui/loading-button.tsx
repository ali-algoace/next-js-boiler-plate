import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

import type { VariantProps } from "class-variance-authority";

export interface LoadingButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  loading?: boolean;
  asChild?: boolean;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    { loading, children, className, variant, size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={!!loading || props.disabled}
        {...props}
      >
        {loading && <LoaderCircle className="animate-spin mr-2" />}
        {children}
      </Comp>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
