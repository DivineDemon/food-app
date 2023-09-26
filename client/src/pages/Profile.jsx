import { useState } from "react";
import { useSelector } from "react-redux";
import { FaTelegramPlane } from "react-icons/fa";

import FormGroup from "../components/FormGroup";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form className="w-[80%] md:w-[65%] lg:w-[35%] xl:w[35%] rounded-lg bg-gray-300 flex flex-col items-start justify-start p-5 space-y-3">
        <h1 className="w-full text-center text-3xl font-bold mb-3">
          Edit Profile
        </h1>
        <div className="w-full flex items-center justify-center">
          <img
            src={user.image}
            alt="profile"
            className="w-32 h-32 rounded-full border border-gray-400"
          />
        </div>
        <FormGroup
          label="Username"
          type="text"
          placeholder={user.username}
          formData={formData}
          setFormData={setFormData}
        />
        <FormGroup
          label="Email"
          type="email"
          placeholder={user.email}
          formData={formData}
          setFormData={setFormData}
        />
        <FormGroup
          label="Password"
          type="password"
          placeholder="Update Password"
          formData={formData}
          setFormData={setFormData}
        />
        <FormGroup
          label="Phone"
          type="text"
          placeholder={user.phone}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="w-full pt-5 flex items-center justify-center">
          <button
            type="submit"
            className="w-full px-5 py-3 text-white font-semibold rounded-lg bg-black flex flex-row items-center justify-center space-x-3"
          >
            <span>Let's Go</span>
            <FaTelegramPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
