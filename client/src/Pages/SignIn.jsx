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
    <div>
      <h1> Sign in to Harmony! </h1>
      <form autoComplete="nope" onSubmit={handleSignin}>
        <label htmlFor="username"> Username: </label>
        <input
          autoComplete="nope"
          type="text"
          name="username"
          value={user.username}
          onChange={(e) => handleChange(e)}
        ></input>

        <label htmlFor="password"> Password: </label>
        <input
          autoComplete="nope"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleChange(e)}
        ></input>
        <button type="submit"> Sign in </button>
      </form>
    </div>
  );
}

export default SignIn;
