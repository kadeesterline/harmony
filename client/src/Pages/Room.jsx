import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser, useUserUpdate } from "../Context/UserContext";
import ChannelList from "../Components/ChannelList";

function Room() {
  const [chatInput, setChatInput] = useState({
    content: "",
  });

  let navigate = useNavigate();
  let { id } = useParams();

  const currentUser = useUser();

  function handleAddPost(e) {
    e.preventDefault();
    fetch("/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(chatInput),
    }).then((r) => {
      if (r.ok) {
        r.json();
      }
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setChatInput((input) => ({ ...input, [name]: value }));
  }

  return (
    <div className="bg-slate-200  left-80 absolute">
      ROOM{id}
      <ChannelList />
      <div className="fixed w-screen h-20 bottom-0 bg-green-400  ">
        <form onSubmit={handleAddPost}>
          <input
            autoComplete="nope"
            type="textarea"
            name="content"
            value={chatInput.content}
            onChange={(e) => handleChange(e)}
            className="border-2 w-full m-5 rounded-lg  h-11"
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Room;
