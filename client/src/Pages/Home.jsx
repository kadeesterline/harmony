import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-green-950 h-screen grid place-content-center">
      <div className="border shadow-lg shadow-green-1050 rounded-lg bg-white w-96 h-48 grid place-content-center">
        <h1 className="font-bold text-4xl m-3"> Harmony </h1>
        <div>
          <Link
            className="bg-green-1050 rounded-full p-2 my-2 mx-1 text-white"
            to="/signin"
          >
            {" "}
            Sign In{" "}
          </Link>
          <Link
            className="bg-green-1050 rounded-full p-2 my-2 mx-1 text-white"
            to="/newuser"
          >
            {" "}
            Sign Up{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
