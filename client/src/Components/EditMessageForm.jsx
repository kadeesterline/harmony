import React from "react";
import { useState } from "react";
import { useChannel } from "../Context/ChannelContext";

function EditMessageForm({ message, showEditMessage, setChannelMessages }) {
  const [editMessageInput, setEditMessageInput] = useState({
    content: "",
  });

  const currentChannel = useChannel();

  function handleEditMessage(e) {
    e.preventDefault();
    fetch(`/posts/${message.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editMessageInput),
    }).then((r) => {
      if (r.ok) {
        fetch(`/channels/${currentChannel?.id}`).then((r) => {
          if (r.ok) {
            r.json().then(setChannelMessages);
          }
        });
      }
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditMessageInput((input) => ({ ...input, [name]: value }));
  }
  return (
    <div>
      {showEditMessage ? (
        <form onSubmit={handleEditMessage}>
          <input
            autoComplete="nope"
            type="text"
            name="content"
            value={editMessageInput.content}
            onChange={(e) => handleChange(e)}
            className="border-2 rounded-lg"
          ></input>
        </form>
      ) : null}
    </div>
  );
}

export default EditMessageForm;
