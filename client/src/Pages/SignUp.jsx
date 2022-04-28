import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useUserUpdate } from "../Context/UserContext";

function SignUp() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  let navigate = useNavigate();

  const handleSetUser = useUserUpdate();
  const currentUser = useUser();

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
    <div>
      <h1>Sign up for Harmony!</h1>

      <form autoComplete="false" onSubmit={handleSignup}>
        <label htmlFor="email"> Email: </label>
        <input
          autoComplete="nope"
          type="text"
          name="email"
          value={user.email}
          onChange={(e) => handleChange(e)}
        ></input>

        <label htmlFor="username">Username:</label>
        <input
          autoComplete="nope"
          type="text"
          name="username"
          value={user.username}
          onChange={(e) => handleChange(e)}
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          autoComplete="false"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleChange(e)}
        ></input>

        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input
          autoComplete="false"
          type="password"
          name="password_confirmation"
          value={user.password_confirmation}
          onChange={(e) => handleChange(e)}
        ></input>
        <button type="submit"> Sign up </button>
      </form>
    </div>
  );
}

export default SignUp;
