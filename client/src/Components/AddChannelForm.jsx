import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function AddChannelForm() {
  let { id } = useParams();

  const [channelFormInput, setChannelFormInput] = useState({
    name: "",
    room_id: parseInt(id),
  });

  function handleAddChannel(e) {
    e.preventDefault();
    console.log(channelFormInput);
    fetch("/channels", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(channelFormInput),
    }).then((r) => {
      if (r.ok) {
        r.json();
      }
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setChannelFormInput((input) => ({ ...input, [name]: value }));
  }

  return (
    <div className="absolute bottom-20 left-52">
      <form onSubmit={handleAddChannel}>
        <input
          autoComplete="none"
          type="text"
          name="name"
          value={channelFormInput.channel_name}
          onChange={(e) => handleChange(e)}
          className="border-2 rounded-lg"
        ></input>
      </form>
    </div>
  );
}

export default AddChannelForm;
