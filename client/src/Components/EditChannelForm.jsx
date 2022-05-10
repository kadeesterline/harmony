import React from "react";
import { useState } from "react";

function EditChannelForm({
  channel,
  showEditChannel,
  setShowEditChannel,
  setChannelState,
}) {
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
        setShowEditChannel(false);
        setEditChannelInput({
          name: "",
        });
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
        <div className="w-100 absolute left-22 ml-16 ">
          <form onSubmit={handleEditChannel}>
            <input
              autoComplete="nope"
              placeholder="enter new channel name"
              type="text"
              name="name"
              value={editChannelInput.name}
              onChange={(e) => handleChange(e)}
              className="border-2 border-slate-400 p-1 rounded-lg"
            ></input>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default EditChannelForm;
