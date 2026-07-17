export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const regex = /^[0-9]{10,13}$/;
  return regex.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateUsername = (username: string): boolean => {
  return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value: any): boolean => {
  return value !== null && value !== undefined && value !== '';
};

export const validateNumber = (value: any, min?: number, max?: number): boolean => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
};

export const validateCurrency = (value: string): boolean => {
  const regex = /^\d+(,\d{3})*(\.\d{2})?$/;
  return regex.test(value.replace(/,/g, ''));
};

export const validateAgentCode = (code: string): boolean => {
  const regex = /^TVX-[A-Z0-9]{6}$/;
  return regex.test(code);
};

export const validateCategorySlug = (slug: string): boolean => {
  const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return regex.test(slug);
};

export const getValidationErrors = (
  data: Record<string, any>,
  rules: Record<string, any>
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach((field) => {
    const value = data[field];
    const rule = rules[field];
    
    if (rule.required && !validateRequired(value)) {
      errors[field] = `${field} is required`;
    } else if (rule.type === 'email' && value && !validateEmail(value)) {
      errors[field] = 'Invalid email address';
    } else if (rule.type === 'phone' && value && !validatePhone(value)) {
      errors[field] = 'Invalid phone number';
    } else if (rule.type === 'number' && value) {
      const num = parseFloat(value);
      if (isNaN(num)) {
        errors[field] = 'Must be a number';
      } else if (rule.min !== undefined && num < rule.min) {
        errors[field] = `Must be at least ${rule.min}`;
      } else if (rule.max !== undefined && num > rule.max) {
        errors[field] = `Must be at most ${rule.max}`;
      }
    } else if (rule.type === 'url' && value && !validateUrl(value)) {
      errors[field] = 'Invalid URL';
    } else if (rule.type === 'agentCode' && value && !validateAgentCode(value)) {
      errors[field] = 'Invalid agent code format (TVX-XXXXXX)';
    } else if (rule.type === 'slug' && value && !validateCategorySlug(value)) {
      errors[field] = 'Invalid slug format';
    }
  });
  
  return errors;
};