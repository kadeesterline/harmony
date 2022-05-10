import React from "react";
import { useState } from "react";
import { useUser, useUserUpdate } from "../Context/UserContext";

function New() {
  const currentUser = useUser();
  const setCurrentUser = useUserUpdate();

  const [addRoomState, setAddRoomState] = useState({
    name: "",
    user_id: currentUser.id,
  });

  const [joinRoomState, setJoinRoomState] = useState({
    code: "",
    user_id: currentUser.id,
  });

  function handleSetUser(user) {
    setCurrentUser(user);
  }

  function handleAddRoom(e) {
    e.preventDefault();
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
      }
    });
  }

  function handleJoinRoom(e) {
    e.preventDefault();
    fetch("/room_members/join", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        code: joinRoomState.code,
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
      }
    });
  }

  function handleNameChange(e) {
    const { name, value } = e.target;
    setAddRoomState((room) => ({ ...room, [name]: value }));
  }

  function handleCodeChange(e) {
    const { name, value } = e.target;
    setJoinRoomState((room) => ({ ...room, [name]: value }));
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-200  m-5 w-1/2 h-56 rounded-2xl grid grid-cols-1 items-center justify-items-center">
        <form className="" autoComplete="nope" onSubmit={handleAddRoom}>
          <label htmlFor="name">Create a Room:</label>
          <input
            autoComplete="nope"
            type="text"
            name="name"
            value={addRoomState.name}
            onChange={(e) => handleNameChange(e)}
            className="border rounded-lg w-96"
          ></input>

          <button
            className="bg-slate-500 rounded-full p-3 my-2 mx-1 text-white"
            type="submit"
          >
            Create
          </button>
        </form>

        <form onSubmit={handleJoinRoom}>
          <label htmlFor="code">Enter a Room Code:</label>
          <input
            autoComplete="asdf"
            type="text"
            name="code"
            value={joinRoomState.code}
            onChange={(e) => handleCodeChange(e)}
            className="border rounded-lg w-96"
          ></input>
          <button
            className="bg-slate-500 rounded-full p-3 my-2 mx-1 text-white"
            type="submit"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}

export default New;
