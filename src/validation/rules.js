export const signupValidationConfig = {
  email: [
    { type: "required", message: "Email is required" },
    {
      type: "regex",
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  ],
  password: [
    { type: "required", message: "Password is required" },
    { type: "minLength", value: 8, message: "Minimum 8 characters" },
    {
      type: "regex",
      // at least 1 lowercase, 1 uppercase, 1 digit, 1 symbol
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      message: "Must contain lowercase, uppercase, number, and symbol",
    },
  ],
  phone: [
    { type: "required", message: "Phone number is required" },
    {
      type: "regex",
      value: /^\+?[\d\s\-()]{7,15}$/,
      message: "Enter a valid phone number",
    },
  ],
};
