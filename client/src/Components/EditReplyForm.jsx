import React from "react";
import { useState } from "react";
import { useChannel } from "../Context/ChannelContext";

function EditReplyForm({ reply, showEditReply, setChannelMessages }) {
  const [editReplyInput, setEditReplyInput] = useState({
    content: "",
  });

  const currentChannel = useChannel();

  function handleEditReply(e) {
    e.preventDefault();
    fetch(`/replies/${reply.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editReplyInput),
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
    setEditReplyInput((input) => ({ ...input, [name]: value }));
  }

  return (
    <div>
      {showEditReply ? (
        <form onSubmit={handleEditReply}>
          <input
            autoComplete="nope"
            placeholder="enter new reply"
            type="text"
            name="content"
            value={editReplyInput.content}
            onChange={(e) => handleChange(e)}
            className="border-2 rounded-lg w-96"
          ></input>
        </form>
      ) : null}
    </div>
  );
}

export default EditReplyForm;
