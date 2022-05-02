import React from "react";
import { useState } from "react";
import { useUser, useUserUpdate } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function New() {
  const currentUser = useUser();
  const setCurrentUser = useUserUpdate();

  const [addRoomState, setAddRoomState] = useState({
    name: "",
    user_id: currentUser.id,
  });

  let navigate = useNavigate();

  function handleSetUser(user) {
    setCurrentUser(user);
  }

  function handleAddRoom(e) {
    e.preventDefault();
    console.log(currentUser.id);
    fetch("/rooms", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: addRoomState.name,
        user_id: currentUser.id,
      }),
    }).then((r) => {
      if (r.ok) {
        fetch("/autologin").then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              handleSetUser(user);
            });
          }
        });
        // r.json().then(setCurrentUser.rooms);
        // .then(navigate(`/boards/${r.id}`));
      }
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setAddRoomState((room) => ({ ...room, [name]: value }));
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-200  m-5 w-1/2 h-56 rounded-2xl flex items-center justify-center">
        <form className="" autoComplete="nope" onSubmit={handleAddRoom}>
          <label htmlFor="name"> Create a Room: </label>
          <input
            autoComplete="nope"
            type="text"
            name="name"
            value={addRoomState.name}
            onChange={(e) => handleChange(e)}
            className="border rounded-lg w-96"
          ></input>

          <button
            className="bg-green-1050 rounded-full p-3 my-2 mx-1 text-white"
            type="submit"
          >
            {" "}
            Create{" "}
          </button>
        </form>
      </div>

      {/* <form></form> */}
    </div>
  );
}

export default New;
