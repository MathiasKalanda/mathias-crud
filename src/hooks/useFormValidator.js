import { useState } from "react";

/**
 * @param {Object} validationConfig
 * @param {Object} initialValues
 * @returns { values, errors, handleChange, handleBlur, validateAll, setValues }
 */
export function useFormValidator(validationConfig, initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const applyRule = (rule, value) => {
    switch (rule.type) {
      case "required":
        return typeof value === "string" ? value.trim() !== "" : !!value;
      case "minLength":
        return value.length >= rule.value;
      case "regex":
        return rule.value.test(value);
      case "custom":
        return rule.fn(value);
      default:
        return true;
    }
  };

  /**
   * Validate a single field. Returns true if valid, false otherwise.
   */
  const validateField = (fieldName, value) => {
    const rules = validationConfig[fieldName];
    if (!rules || rules.length === 0) return true;

    for (const rule of rules) {
      const isValid = applyRule(rule, value);
      if (!isValid) {
        setErrors((prev) => ({ ...prev, [fieldName]: rule.message }));
        return false;
      }
    }
    // Clear error if field becomes valid
    setErrors((prev) => {
      const { [fieldName]: _, ...rest } = prev;
      return rest;
    });
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateAll = () => {
    let isValid = true;
    for (const fieldName of Object.keys(validationConfig)) {
      const value = values[fieldName] ?? "";
      const fieldValid = validateField(fieldName, value);
      if (!fieldValid) isValid = false;
    }
    return isValid;
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
  };
}
