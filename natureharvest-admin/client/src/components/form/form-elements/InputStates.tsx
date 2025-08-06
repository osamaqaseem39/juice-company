import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FormField from "../FormField";
import Input from "../input/InputField";

export default function InputStates() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  // Simulate a validation check
  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };
  
  return (
    <ComponentCard
      title="Input States"
      desc="Validation styles for error, success and disabled states on form controls."
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Error Input */}
        <FormField
          label="Email"
          error={error ? "This is an invalid email address." : ""}
        >
          <Input
            type="email"
            value={email}
            error={error}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </FormField>

        {/* Success Input */}
        <FormField
          label="Email"
          hint={!error ? "Valid email!" : ""}
        >
          <Input
            type="email"
            value={email}
            success={!error}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </FormField>

        {/* Disabled Input */}
        <FormField
          label="Email"
          hint="This field is disabled."
        >
          <Input
            type="text"
            value="disabled@example.com"
            disabled={true}
            placeholder="Disabled email"
          />
        </FormField>
      </div>
    </ComponentCard>
  );
}
