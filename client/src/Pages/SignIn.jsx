import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useUserUpdate } from "../Context/UserContext";

function SignIn() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSetUser = useUserUpdate();
  const currentUser = useUser();

  function handleSignin(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log(user);
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
      <div className="border shadow-lg shadow-green-1050 rounded-lg bg-white w-96 h-48 grid place-content-center">
        <h1 className="font-bold text-2xl m-2"> Sign in to Harmony! </h1>
        <form autoComplete="nope" onSubmit={handleSignin}>
          <label htmlFor="username" className="mt-2">
            {" "}
            Username:{" "}
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
            {" "}
            Password:{" "}
          </label>
          <input
            autoComplete="nope"
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            className="border rounded-lg mt-2"
          ></input>
          <br />
          <button
            className="bg-green-1050 float-right rounded-full p-3 my-2 mx-1 text-white"
            type="submit"
          >
            {" "}
            Sign in{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
