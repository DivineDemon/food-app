import React from "react";

const FormGroup = ({
  id,
  type,
  text,
  name,
  label,
  formData,
  placeholder,
  setFormData,
}) => {
  const handleChange = (e) => {
    if (name === "email") {
      setFormData({ ...formData, email: e.target.value });
    } else if (name === "username") {
      setFormData({ ...formData, username: e.target.value });
    } else if (name === "username_or_email") {
      const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        e.target.value
      );
      if (isEmail) {
        setFormData({ ...formData, email: e.target.value });
      } else {
        setFormData({ ...formData, username: e.target.value });
      }
    } else {
      setFormData({ ...formData, password: e.target.value });
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
        id={id}
        defaultValue={text}
        className="px-5 py-3 rounded-lg text-md"
        onChange={handleChange}
      />
    </div>
  );
};

export default FormGroup;
