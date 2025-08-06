# Nature Harvest Form System

This directory contains all form components that follow the Nature Harvest brand color scheme and provide a consistent user experience across the admin panel.

## Color Scheme

The form system uses the Nature Harvest logo-inspired color palette:

### Primary Colors
- **Logo Red**: `#ee2123` - Primary brand color for focus states and primary actions
- **Logo Black**: `#000000` - Text color for headings and labels
- **Leaf Dark**: `#007A3D` - Secondary brand color for success states
- **Leaf Light**: `#66BB44` - Light green for secondary actions

### Focus States
- **Input Focus**: `border-logo-red` with `ring-logo-red/10`
- **Success States**: `border-leaf-light` with `text-leaf-dark`
- **Error States**: Standard error colors (`error-500`, `error-600`)

## Components

### Core Form Components

#### `FormField`
Wrapper component that provides consistent spacing, labels, and error/hint text.

```tsx
<FormField
  label="Email Address"
  htmlFor="email"
  required
  error="Please enter a valid email"
  hint="We'll never share your email"
>
  <Input type="email" />
</FormField>
```

#### `FormLayout`
Provides consistent form structure with optional title and description.

```tsx
<FormLayout
  title="Contact Form"
  description="Fill out the form below"
  onSubmit={handleSubmit}
>
  {/* Form fields */}
</FormLayout>
```

### Input Components

#### `Input`
Standard text input with Nature Harvest styling.

**Props:**
- `type`: Input type (text, email, password, etc.)
- `error`: Boolean for error state
- `success`: Boolean for success state
- `disabled`: Boolean for disabled state
- `hint`: Optional hint text

#### `TextArea`
Multi-line text input with consistent styling.

#### `Select`
Dropdown select with Nature Harvest focus states.

#### `Checkbox`
Styled checkbox with logo-red accent color.

#### `Radio`
Radio button with logo-red accent color.

#### `FileInput`
File upload input with consistent styling.

#### `PhoneInput`
Phone number input with country code selector.

### Button Component

#### `Button`
Uniform button component with multiple variants:

```tsx
<Button variant="primary" size="md">
  Submit
</Button>

<Button variant="outline" size="sm">
  Cancel
</Button>
```

**Variants:**
- `primary`: Logo red background
- `secondary`: Leaf dark background
- `outline`: Logo red border with transparent background
- `ghost`: Transparent with logo red text
- `danger`: Error red background

**Sizes:**
- `sm`: Small padding
- `md`: Medium padding (default)
- `lg`: Large padding

## Usage Examples

### Basic Form
```tsx
import FormLayout from './FormLayout';
import FormField from './FormField';
import Input from './input/InputField';
import Button from '../ui/button/Button';

function ContactForm() {
  return (
    <FormLayout
      title="Contact Us"
      description="Get in touch with our team"
      onSubmit={handleSubmit}
    >
      <FormField label="Name" required>
        <Input type="text" placeholder="Your name" />
      </FormField>
      
      <FormField label="Email" required>
        <Input type="email" placeholder="your@email.com" />
      </FormField>
      
      <div className="flex gap-4">
        <Button type="submit" variant="primary">
          Send Message
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </FormLayout>
  );
}
```

### Form with Validation
```tsx
<FormField
  label="Email"
  required
  error={emailError}
>
  <Input
    type="email"
    value={email}
    onChange={handleEmailChange}
    error={!!emailError}
  />
</FormField>
```

## Styling Guidelines

### Focus States
All form inputs use the logo-red color for focus states:
- Border: `border-logo-red`
- Ring: `ring-logo-red/10`

### Success States
Use leaf colors for success states:
- Border: `border-leaf-light`
- Text: `text-leaf-dark`

### Error States
Use standard error colors:
- Border: `border-error-500`
- Text: `text-error-500`
- Ring: `ring-error-500/10`

### Spacing
- Form fields: `space-y-6`
- Field groups: `space-y-2`
- Button groups: `gap-4`

## Accessibility

All form components include:
- Proper `htmlFor` attributes linking labels to inputs
- Required field indicators with red asterisk
- Error and hint text for screen readers
- Focus management and keyboard navigation
- ARIA attributes where needed

## Dark Mode Support

All components include dark mode variants:
- Background colors adapt to dark theme
- Text colors maintain proper contrast
- Border colors adjust for dark backgrounds
- Focus states remain visible in dark mode