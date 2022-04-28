import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser, useUserUpdate } from "../Context/UserContext";
import { useChannel, useChannelUpdate } from "../Context/ChannelContext";
import { useMember, useMemberUpdate } from "../Context/MemberContext";
import Message from "../Components/Message";

function Room() {
  const handleSetChannel = useChannelUpdate();
  const currentChannel = useChannel();
  const currentMember = useMember();

  const [chatInput, setChatInput] = useState({
    content: "",
  });

  const [channelMessages, setChannelMessages] = useState({});

  let { id } = useParams();

  useEffect(() => {
    console.log(currentChannel.id);
    fetch(`/channels/${currentChannel?.id}`).then((r) => {
      if (r.ok) {
        r.json().then(setChannelMessages);
      }
    });
  }, [currentChannel.id]);

  let navigate = useNavigate();

  const currentUser = useUser();

  function handleAddPost(e) {
    e.preventDefault();

    fetch("/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content: chatInput.content,
        channel_id: currentChannel?.id,
        room_member_id: currentMember?.id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newMessage) => {
          setChannelMessages([...channelMessages, newMessage]);
        });
        console.log("channelMessages:", channelMessages);
      }
    });
  }

  const channelPosts = channelMessages?.posts?.map((post) => (
    <Message key={post.id + post.content} message={post} />
  ));

  function handleChange(e) {
    const { name, value } = e.target;
    setChatInput((input) => ({ ...input, [name]: value }));
  }

  return (
    <div className="bg-slate-500  left-80 absolute">
      <div className="border-2 border-red-600 w-100 p-10 h-100  absolute">
        <div>{channelPosts}</div>
      </div>

      <div className=" w-96 h-20 bottom-0  fixed bg-green-1000  ">
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
