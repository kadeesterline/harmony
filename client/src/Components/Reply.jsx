import React from "react";
import { useMember } from "../Context/MemberContext";
import { useChannel } from "../Context/ChannelContext";
import { useState } from "react";
import EditReplyForm from "./EditReplyForm";

function Reply({ reply, setChannelMessages }) {
  const currentMember = useMember();
  const [showEditReply, setShowEditReply] = useState(false);
  const currentChannel = useChannel();

  function handleDeleteReply() {
    fetch(`/replies/${reply.id}`, {
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

  function toggleShowEditReply() {
    setShowEditReply(!showEditReply);
  }

  return (
    <div className="border-2 border-blue-600">
      {reply.content}
      {currentMember.id === reply.room_member_id ? (
        <div>
          <button
            className=" m-2 w-10 h-10  rounded-full bg-green-1050"
            onClick={handleDeleteReply}
          >
            {" "}
            Delete{" "}
          </button>
          <button
            className=" m-2 w-10 h-10  rounded-full bg-green-1050"
            onClick={toggleShowEditReply}
          >
            {" "}
            Edit Reply{" "}
          </button>
          <EditReplyForm
            showEditReply={showEditReply}
            reply={reply}
            setChannelMessages={setChannelMessages}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Reply;
