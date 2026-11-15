import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#E30016] text-white hover:bg-[#C40013] shadow-md shadow-red-900/10 transition-all font-bold",
        destructive: "bg-[#C40013] text-white hover:bg-[#A80010]",
        outline: "border border-[#E2E4E6] bg-white text-[#6E6F71] hover:bg-[#F4F5F7] hover:border-[#9C9D9F] hover:text-[#E30016] transition-all font-bold",
        secondary: "bg-[#F4F5F7] text-[#6E6F71] hover:bg-[#E5E7EB] hover:text-[#E30016] border border-[#E2E4E6] font-bold",
        ghost: "hover:bg-[#F4F5F7] hover:text-[#E30016]",
        link: "text-[#E30016] underline-offset-4 hover:underline",
        accent: "bg-[#E30016] text-white font-bold shadow-md shadow-red-900/15 hover:bg-[#C40013] transition-all",
        cta: "text-lg bg-[#E30016] text-white font-extrabold shadow-lg shadow-red-900/20 hover:bg-[#C40013] transition-all",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 px-8 py-3",
        icon: "h-10 w-10",
        xl: "h-14 px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
