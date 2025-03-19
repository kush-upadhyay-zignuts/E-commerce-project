export const VALIDATION_MESSAGES = {
    REQUIRED: "This field is required",
    FIRSTNAME: {
      INVALID: "Only letters allowed",
      MIN: "Must be at least 2 characters",
      MAX: "Cannot exceed 30 characters",
    },
    LASTNAME: {
      INVALID: "Only letters allowed",
      MIN: "Must be at least 2 characters",
      MAX: "Cannot exceed 30 characters",
    },
    EMAIL: {
      INVALID: "Enter a valid email address",
    },
    MOBILE: {
      INVALID: "Enter a valid 10-digit mobile number",
    },
    PASSWORD: {
      MIN: "At least 8 characters required",
      MAX: "Cannot exceed 32 characters",
      INVALID: "Must include uppercase, lowercase, number & special character",
    },
    CONFIRM_PASSWORD: "Passwords do not match",
  };
  
  export const VALIDATION_PATTERNS = {
    NAME: /^[A-Za-z]+$/, // Only letters is allowed
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email regex
    MOBILE: /^(0|91)?[6-9][0-9]{9}$/, // 10-digit mobile starting with 6-9 (india specific)
    PASSWORD:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/, //  password regex
  };