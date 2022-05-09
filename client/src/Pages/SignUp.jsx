import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserUpdate } from "../Context/UserContext";

function SignUp() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  let navigate = useNavigate();

  const handleSetUser = useUserUpdate();

  function handleSignup(e) {
    e.preventDefault();
    console.log(user);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          handleSetUser(user);
          navigate("/new");
        });
      }
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  return (
    <div className="bg-green-950 h-screen grid place-content-center">
      <div className="border shadow-lg shadow-green-1050 rounded-lg bg-white w-96 h-64 grid place-content-center">
        <h1 className="font-bold text-2xl m-2">Sign up for Harmony!</h1>

        <form autoComplete="false" onSubmit={handleSignup}>
          <label htmlFor="email" className="mt-2">
            {" "}
            Email:{" "}
          </label>
          <input
            autoComplete="nope"
            type="text"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
            className="border rounded-lg mt-2"
          ></input>
          <br />
          <label htmlFor="username" className="mt-2">
            Username:
          </label>
          <input
            autoComplete="nope"
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => handleChange(e)}
            className="border rounded-lg mt-2"
          ></input>
          <br />
          <label htmlFor="password" className="mt-2">
            Password:
          </label>
          <input
            autoComplete="false"
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            className="border rounded-lg mt-2"
          ></input>
          <br />
          <label htmlFor="password_confirmation" className="mt-2">
            Confirm Password:
          </label>
          <input
            autoComplete="false"
            type="password"
            name="password_confirmation"
            value={user.password_confirmation}
            onChange={(e) => handleChange(e)}
            className="border rounded-lg mt-2"
          ></input>
          <br />
          <button
            className="bg-green-1050 float-right rounded-full p-3 my-2 mx-1 text-white"
            type="submit"
          >
            {" "}
            Sign up{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
