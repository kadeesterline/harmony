import React from "react";
import { useMember } from "../Context/MemberContext";
import { useChannel } from "../Context/ChannelContext";
import { useState, useEffect } from "react";
import Reply from "./Reply";
// import EditMessageForm from "./EditMessageForm";
import { GrTrash, GrAdd, GrDown, GrEdit } from "react-icons/gr";
import { DirectUpload } from "activestorage";
import TipTapMessage from "../Components/TipTapMessage";
import TipTap from "../Components/TipTap";

function Message({ message, setChannelMessages }) {
  const [showReply, setShowReply] = useState(false);
  const [replyInput, setReplyInput] = useState({
    content: "",
    image: "",
  });
  const [showThread, setShowThread] = useState(false);
  // const [showEditMessage, setShowEditMessage] = useState(false);
  const [image, setImage] = useState({});
  // const [gif, setGif] = useState("");
  const [editMessageInput, setEditMessageInput] = useState({
    content: "",
  });

  const [editable, setEditable] = useState(false);

  const currentMember = useMember();
  const currentChannel = useChannel();

  useEffect(() => {
    fetch(`/posts/${message?.id}`)
      .then((r) => r.json())
      .then((r) => setImage(r.image));
  }, [currentChannel, message.id]);

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

  function handleNewReply(e) {
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
    <div className=" flex grid-cols-2 gap-4 items-start w-100 bg-green-1100 border-2 rounded-xl mb-7 p-8">
      <div className="grid grid-cols-1">
        {/* This is the actual message content */}
        <div className="bg-white p-5 w-96 col-span-1 rounded-lg border ">
          <TipTapMessage
            message={message}
            setEditMessageInput={setEditMessageInput}
            handleEditMessage={handleEditMessage}
            editable={editable}
            setEditabel={setEditable}
          />

          {image ? (
            <img src={`http://localhost:3000/${image}`} alt="post" />
          ) : null}

          {message.gif_url ? <img src={message.gif_url} alt="gif" /> : null}
        </div>

        {/* This is the replies */}
        <div
          className={
            showThread
              ? "grid-rows-1 col-span-1  bg-green-1000 p-2 m-2 rounded-lg"
              : "p-2 grid-rows-1 col-span-2  "
          }
        >
          {showThread ? replies : null}
        </div>

        {/* This is the reply tiptap */}
        {showReply ? (
          <div className="col-span-1">
            <TipTap setInputState={setReplyInput} />
            <div className="flex flex-rows-1 items-center">
              <div>
                <form autoComplete="nope" onSubmit={handleNewReply}>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => handleReplyChange(e)}
                    className="custom-file-upload"
                  ></input>
                </form>
              </div>
              <div>
                <button
                  className="mx-3 p-2 bg-green-1050 rounded-full text-2xl"
                  onClick={handleNewReply}
                >
                  <GrAdd />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* This is the button group on the side that should stay on the side  */}
      <div className="col-span-1 grid grid-rows-3">
        {currentMember.id === message.room_member_id ? (
          <div className="row-span-2 grid grid-rows-2">
            <button
              className=" m-2  float-right rounded-full "
              onClick={handleDeleteMessage}
            >
              <GrTrash />
            </button>
            <button
              className="m-2"
              type="button"
              onClick={(event) => setEditable(!editable)}
            >
              <GrEdit />
            </button>
          </div>
        ) : null}
        <div className="row-span-1">
          <button
            className=" m-2   float-right rounded-full "
            onClick={toggleShowThread}
          >
            <GrDown />
          </button>
        </div>
        <div>
          <span className="bg-green-1050 p-1 rounded-full text-white text-xs relative left-5 bottom-10">
            {message.replies.length}
          </span>
        </div>
        <div className="row-span-1">
          <button
            className=" m-2  float-right rounded-full "
            onClick={handleShowReply}
          >
            <GrAdd />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
