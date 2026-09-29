export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateRequired = (
  value: string | undefined | null,
  fieldName: string
): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
};

export const validateEmail = (email: string): ValidationResult => {
  const req = validateRequired(email, 'Email address');
  if (!req.isValid) return req;

  if (!EMAIL_REGEX.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid campus or personal email' };
  }
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  const req = validateRequired(password, 'Password');
  if (!req.isValid) return req;

  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters' };
  }
  return { isValid: true };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  const req = validateRequired(confirmPassword, 'Confirm password');
  if (!req.isValid) return req;

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  return { isValid: true };
};

export const validatePrice = (price: string | number): ValidationResult => {
  const strPrice = String(price || '').trim();
  const req = validateRequired(strPrice, 'Price');
  if (!req.isValid) return req;

  if (!PRICE_REGEX.test(strPrice)) {
    return { isValid: false, error: 'Price must be a valid positive number' };
  }

  const num = parseFloat(strPrice);
  if (isNaN(num) || num <= 0) {
    return { isValid: false, error: 'Price must be greater than 0' };
  }

  return { isValid: true };
};
