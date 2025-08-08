import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FormLayout from "../FormLayout";
import FormField from "../FormField";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import Select from "../Select";
import Checkbox from "../input/Checkbox";
import Radio from "../input/Radio";
import Button from "../../ui/button/Button";

export default function UniformForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
    newsletter: false,
    notifications: "email",
  });

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "product", label: "Product Information" },
    { value: "support", label: "Customer Support" },
    { value: "partnership", label: "Partnership" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ComponentCard
      title="Uniform Form Elements"
      desc="All form elements using Nature Harvest color scheme"
    >
      <FormLayout
        title="Contact Form"
        description="Fill out the form below and we'll get back to you as soon as possible."
        onSubmit={handleSubmit}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            htmlFor="name"
            required
          >
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your full name"
            />
          </FormField>

          <FormField
            label="Email Address"
            htmlFor="email"
            required
          >
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your.email@example.com"
            />
          </FormField>
        </div>

        <FormField
          label="Category"
          htmlFor="category"
          required
        >
          <Select
            options={categories}
            placeholder="Select a category"
            onChange={(value) => handleChange("category", value)}
          />
        </FormField>

        <FormField
          label="Message"
          htmlFor="message"
          required
        >
          <TextArea
            value={formData.message}
            onChange={(value) => handleChange("message", value)}
            rows={4}
            placeholder="Tell us how we can help you..."
          />
        </FormField>

        <FormField
          label="Notification Preferences"
          htmlFor="notifications"
        >
          <div className="space-y-3">
            <Radio
              id="email-notifications"
              name="notifications"
              value="email"
              checked={formData.notifications === "email"}
              onChange={(value) => handleChange("notifications", value)}
              label="Email notifications"
            />
            <Radio
              id="sms-notifications"
              name="notifications"
              value="sms"
              checked={formData.notifications === "sms"}
              onChange={(value) => handleChange("notifications", value)}
              label="SMS notifications"
            />
            <Radio
              id="none-notifications"
              name="notifications"
              value="none"
              checked={formData.notifications === "none"}
              onChange={(value) => handleChange("notifications", value)}
              label="No notifications"
            />
          </div>
        </FormField>

        <FormField>
          <Checkbox
            id="newsletter"
            label="Subscribe to our newsletter for updates and special offers"
            checked={formData.newsletter}
            onChange={(checked) => handleChange("newsletter", checked)}
          />
        </FormField>

        <div className="flex gap-4 pt-4">
          <Button type="submit" variant="primary">
            Send Message
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </FormLayout>
    </ComponentCard>
  );
} 