import React, { FC, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-logo-red text-white hover:bg-red-600 focus:ring-logo-red/20 shadow-lg hover:shadow-xl",
    secondary: "bg-leaf-dark text-white hover:bg-leaf-light focus:ring-leaf-dark/20 shadow-lg hover:shadow-xl",
    outline: "border-2 border-logo-red text-logo-red hover:bg-logo-red hover:text-white focus:ring-logo-red/20",
    ghost: "text-logo-red hover:bg-logo-red/10 focus:ring-logo-red/20",
    danger: "bg-error-500 text-white hover:bg-error-600 focus:ring-error-500/20 shadow-lg hover:shadow-xl",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
