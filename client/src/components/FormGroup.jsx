import React from "react";

const FormGroup = ({ label, placeholder, type, name }) => {
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
      />
    </div>
  );
};

export default FormGroup;
