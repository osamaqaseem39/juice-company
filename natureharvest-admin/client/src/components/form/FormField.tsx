import React, { FC, ReactNode } from "react";
import Label from "./Label";

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

const FormField: FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  children,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="text-logo-red ml-1">*</span>}
        </Label>
      )}
      
      {children}
      
      {(error || hint) && (
        <p
          className={`text-sm ${
            error
              ? "text-error-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
};

export default FormField; 