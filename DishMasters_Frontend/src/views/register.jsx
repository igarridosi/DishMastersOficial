import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextProvider";

export default function register(){
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const Submit = async (ev) => {
      ev.preventDefault();
      setError(""); // Clear any previous errors

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
        setError("Username must be maximun 10 characters long.");
        return;
    }

      if (payload.password.length < 8) {
          setError("Password must be at least 8 characters long.");
          return;
      }

      try {
          await axiosClient.post("/register", payload);
          // Redirect to login page after successful registration
          navigate('/login');
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

  return(
      <div className="min-h-screen bg-[#FAFBFE] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 font-sans text-center text-5xl font-extrabold text-gray-900">
        Create A New Account
        </h2>
        <p className="message text-center mt-4">
          Already an account? <Link to="/login" className="text-[#FFBD59] hover:text-[#ff9f3d]">Log in</Link>
          </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={Submit}>
            {error && (
                  <div className="alert alert-danger alert-warning flex items-center gap-3" role="alert">
                      <svg className="w-[30px] h-[30px] fill-red-900" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z"></path>
                      </svg>
                      <p className="mt-3">
                          <span className="text-lg font-semibold">Warning alert:</span> {error}
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

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                    alt="Facebook"
                  />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                    alt="Twitter"
                  />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-6 w-6"
                    src="https://www.svgrepo.com/show/506498/google.svg"
                    alt="Google"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}