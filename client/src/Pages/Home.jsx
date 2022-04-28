import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1> Harmony </h1>
      <Link to="/login"> Sign In </Link>
      <Link to="/signup"> Sign Up </Link>
    </div>
  );
}

export default Home;
