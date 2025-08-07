// Form validation utilities
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | undefined;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateField = (value: any, rules: ValidationRule): string | undefined => {
  if (rules.required && (!value || value.toString().trim() === '')) {
    return 'This field is required';
  }

  if (value && rules.minLength && value.toString().length < rules.minLength) {
    return `Minimum length is ${rules.minLength} characters`;
  }

  if (value && rules.maxLength && value.toString().length > rules.maxLength) {
    return `Maximum length is ${rules.maxLength} characters`;
  }

  if (value && rules.pattern && !rules.pattern.test(value.toString())) {
    return 'Invalid format';
  }

  if (value && rules.custom) {
    return rules.custom(value);
  }

  return undefined;
};

export const validateForm = (data: any, validationRules: Record<string, ValidationRule>): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(validationRules).forEach(field => {
    const error = validateField(data[field], validationRules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Image upload utilities
export const uploadImage = async (file: File, type: string = 'general'): Promise<string> => {
  const formData = new FormData();
  const ext = file.name.split('.').pop();
  const uniqueName = `${Date.now()}-${type}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  formData.append('file', file, uniqueName);

  // Use external upload server
  const response = await fetch('https://natureharvest.osamaqaseem.online/upload.php', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (data.url) {
    return data.url;
  } else {
    throw new Error(data.error || 'Upload failed');
  }
};

export const uploadImageWithProgress = (
  file: File, 
  type: string = 'general',
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const ext = file.name.split('.').pop();
    const uniqueName = `${Date.now()}-${type}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    formData.append('file', file, uniqueName);

    const xhr = new XMLHttpRequest();
    // Use external upload server
    xhr.open('POST', 'https://natureharvest.osamaqaseem.online/upload.php');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (data.url) {
          resolve(data.url);
        } else {
          reject(new Error(data.error || 'Upload failed'));
        }
      } else {
        reject(new Error('Upload failed'));
      }
    };

    xhr.onerror = () => reject(new Error('Upload failed'));
    xhr.send(formData);
  });
};

// Text formatting utilities (for rich text editing)
export const formatText = (text: string): string => {
  text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<em>$1</em>');
  text = text.replace(/^- (.+)$/gm, '<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
  text = text.replace(/^\d+\. (.+)$/gm, '<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g, '<ol>$1</ol>');
  text = text.replace(/`(.+?)`/g, '<code>$1</code>');
  text = text.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  text = text.replace(/^---$/gm, '<hr>');
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  text = text.replace(/!img\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');
  text = text.replace(/<center>(.+?)<\/center>/g, '<div style="text-align: center">$1</div>');
  text = text.replace(/<right>(.+?)<\/right>/g, '<div style="text-align: right">$1</div>');
  text = text.replace(/<left>(.+?)<\/left>/g, '<div style="text-align: left">$1</div>');
  text = text.replace(/\n/g, '<br>');
  return text;
};

export const insertFormatting = (
  textarea: HTMLTextAreaElement,
  format: string,
  onUpdate: (newValue: string) => void
): void => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  let replacement = '';

  switch (format) {
    case 'bold':
      replacement = `**${selectedText}**`;
      break;
    case 'italic':
      replacement = `__${selectedText}__`;
      break;
    case 'code':
      replacement = `\`${selectedText}\``;
      break;
    case 'link':
      replacement = `[${selectedText}](url)`;
      break;
    case 'image':
      replacement = `!img[${selectedText}](image-url)`;
      break;
    case 'h1':
      replacement = `# ${selectedText}`;
      break;
    case 'h2':
      replacement = `## ${selectedText}`;
      break;
    case 'h3':
      replacement = `### ${selectedText}`;
      break;
    case 'ul':
      replacement = `- ${selectedText}`;
      break;
    case 'ol':
      replacement = `1. ${selectedText}`;
      break;
    case 'quote':
      replacement = `> ${selectedText}`;
      break;
    case 'center':
      replacement = `<center>${selectedText}</center>`;
      break;
    case 'right':
      replacement = `<right>${selectedText}</right>`;
      break;
    case 'left':
      replacement = `<left>${selectedText}</left>`;
      break;
    case 'hr':
      replacement = `---`;
      break;
  }

  const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
  onUpdate(newValue);
  
  // Set cursor position after the inserted text
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(start + replacement.length, start + replacement.length);
  }, 0);
};

// Form state management utilities
export const createFormState = <T extends Record<string, any>>(initialData: T) => {
  return {
    data: initialData,
    errors: {} as Record<keyof T, string>,
    touched: {} as Record<keyof T, boolean>,
    loading: false,
    submitting: false
  };
};

export const updateFormField = <T extends Record<string, any>>(
  state: ReturnType<typeof createFormState<T>>,
  field: keyof T,
  value: T[keyof T]
) => {
  return {
    ...state,
    data: { ...state.data, [field]: value },
    touched: { ...state.touched, [field]: true }
  };
};

export const setFormErrors = <T extends Record<string, any>>(
  state: ReturnType<typeof createFormState<T>>,
  errors: Record<keyof T, string>
) => {
  return {
    ...state,
    errors
  };
};

// Common validation rules
export const commonValidationRules = {
  required: { required: true },
  email: { 
    required: true, 
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (!value.includes('@')) return 'Invalid email format';
      return undefined;
    }
  },
  phone: { 
    pattern: /^[+]?[1-9][0-9]{0,15}$/,
    custom: (value: string) => {
      if (value && !/^[+]?[1-9][0-9]{0,15}$/.test(value)) {
        return 'Invalid phone number format';
      }
      return undefined;
    }
  },
  url: {
    pattern: /^https?:\/\/.+/,
    custom: (value: string) => {
      if (value && !value.startsWith('http')) {
        return 'URL must start with http:// or https://';
      }
      return undefined;
    }
  },
  price: {
    pattern: /^\d+(\.\d{1,2})?$/,
    custom: (value: string) => {
      if (value && parseFloat(value) < 0) {
        return 'Price must be positive';
      }
      return undefined;
    }
  }
}; 