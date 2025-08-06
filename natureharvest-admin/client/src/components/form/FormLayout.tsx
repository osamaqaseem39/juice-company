import React, { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface FormLayoutProps {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
  title?: string;
  description?: string;
}

const FormLayout: FC<FormLayoutProps> = ({
  children,
  className = "",
  onSubmit,
  title,
  description,
}) => {
  const FormWrapper = onSubmit ? "form" : "div";
  
  return (
    <div className={twMerge("space-y-6", className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      
      <FormWrapper
        onSubmit={onSubmit}
        className="space-y-6"
      >
        {children}
      </FormWrapper>
    </div>
  );
};

export default FormLayout; 