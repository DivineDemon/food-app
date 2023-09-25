const FormGroup = ({ label, placeholder, type, formData, setFormData }) => {
  const handleChange = (e) => {
    switch (label) {
      case "Username":
        setFormData({ ...formData, username: e.target.value });
        break;
      case "Email":
        setFormData({ ...formData, email: e.target.value });
        break;
      case "Password":
        setFormData({ ...formData, password: e.target.value });
        break;
      case "Phone":
        setFormData({ ...formData, phone: e.target.value });
        break;
      case "Username or Email":
        if (
          e.target.value.match(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
          )
        ) {
          setFormData({ ...formData, email: e.target.value });
        } else {
          setFormData({ ...formData, username: e.target.value });
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <label htmlFor="username" className="text-sm font-semibold">
        {label}
      </label>
      <div className="w-full p-3 rounded-lg bg-white">
        <input
          type={type}
          className="w-full focus:outline-0 border-0 focus:border-0"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default FormGroup;
