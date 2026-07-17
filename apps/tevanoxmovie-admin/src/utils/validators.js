export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[0-9]{10,13}$/;
  return regex.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateUsername = (username) => {
  return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== '';
};

export const validateNumber = (value, min = null, max = null) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
  return true;
};

export const validateCurrency = (value) => {
  const regex = /^\d+(,\d{3})*(\.\d{2})?$/;
  return regex.test(value.replace(/,/g, ''));
};

export const getValidationErrors = (data, rules) => {
  const errors = {};
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
    }
  });
  return errors;
};