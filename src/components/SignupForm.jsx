import React from "react";
import { useFormValidator } from "../hooks/useFormValidator";
import { signupValidationConfig } from "../validation/rules";

export default function SignupForm() {
  const { values, errors, handleChange, handleBlur, validateAll } =
    useFormValidator(signupValidationConfig, {
      email: "",
      password: "",
      phone: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault(); // No page reload
    if (validateAll()) {
      alert("Form is valid! Submitting...");
      console.log("Form data:", values);
      // Perform API call here
    } else {
      alert("Please fix the errors.");
    }
  };

  const inputClass = (field) =>
    `w-full p-2 border rounded ${
      errors[field]
        ? "border-red-500"
        : values[field]
          ? "border-green-500"
          : "border-gray-300"
    }`;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("email")}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("password")}
            placeholder="Min. 8 chars, mixed case, digit, symbol"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("phone")}
            placeholder="+1234567890"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
