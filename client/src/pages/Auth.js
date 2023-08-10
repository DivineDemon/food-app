import React, { useState } from "react";
import FormGroup from "../components/FormGroup";

const Auth = () => {
  const [isExisting, setIsExisting] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form className="flex flex-col w-[25%] space-y-10 bg-gray-200 shadow-lg rounded-lg p-5">
        <h1 className="text-center font-bold text-3xl">
          {isExisting ? "Register" : "Login"}
        </h1>
        {isExisting ? (
          <FormGroup
            name="username"
            placeholder="Enter Username"
            type="text"
            label="Username"
          />
        ) : (
          <FormGroup
            name="username"
            placeholder="Enter Username or Email"
            type="text"
            label="Username or Email"
          />
        )}
        {isExisting && (
          <FormGroup
            name="email"
            placeholder="Enter Email"
            type="email"
            label="Email"
          />
        )}
        <FormGroup
          name="password"
          placeholder="Enter Password"
          type="password"
          label="Password"
        />
        <span
          onClick={() => setIsExisting((prevState) => !prevState)}
          className="text-center text-sm font-semibold text-blue-500 underline cursor-pointer"
        >
          {isExisting
            ? "Already have an account! Login."
            : "Don't Have and Account? Register!"}
        </span>
        <button className="px-5 py-3 bg-black rounded-lg text-white text-lg font-semibold hover:bg-white hover:border hover:border-black hover:text-black transition delay-150 ease-in-out">
          Let's Go!
        </button>
      </form>
    </div>
  );
};

export default Auth;
