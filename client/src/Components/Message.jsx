import React from "react";
import { useMember } from "../Context/MemberContext";
import { useChannel } from "../Context/ChannelContext";
import { useState } from "react";
import Reply from "./Reply";

function Message({ message }) {
  const [showReply, setShowReply] = useState(false);
  const [replyInput, setReplyInput] = useState({
    content: "",
  });
  const [showThread, setShowThread] = useState(false);
  const currentMember = useMember();
  const currentChannel = useChannel();

  function handleDeleteMessage() {
    fetch(`/posts/${message.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/JSON",
        accept: "application/JSON",
      },
    }).then((r) => {
      if (r.ok) {
        console.log(r);
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
    console.log(replyInput.content);
    e.preventDefault();
    fetch("/replies", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content: replyInput.content,
        channel_id: currentChannel?.id,
        room_member_id: currentMember?.id,
        post_id: message.id,
      }),
    }).then((r) => {
      if (r.ok) {
        console.log(r);
      }
    });
  }

  function handleReplyChange(e) {
    const { name, value } = e.target;
    setReplyInput((input) => ({ ...input, [name]: value }));
  }

  const replies = message?.replies?.map((reply) => (
    <Reply key={reply.id + reply.content} reply={reply} />
  ));

  return (
    <div className="w-96 bg-slate-200 border-2 border-black m-2 p-8">
      {message.content}
      {showThread ? replies : null}
      {currentMember.id === message.room_member_id ? (
        <button
          className=" m-2 w-10 h-10 float-right rounded-full bg-green-1050"
          onClick={handleDeleteMessage}
        >
          {" "}
          Delete Message{" "}
        </button>
      ) : null}
      <button
        className=" m-2  w-10 h-10 float-right rounded-full bg-green-1050"
        onClick={toggleShowThread}
      >
        {showThread ? "Hide Replies" : `Show ${message.replies.length}Replies`}
      </button>
      <button
        className=" m-2 w-10 h-10 float-right rounded-full bg-green-1050"
        onClick={handleShowReply}
      >
        {" "}
        {showReply ? "Hide" : "Reply"}{" "}
      </button>
      {showReply ? (
        <form autoComplete="nope" onSubmit={handleNewReply}>
          <input
            autoComplete="nope"
            type="text-area"
            name="content"
            value={replyInput.content}
            onChange={(e) => handleReplyChange(e)}
          ></input>
        </form>
      ) : null}
    </div>
  );
}

export default Message;
