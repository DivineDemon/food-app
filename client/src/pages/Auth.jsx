import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Loading from "../components/Loading";
import { register, login } from "../store/api";
import FormGroup from "../components/FormGroup";
import { imageToBase64, isAuthenticated } from "../utils/helpers";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExisting, setIsExisting] = useState(false);

  useEffect(() => {
    if (isExisting) {
      setText(document.getElementById("username_or_email").value);
    }
  }, [isExisting]);

  const triggerUpload = () => {
    document.getElementById("imageUpload").click();
  };

  const handleImageUpload = async (e) => {
    setLoading(true);
    const base64 = await imageToBase64(e.target.files[0]);

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64 }),
    });

    const data = await response.json();
    if (data.url) {
      setLoading(false);
      setImage(data.url);
    }
  };

  const submitAuthForm = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (isExisting) {
      if (emailRegex.test(text)) {
        dispatch(login({ email: text, password }));
      } else {
        dispatch(login({ username: text, password }));
      }

      if (isAuthenticated()) {
        navigate("/");
      }
    } else {
      dispatch(register({ username, email, password, image }));
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="flex flex-col w-[25%] space-y-10 bg-gray-200 shadow-lg rounded-lg p-5"
        onSubmit={submitAuthForm}
      >
        <h1 className="text-center font-bold text-3xl">
          {!isExisting ? "Register" : "Login"}
        </h1>
        {!isExisting ? (
          <FormGroup
            name="username"
            id="username"
            placeholder="Enter Username"
            type="text"
            label="Username"
            setUsername={setUsername}
          />
        ) : (
          <FormGroup
            name="username_or_email"
            id="username_or_email"
            placeholder="Enter Username or Email"
            type="text"
            label="Username or Email"
            setText={setText}
            text={text}
          />
        )}
        {!isExisting && (
          <FormGroup
            name="email"
            id="email"
            placeholder="Enter Email"
            type="email"
            label="Email"
            setEmail={setEmail}
          />
        )}
        <FormGroup
          name="password"
          id="password"
          placeholder="Enter Password"
          type="password"
          label="Password"
          setPassword={setPassword}
        />
        {!isExisting && (
          <>
            <div className="w-full h-full rounded-md flex flex-col items-start justify-start space-y-3">
              <label className="text-sm font-semibold" htmlFor="image">
                Profile Image
              </label>
              <input
                type="file"
                name="image"
                id="imageUpload"
                className="hidden"
                onChange={(e) => handleImageUpload(e)}
              />
              <button
                type="button"
                onClick={triggerUpload}
                className={
                  image ? "hidden" : "px-5 py-3 text-white font-semibold rounded-lg bg-black"
                }
              >
                Upload Image
              </button>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <div className="w-full flex items-center justify-center">
                <img
                  src={image}
                  alt="profile"
                  className={image ? "w-32 h-32 rounded-full" : "hidden"}
                />
              </div>
            )}
          </>
        )}
        <span
          onClick={() => setIsExisting((prevState) => !prevState)}
          className="text-center text-sm font-semibold text-blue-500 underline cursor-pointer"
        >
          {!isExisting
            ? "Already have an account! Login."
            : "Don't Have and Account? Register!"}
        </span>
        <button
          type="submit"
          className="px-5 py-3 bg-black rounded-lg text-white text-lg font-semibold hover:bg-white hover:border hover:border-black hover:text-black transition delay-150 ease-in-out"
        >
          Let's Go!
        </button>
      </form>
    </div>
  );
};

export default Auth;
