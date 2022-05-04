import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser, useUserUpdate } from "../Context/UserContext";
import { useChannel, useChannelUpdate } from "../Context/ChannelContext";
import { useMember, useMemberUpdate } from "../Context/MemberContext";
import Message from "../Components/Message";
import { GrAdd, GrFormAttachment } from "react-icons/gr";
import { DirectUpload } from "activestorage";

function Room() {
  const handleSetChannel = useChannelUpdate();
  const currentChannel = useChannel();
  const setCurrentChannel = useChannelUpdate();
  const currentMember = useMember();
  const setCurrentUser = useUserUpdate();

  const [chatInput, setChatInput] = useState({
    content: "",
    image: {},
  });

  const [channelMessages, setChannelMessages] = useState({});

  let { id } = useParams();

  function handleSetUser(user) {
    setCurrentUser(user);
  }

  useEffect(() => {
    // console.log(currentChannel.id);
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
    // console.log("chatInput content:", chatInput.content);
    // console.log("chatInput image:", chatInput.image);

    let post = {
      content: chatInput.content,
      channel_id: currentChannel?.id,
      room_member_id: currentMember?.id,
    };

    fetch("/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    }).then((r) => {
      if (chatInput.image) {
        r.json().then((data) => uploadFile(chatInput.image, data));
      } else {
        fetch(`/channels/${currentChannel?.id}`).then((r) => {
          if (r.ok) {
            r.json().then(setChannelMessages);
          }
        });
      }

      //   // fetch(`/channels/${currentChannel?.id}`).then((r) => {
      //   //   if (r.ok) {
      //   //     r.json().then("response", console.log);
      //   //   }
      //   // })
      // );
      //}
    });
  }

  function uploadFile(file, post) {
    const upload = new DirectUpload(
      file,
      "http://localhost:3000/rails/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      if (error) {
        console.log(error);
      } else {
        console.log("blob:", blob);
        fetch(`http://localhost:3000/posts/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({ image: blob.signed_id }),
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
    });
  }

  const channelPosts = channelMessages?.posts?.map((post) => (
    <div className="flex grid-rows-1">
      <Message
        key={post.id + post.content + "post"}
        message={post}
        setChannelMessages={setChannelMessages}
      />
    </div>
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
    <div className="left-80 absolute">
      <div id="message-container" className="p-10 w-100 overflow-auto absolute">
        <div>{channelPosts}</div>
      </div>

      <div className="w-100 h-20 bottom-0 fixed bg-green-1000  ">
        <form onSubmit={handleAddPost} className="grid grid-cols-2 ">
          <input
            autoComplete="nope"
            placeholder="Enter a new message"
            type="textarea"
            name="content"
            value={chatInput.content}
            onChange={(e) => handleChange(e)}
            className="border-2  m-5 rounded-lg  h-11"
            id="chat-input"
          ></input>

          <input
            type="file"
            name="image"
            onChange={(e) => handleChange(e)}
            className="custom-file-upload"
            id="file-input"
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Room;
