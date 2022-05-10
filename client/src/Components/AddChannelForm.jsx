import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserUpdate } from "../Context/UserContext";

function AddChannelForm({ setShowAddChannel }) {
  let { id } = useParams();
  const setCurrentUser = useUserUpdate();

  const [channelFormInput, setChannelFormInput] = useState({
    name: "",
    room_id: parseInt(id),
  });

  function handleSetUser(user) {
    setCurrentUser(user);
  }

  function handleAddChannel(e) {
    e.preventDefault();

    fetch("/channels", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(channelFormInput),
    }).then((r) => {
      if (r.ok) {
        fetch("/autologin").then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              handleSetUser(user);
            });
            setChannelFormInput({
              channel_name: "",
              room_id: parseInt(id),
            });
            setShowAddChannel(false);
          }
        });
      }
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setChannelFormInput((input) => ({ ...input, [name]: value }));
  }

  return (
    <div className="absolute  left-56 top-16 mt-2">
      <form onSubmit={handleAddChannel}>
        <input
          autoComplete="none"
          placeholder="channel name"
          type="text"
          name="name"
          value={channelFormInput.channel_name}
          onChange={(e) => handleChange(e)}
          className="border-2 border-slate-400 rounded-lg p-1"
        ></input>
      </form>
    </div>
  );
}

export default AddChannelForm;
