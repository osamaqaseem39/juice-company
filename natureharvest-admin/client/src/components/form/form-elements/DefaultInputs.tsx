import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FormField from "../FormField";
import Input from "../input/InputField";
import Select from "../Select";
import { CalenderIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <ComponentCard title="Default Inputs">
      <div className="space-y-6">
        <FormField label="Input">
          <Input type="text" />
        </FormField>
        
        <FormField label="Input with Placeholder">
          <Input type="text" placeholder="info@gmail.com" />
        </FormField>
        
        <FormField label="Select Input">
          <Select
            options={options}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </FormField>
        
        <FormField label="Password Input">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </FormField>
      </div>
    </ComponentCard>
  );
}
