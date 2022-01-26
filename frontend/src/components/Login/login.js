import React from "react";

function Login() {
  return (
    <div className="Login">
      <p>Login</p>
      <div>
        <label htmlFor="" className="text-sm font-bold text-gray-600 block">
          Username
        </label>
        <input
          type="text"
          className="w-full p=2 border border-gray-300 rounded mt-1"
        ></input>
      </div>
      <div>
        <label htmlFor="" className="text-sm font-bold text-gray-600 block">
          Password
        </label>
        <input
          type="password"
          className="w-full p=2 border border-gray-300 rounded mt-1"
        ></input>
      </div>
    </div>
  );
}

export default Login;
