import React from 'react';

// Shared form field components
export interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'file' | 'textarea' | 'select';
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  accept?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  type = 'text',
  options = [],
  rows = 3,
  accept,
  disabled = false,
  error,
  className = ''
}) => {
  const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-logo-red transition-colors";
  const errorClasses = error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-logo-red";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
          />
        );

      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'file':
        return (
          <input
            type="file"
            name={name}
            onChange={onChange}
            required={required}
            accept={accept}
            disabled={disabled}
            className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
          />
        );

      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Image upload component with preview
export interface ImageUploadProps {
  label: string;
  value: string | File | null;
  onChange: (file: File | null) => void;
  onUpload: (file: File) => Promise<string>;
  required?: boolean;
  disabled?: boolean;
  uploading?: boolean;
  uploadProgress?: number;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  onUpload,
  required = false,
  disabled = false,
  uploading = false,
  uploadProgress = 0,
  className = ''
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await onUpload(file);
        onChange(null); // Clear the file input
        // The parent component should handle the URL update
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-logo-red/10 file:text-logo-red hover:file:bg-logo-red/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {uploading && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-logo-red h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
          </p>
        </div>
      )}

      {value && (
        <div className="relative inline-block">
          <img
            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
            alt="Preview"
            className="h-32 w-32 object-cover rounded border"
          />
          <button
            type="button"
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
            onClick={() => onChange(null)}
            title="Remove image"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

// Form actions component
export interface FormActionsProps {
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  onCancel: () => void;
  submitText: string;
  cancelText?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSubmit,
  onCancel,
  submitText,
  cancelText = 'Cancel',
  loading = false,
  disabled = false
}) => {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        onClick={(e) => onSubmit(e)}
        disabled={disabled || loading}
        className="px-6 py-2 bg-logo-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Saving...' : submitText}
      </button>
    </div>
  );
};

// Loading spinner component
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
          <div className="flex justify-center items-center">
        <div className={`animate-spin rounded-full border-b-2 border-logo-red ${sizeClasses[size]}`} />
      </div>
  );
};

// Error message component
export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
      {message}
    </div>
  );
};

// Success message component
export const SuccessMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
      {message}
    </div>
  );
}; 