import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/api/user";

const Signup = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name,userName,email,password));
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-20 mx-auto flex flex-wrap items-center">
        <form
          onSubmit={submitHandler}
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col m-auto w-full mt-10 md:mt-0"
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
            Sign Up
          </h2>
          <div className="relative mb-2">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8"
            />
          </div>
          <div className="relative mb-2">
            <label
              htmlFor="user-name"
              className="leading-7 text-sm text-gray-600"
            >
              User Name
            </label>
            <input
              type="text"
              id="user-name"
              name="user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8"
            />
          </div>
          <div className="relative mb-2">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={[password]}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
          >
            Submit
          </button>
          <Link
            to="/"
            className=" text-black bg-gray-300 border-0 mt-4 text-center py-2 px-8 focus:outline-none hover:bg-gray-400 rounded text-lg"
          >
            Back
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Signup;
