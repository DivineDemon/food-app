import React from "react";

const FormGroup = ({
  label,
  placeholder,
  type,
  name,
  setUsername,
  setEmail,
  setPassword,
  setText,
}) => {
  const handleChange = (e) => {
    if (name === "email") {
      setEmail(e.target.value);
    } else if (name === "username") {
      setUsername(e.target.value);
    } else if (name === "username_or_email") {
      setText(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="px-5 py-3 rounded-lg text-md"
        onChange={handleChange}
      />
    </div>
  );
};

export default FormGroup;
