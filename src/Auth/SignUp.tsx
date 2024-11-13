import { ArrowLeft, Send } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { userSignUp } from "../Api/api";

const SignUp = () => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    userSignUp(formData);
  }
  return (
    <div className="flex min-h-[90vh]  items-center justify-center w-full h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 min-w-20 text-[2rem] text-[#968f68]"
      >
        <label htmlFor="name" className="flex items-center justify-center">
          <p className="w-1/2"> Name:</p>
          <input className="w-4/5" type="text" id="name" name="name" required />
        </label>
        <label className="flex items-center justify-center" htmlFor="email">
          <p className="w-1/2">Email:</p>
          <input
            className="w-4/5"
            type="email"
            required
            name="email"
            id="email"
          />
        </label>
        <label className="flex items-center justify-center" htmlFor="password">
          <p className="w-1/2">Password:</p>
          <input
            className="w-4/5"
            type="password"
            required
            name="password"
            id="password"
          />
        </label>
        <label
          className="flex items-center justify-center"
          htmlFor="passwordConfirm"
        >
          <p className="w-3/6">Password Confirm:</p>
          <input
            className="w-3/6"
            type="password"
            required
            name="passwordConfirm"
            id="PasswordConfirm"
          />
        </label>
        <div className="flex items-center justify-center gap-5 mt-5 ml-auto">
          <Link to={"/"}>
            <button className="flex items-center justify-center gap-3">
              <ArrowLeft />
              Back
            </button>
          </Link>
          <button
            type="submit"
            className="flex items-center gap-3 justify-self-center"
          >
            Submit
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
