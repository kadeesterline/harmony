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
  const setCurrentUser = useUserUpdate();

  const [chatInput, setChatInput] = useState({
    content: "",
    picture: {},
  });

  const [channelMessages, setChannelMessages] = useState({});

  let { id } = useParams();

  function handleSetUser(user) {
    setCurrentUser(user);
  }

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
    console.log(chatInput);
    fetch("/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content: chatInput.content,
        picture: chatInput.image,
        channel_id: currentChannel?.id,
        room_member_id: currentMember?.id,
      }),
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

  const channelPosts = channelMessages?.posts?.map((post) => (
    <Message
      key={post.id + post.content}
      message={post}
      setChannelMessages={setChannelMessages}
    />
  ));

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setChatInput((input) => ({ ...input, [name]: value }));
  // }

  function handleChange(e) {
    if (e.target.name === "image") {
      setChatInput((input) => ({
        ...input,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setChatInput({
        [e.target.name]: e.target.value,
      });
    }
  }

  return (
    <div className="bg-slate-500  left-80 absolute">
      <div className="border-2 border-red-600 w-100 p-10 h-100  absolute">
        <div>{channelPosts}</div>
      </div>

      <div className=" w-96 h-20 bottom-40  fixed bg-green-1000  ">
        <form onSubmit={handleAddPost}>
          <input
            autoComplete="nope"
            type="textarea"
            name="content"
            value={chatInput.content}
            onChange={(e) => handleChange(e)}
            className="border-2 w-full m-5 rounded-lg  h-11"
          ></input>

          <input
            type="file"
            name="image"
            onChange={(e) => handleChange(e)}
            className="border-2 w-full m-5 float-right left-80 rounded-lg h-11"
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Room;
