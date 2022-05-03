import React from "react";
import { useState } from "react";

function EditChannelForm({ channel, showEditChannel, setChannelState }) {
  const [editChannelInput, setEditChannelInput] = useState({
    name: "",
  });

  function handleEditChannel(e) {
    e.preventDefault();
    fetch(`/channels/${channel.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editChannelInput),
    }).then((r) => {
      if (r.ok) {
        r.json().then(setChannelState);
      }
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditChannelInput((input) => ({ ...input, [name]: value }));
  }
  return (
    <div>
      {showEditChannel ? (
        <div className="w-100">
          <form onSubmit={handleEditChannel}>
            <input
              autoComplete="nope"
              placeholder="enter new channel name"
              type="text"
              name="name"
              value={editChannelInput.name}
              onChange={(e) => handleChange(e)}
              className="border-2 rounded-lg"
            ></input>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default EditChannelForm;
