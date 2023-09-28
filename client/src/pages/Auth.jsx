import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import Loading from "../components/Loading";
import FormGroup from "../components/FormGroup";
import ImageUpload from "../components/ImageUpload";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../store/slices/apiSlice";

const Auth = () => {
  const navigate = useNavigate();
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();

  const [toggle, setToggle] = useState(false); // False: Register | True: Login
  const [formData, setFormData] = useState({
    email: "",
    image: "",
    phone: "",
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      if (toggle) {
        const [data, result] = loginMutation();
        console.log("Login: ", data, result);
      } else {
        const [data, result] = registerMutation();
        console.log("Register: ", data, result);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred.");
    }
  };

  if (toggle) {
    registerMutation.isLoading && <Loading />;
  } else {
    loginMutation.isLoading && <Loading />;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Toaster />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-[80%] md:w-[65%] lg:w-[35%] xl:w[35%] rounded-lg bg-gray-300 flex flex-col items-start justify-start p-5"
      >
        <h1 className="w-full text-center text-3xl font-bold mb-3">
          {!toggle ? "Register" : "Login"}
        </h1>
        <div className="w-full flex flex-col items-start justify-start space-y-3">
          {!toggle ? (
            <>
              <FormGroup
                label="Username"
                type="text"
                placeholder="Enter Username"
                formData={formData}
                setFormData={setFormData}
              />
              <FormGroup
                label="Phone"
                type="text"
                placeholder="Enter Phone"
                formData={formData}
                setFormData={setFormData}
              />
              <FormGroup
                label="Email"
                type="email"
                placeholder="Enter Email"
                formData={formData}
                setFormData={setFormData}
              />
            </>
          ) : (
            <FormGroup
              label="Username or Email"
              type="text"
              placeholder="Enter Username or Email"
              formData={formData}
              setFormData={setFormData}
            />
          )}
          <FormGroup
            label="Password"
            type="password"
            placeholder="Enter Password"
            formData={formData}
            setFormData={setFormData}
          />
          <ImageUpload
            toggle={toggle}
            formData={formData}
            setFormData={setFormData}
          />
          <span
            onClick={() => setToggle((prevState) => !prevState)}
            className="w-full text-center text-sm text-blue-600 hover:underline cursor-pointer"
          >
            {!toggle
              ? "Already have an account? Login!"
              : "Don't have an account? Register!"}
          </span>
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

export default Auth;
