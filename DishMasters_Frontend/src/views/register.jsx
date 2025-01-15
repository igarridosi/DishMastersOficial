import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const Submit = async (ev) => {
    ev.preventDefault();
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous messages

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!payload.name || !payload.email || !payload.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (payload.name.length > 10) {
      setError("Username must be maximum 10 characters long.");
      return;
    }

    if (payload.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      await axiosClient.post("/register", payload);
      // Show message to check email for verification
      setMessage("Registration successful! Please check your email to verify your account.");
      // Redirect to login page after a short delay
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      if (!err.response) {
        setError("Unable to connect to the server. Please check your internet connection and try again.");
      } else {
        const { status, data } = err.response;
        switch (status) {
          case 409:
            setError("This email is already registered. Please use a different email or try logging in.");
            break;
          case 422:
            setError(data.message || "Validation error. Please check your input.");
            break;
          case 500:
            setError("An unexpected error occurred. Please try again later.");
            break;
          default:
            setError("An error occurred. Please try again.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFE] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 font-sans text-center text-5xl font-extrabold text-gray-900">
          Create A New Account
        </h2>
        <p className="message text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FFBD59] hover:text-[#ff9f3d]">
            Log in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={Submit}>
            {error && (
              <div
                className="alert alert-danger alert-warning flex items-center gap-3"
                role="alert"
              >
                <p className="mt-3">
                  <span className="text-lg font-semibold">Warning alert:</span> {error}
                </p>
              </div>
            )}
            {message && (
              <div className="alert alert-success alert-info flex items-center gap-3" role="alert">
                <p className="mt-3">
                  <span className="text-lg font-semibold">Success:</span> {message}
                </p>
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  ref={nameRef}
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  ref={emailRef}
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FFBD59] hover:bg-[#ff9f3d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#ff9f3d]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
