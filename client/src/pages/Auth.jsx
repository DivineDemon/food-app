import { useJwt } from "react-jwt";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";
import { register, login } from "../store/api";
import FormGroup from "../components/FormGroup";
import ImageUpload from "../components/ImageUpload";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    phone: "",
  });
  const [toggle, setToggle] = useState(false); // False: Register | True: Login

  const { loading, token } = useSelector((state) => state.user);
  const { isExpired } = useJwt(token);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (toggle) {
      if (formData.email !== "") {
        dispatch(
          login({
            email: formData.email,
            password: formData.password,
          })
        );
      } else {
        dispatch(
          login({
            username: formData.username,
            password: formData.password,
          })
        );
      }
    } else {
      dispatch(register(formData));
    }
  };

  useEffect(() => {
    if (token) {
      if (!isExpired) {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isExpired]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
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
              <>
                {isExpired && (
                  <div className="w-full rounded-lg bg-red-200 text-red-500 px-5 py-3 font-semibold text-center">
                    <span>Session Expired! Please Login Again!</span>
                  </div>
                )}
                <FormGroup
                  label="Username or Email"
                  type="text"
                  placeholder="Enter Username or Email"
                  formData={formData}
                  setFormData={setFormData}
                />
              </>
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
      )}
    </div>
  );
};

export default Auth;
