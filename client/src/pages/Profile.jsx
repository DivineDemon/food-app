import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaTelegramPlane } from "react-icons/fa";

import Loading from "../components/Loading";
import FormGroup from "../components/FormGroup";
import ImageUpload from "../components/ImageUpload";
import { setUser } from "../store/slices/userSlice";
import { useUpdateUserMutation } from "../store/slices/apiSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [update, { isLoading }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    username: null,
    email: null,
    password: null,
    phone: null,
    image: null,
  });

  const handleSubmit = async () => {
    const filteredFormData = Object.entries(formData)
      .filter(([key, value]) => value !== null)
      .reduce((result, [key, value]) => {
        result[key] = value;
        return result;
      }, {});

    const data = {
      formData: filteredFormData,
      id: user.ID,
    };

    const response = await update(data);

    if (response.error) {
      toast.error(response.error.data.message);
    } else {
      dispatch(setUser({ user: response.data.data }));
      toast.success("Updated Profile!");
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-[80%] md:w-[65%] lg:w-[35%] xl:w[35%] rounded-lg bg-gray-300 flex flex-col items-center justify-center p-5 space-y-3">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Toaster />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-[80%] md:w-[65%] lg:w-[35%] xl:w[35%] rounded-lg bg-gray-300 flex flex-col items-start justify-start p-5 space-y-3">
        <h1 className="w-full text-center text-3xl font-bold mb-3 grid grid-cols-12 items-center justify-center">
          <FaArrowLeft
            className="w-5 h-5 align-center col-span-1 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <span className="col-span-10 align-center">Edit Profile</span>
        </h1>
        <div className="w-full flex items-center justify-center">
          <ImageUpload
            image={user.image}
            formData={formData}
            setFormData={setFormData}
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
            className="w-full px-5 py-3 text-white font-semibold rounded-lg bg-black flex flex-row items-center justify-center space-x-3">
            <span>Let's Go</span>
            <FaTelegramPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
