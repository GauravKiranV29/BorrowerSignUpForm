import React, { useState } from "react";
import axios from "axios";

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "text", required: true },
  { name: "phone", label: "Phone", type: "text", required: true },
  { name: "residence_type", label: "Residence Type", type: "text", required: true },
  { name: "monthly_income", label: "Monthly Income", type: "number", required: true },
  { name: "previous_loan", label: "Previous Loan", type: "checkbox", required: false },
  { name: "marital_status", label: "Marital Status", type: "text", required: true },
  { name: "number_of_dependents", label: "Number of Dependents", type: "number", required: true },
  { name: "city", label: "City", type: "text", required: true },
  { name: "state", label: "State", type: "text", required: true },
];

const validate = (data) => {
  const errors = {};

  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email";
  if (!data.phone.trim()) errors.phone = "Phone is required";
  else if (!/^\d{10}$/.test(data.phone)) errors.phone = "Phone must be 10 digits";
  if (!data.residence_type.trim()) errors.residence_type = "Residence Type is required";
  if (!data.monthly_income) errors.monthly_income = "Monthly Income is required";
  else if (parseFloat(data.monthly_income) <= 0) errors.monthly_income = "Income must be positive";
  if (!data.marital_status.trim()) errors.marital_status = "Marital Status is required";
  if (data.number_of_dependents === "") errors.number_of_dependents = "Number of Dependents is required";
  else if (parseInt(data.number_of_dependents) < 0) errors.number_of_dependents = "Cannot be negative";
  if (!data.city.trim()) errors.city = "City is required";
  if (!data.state.trim()) errors.state = "State is required";

  return errors;
};

export default function App() {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : "";
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      await axios.post("http://localhost:8000/borrowers", formData);
      alert("Form submitted successfully!");
      setFormData(
        fields.reduce((acc, field) => {
          acc[field.name] = field.type === "checkbox" ? false : "";
          return acc;
        }, {})
      );
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="container">
      <style>{`
        .container {
          max-width: 600px;
          margin: 40px auto;
          padding: 30px;
          background: #f8f9fa;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        h2 {
          text-align: center;
          margin-bottom: 24px;
          color: #333;
        }
        label {
          font-weight: 600;
          display: block;
          margin-bottom: 5px;
        }
        input[type="text"],
        input[type="number"],
        input[type="email"] {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          font-size: 14px;
          margin-bottom: 6px;
          transition: border 0.3s;
        }
        input[type="text"]:focus,
        input[type="number"]:focus,
        input[type="email"]:focus {
          border-color: #007bff;
          outline: none;
        }
        input[type="checkbox"] {
          transform: scale(1.2);
          margin-right: 8px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .error {
          color: red;
          font-size: 12px;
          margin-top: 2px;
        }
        button[type="submit"] {
          background: #007bff;
          color: #fff;
          border: none;
          padding: 12px 24px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
          transition: background 0.3s;
        }
        button[type="submit"]:hover {
          background: #0056b3;
        }
      `}</style>

      <h2>Borrower Sign-Up</h2>
      <form onSubmit={handleSubmit} noValidate>
        {fields.map(({ name, label, type }) => (
          <div key={name} className="form-group">
            <label htmlFor={name}>{label}</label>
            {type === "checkbox" ? (
              <div>
                <input
                  type="checkbox"
                  id={name}
                  name={name}
                  checked={formData[name]}
                  onChange={handleChange}
                />
                <label htmlFor={name}>Yes</label>
              </div>
            ) : (
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
              />
            )}
            {errors[name] && <div className="error">{errors[name]}</div>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
