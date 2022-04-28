import React from "react";
import { useState } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function New() {
  const currentUser = useUser();

  const [addRoomState, setAddRoomState] = useState({
    name: "",
    user_id: currentUser.id,
  });

  let navigate = useNavigate();

  function handleAddRoom(e) {
    e.preventDefault();
    console.log(currentUser.id);
    fetch("/rooms", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(addRoomState),
    }).then((r) => {
      if (r.ok) {
        r.json().then(console.log(r));
        // .then(navigate(`/boards/${r.id}`));
      }
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setAddRoomState((room) => ({ ...room, [name]: value }));
  }

  return (
    <div className="bg-slate-200 w-1/2 h-56 left-80 rounded-2xl mx-10 my-20 absolute ">
      <form className="mt-10" autoComplete="nope" onSubmit={handleAddRoom}>
        <label htmlFor="name"> Create a Room: </label>
        <input
          autoComplete="nope"
          type="text"
          name="name"
          value={addRoomState.name}
          onChange={(e) => handleChange(e)}
        ></input>
        <button type="submit"> Create </button>
      </form>

      {/* <form></form> */}
    </div>
  );
}

export default New;
