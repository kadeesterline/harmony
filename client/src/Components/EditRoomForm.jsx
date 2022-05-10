import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserUpdate } from "../Context/UserContext";

function EditRoomForm({ showEditRoom, setShowEditRoom }) {
  let { id } = useParams();

  const setCurrentUser = useUserUpdate();
  const [editRoomInput, setEditRoomInput] = useState({
    name: "",
  });

  function handleEditRoom(e) {
    e.preventDefault();
    fetch(`/rooms/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editRoomInput),
    }).then((r) => {
      if (r.ok) {
        fetch("/autologin").then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              handleSetUser(user);
              setEditRoomInput({
                name: "",
              });
              setShowEditRoom(false);
            });
          }
        });
      }
    });
  }

  function handleSetUser(user) {
    setCurrentUser(user);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditRoomInput((input) => ({ ...input, [name]: value }));
  }

  return (
    <div className="absolute bottom-20 mb-2 left-28">
      {showEditRoom ? (
        <form onSubmit={handleEditRoom}>
          <input
            autoComplete="nope"
            placeholder="enter new room name"
            type="text"
            name="name"
            value={editRoomInput.name}
            onChange={(e) => handleChange(e)}
            className="border-2 border-slate-400 p-1 rounded-lg"
          ></input>
        </form>
      ) : null}
    </div>
  );
}

export default EditRoomForm;
