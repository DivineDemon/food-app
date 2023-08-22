import { useJwt } from "react-jwt";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register, login } from "../store/api";
import FormGroup from "../components/FormGroup";
import { getUserToken } from "../utils/helpers";
import ImageUpload from "../components/ImageUpload";

const Auth = () => {
  const token = getUserToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isExpired } = useJwt(token);

  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    image: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!toggle) {
      dispatch(register(formData));
      setToggle(true);
    } else {
      if (formData.username) {
        dispatch(
          login({ username: formData.username, password: formData.password })
        );
      } else {
        dispatch(login({ email: formData.email, password: formData.password }));
      }
      navigate("/");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[25%] space-y-10 bg-gray-200 shadow-lg rounded-lg p-5"
      >
        {toggle && (
          <>
            {isExpired && (
              <div className="w-full p-3 flex items-start justify-start bg-red-200 rounded-lg">
                <span className="text-red-600 font-semibold text-md">
                  Session Expired! Please Login Again.
                </span>
              </div>
            )}
          </>
        )}
        <h1 className="text-center font-bold text-3xl">
          {!toggle ? "Register" : "Login"}
        </h1>
        {toggle && (
          <FormGroup
            name="username_or_email"
            id="username_or_email"
            placeholder="Enter Username or Email"
            type="text"
            label="Username or Email"
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {!toggle && (
          <>
            <FormGroup
              name="username"
              id="username"
              placeholder="Enter Username"
              type="text"
              label="Username"
              formData={formData}
              setFormData={setFormData}
            />
            <FormGroup
              name="email"
              id="email"
              placeholder="Enter Email"
              type="email"
              label="Email"
              formData={formData}
              setFormData={setFormData}
            />
          </>
        )}
        <FormGroup
          name="password"
          id="password"
          placeholder="Enter Password"
          type="password"
          label="Password"
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
          className="text-center text-sm font-semibold text-blue-500 underline cursor-pointer"
        >
          {!toggle
            ? "Already have an account! Login."
            : "Don't Have and Account? Register!"}
        </span>
        <button
          type="submit"
          className="px-5 py-3 bg-black rounded-lg text-white text-lg font-semibold hover:bg-white hover:border hover:border-black hover:text-black transition delay-0 ease-in"
        >
          Let's Go!
        </button>
      </form>
    </div>
  );
};

export default Auth;
