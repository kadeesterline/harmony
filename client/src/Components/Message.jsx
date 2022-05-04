import React from "react";
import { useMember } from "../Context/MemberContext";
import { useChannel } from "../Context/ChannelContext";
import { useState, useEffect } from "react";
import Reply from "./Reply";
import EditMessageForm from "./EditMessageForm";
import { GrTrash, GrEdit, GrAdd, GrDown } from "react-icons/gr";
import { DirectUpload } from "activestorage";

function Message({ message, setChannelMessages }) {
  const [showReply, setShowReply] = useState(false);
  const [replyInput, setReplyInput] = useState({
    content: "",
    image: "",
  });
  const [showThread, setShowThread] = useState(false);
  const [showEditMessage, setShowEditMessage] = useState(false);
  const [image, setImage] = useState({});
  const currentMember = useMember();
  const currentChannel = useChannel();

  useEffect(() => {
    fetch(`/posts/${message.id}`)
      .then((r) => r.json())
      .then((r) => setImage(r.image));
  }, [currentChannel]);

  function handleDeleteMessage() {
    fetch(`/posts/${message.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/JSON",
        accept: "application/JSON",
      },
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

  function handleShowReply() {
    setShowReply(!showReply);
  }

  function toggleShowThread() {
    setShowThread(!showThread);
  }

  function toggleShowEditMessage() {
    setShowEditMessage(!showEditMessage);
  }

  function handleNewReply(e) {
    //console.log(replyInput.content);
    e.preventDefault();

    //create object to send
    let reply = {
      content: replyInput.content,
      channel_id: currentChannel?.id,
      room_member_id: currentMember?.id,
      post_id: message.id,
    };

    fetch("/replies", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reply),
    }).then((r) => {
      if (replyInput.image) {
        r.json().then((data) => uploadFile(replyInput.image, data));
      } else {
        fetch(`/channels/${currentChannel?.id}`).then((r) => {
          if (r.ok) {
            r.json().then(setChannelMessages);
          }
        });
      }
      // if (r.ok) {
      //   fetch(`/channels/${currentChannel?.id}`).then((r) => {
      //     if (r.ok) {
      //       r.json().then(setChannelMessages);
      //     }
      //   });
      // }
    });
  }

  function uploadFile(file, reply) {
    const upload = new DirectUpload(
      file,
      "http://localhost:3000/rails/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      if (error) {
        console.log(error);
      } else {
        console.log("blob", blob);
        fetch(`http://localhost:3000/replies/${reply.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({ image: blob.signed_id }),
        }).then((r) => {
          fetch(`/channels/${currentChannel?.id}`).then((r) => {
            if (r.ok) {
              r.json().then(setChannelMessages);
            }
          });
        });
      }
    });
  }

  function handleReplyChange(e) {
    if (e.target.name === "image") {
      setReplyInput((input) => ({
        ...input,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setReplyInput({
        [e.target.name]: e.target.value,
      });
    }
  }

  const replies = message?.replies?.map((reply) => (
    <div className="flex grid-cols-1 ">
      <Reply
        key={reply.id + reply.content}
        reply={reply}
        setChannelMessages={setChannelMessages}
      />
    </div>
  ));

  return (
    <div className=" flex grid-cols-2 gap-4 items-start w-100 bg-green-1100 border-2 rounded-xl mt-2 mb-5 p-8">
      <div className="bg-white p-5 w-96 col-span-1 rounded-lg border ">
        {message.content}
        {image ? (
          <img src={`http://localhost:3000/${image}`} alt="post" />
        ) : null}
      </div>

      <div
        className={
          showThread
            ? "grid-rows-1 col-span-1  bg-green-1000 p-2 rounded-lg"
            : "p-2 grid-rows-1 col-span-2  "
        }
      >
        {showThread ? replies : null}
      </div>

      <div>
        {currentMember.id === message.room_member_id ? (
          <div>
            <button
              className=" m-2 float-right rounded-full "
              onClick={toggleShowEditMessage}
            >
              <GrEdit />
            </button>
            <EditMessageForm
              showEditMessage={showEditMessage}
              message={message}
              setChannelMessages={setChannelMessages}
            />
            <button
              className=" m-2  float-right rounded-full "
              onClick={handleDeleteMessage}
            >
              <GrTrash />
            </button>
          </div>
        ) : null}
        <button
          className=" m-2   float-right rounded-full "
          onClick={toggleShowThread}
        >
          <GrDown />
        </button>
        <button
          className=" m-2  float-right rounded-full "
          onClick={handleShowReply}
        >
          <GrAdd />
        </button>
        {showReply ? (
          <form autoComplete="nope" onSubmit={handleNewReply}>
            <input
              autoComplete="nope"
              placeholder="enter reply"
              type="text-area"
              name="content"
              value={replyInput.content}
              onChange={(e) => handleReplyChange(e)}
              className="border-2 rounded-lg my-2 w-96"
            ></input>
            <input
              type="file"
              name="image"
              onChange={(e) => handleReplyChange(e)}
              className="custom-file-upload"
            ></input>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default Message;
