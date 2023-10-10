import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";
import FormGroup from "../components/FormGroup";
import { setUser } from "../store/slices/userSlice";
import ImageUpload from "../components/ImageUpload";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../store/slices/apiSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const [toggle, setToggle] = useState(false); // False: Register | True: Login
  const [formData, setFormData] = useState({
    email: "",
    image: "",
    phone: "",
    username: "",
    password: "",
  });

  const { isExpired } = useJwt(token);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      if (!isExpired) {
        navigate("/");
      } else {
        setToggle(true);
        toast.error("Session Expired! Please Login Again.");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    try {
      if (toggle) {
        const response = await login(formData);

        if (response.error) {
          toast.error(response.error.data.message);
        } else {
          dispatch(setUser(response.data.data));
          toast.success("Logged In!");
          navigate("/");
        }
      } else {
        const response = await register({ ...formData, type: "user" });

        if (response.error) {
          toast.error(response.error.data.message);
        } else {
          toast.success("Registered! Please Login Now to Continue!");
          setToggle(true);
        }
      }
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };

  if (loginLoading || registerLoading) {
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading />
    </div>;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Toaster />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-[80%] md:w-[65%] lg:w-[35%] xl:w[35%] rounded-lg bg-gray-300 flex flex-col items-start justify-start p-5">
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
            className="w-full text-center text-sm text-blue-600 hover:underline cursor-pointer">
            {!toggle
              ? "Already have an account? Login!"
              : "Don't have an account? Register!"}
          </span>
          <button
            type="submit"
            className="w-full px-5 py-3 text-white font-semibold rounded-lg bg-black flex flex-row items-center justify-center space-x-3">
            <span>Let&apos;s Go</span>
            <FaTelegramPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
