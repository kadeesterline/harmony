import React from "react";
import { useMember } from "../Context/MemberContext";
import { useChannel } from "../Context/ChannelContext";
import { useState, useEffect } from "react";

import { GrTrash, GrEdit } from "react-icons/gr";
import TipTapReply from "./TipTapReply";

function Reply({ reply, setChannelMessages }) {
  const currentMember = useMember();
  const [showEditReply, setShowEditReply] = useState(false);
  const currentChannel = useChannel();
  const [image, setImage] = useState({});
  const [editReplyInput, setEditReplyInput] = useState({
    content: "",
  });

  useEffect(() => {
    fetch(`/replies/${reply.id}`)
      .then((r) => r.json())
      .then((r) => setImage(r.image));
  }, [currentChannel]);

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

  return (
    <div className="col-span-1 ">
      <div className="bg-slate-200 p-5 w-96 h-100 m-2 rounded-lg">
        <div className="mb-5">
          <TipTapReply
            reply={reply}
            setEditReplyInput={setEditReplyInput}
            handleEditReply={handleEditReply}
          />
        </div>
        {image ? (
          <img src={`http://localhost:3000/${image}`} alt="reply" />
        ) : null}
        {currentMember.id === reply.room_member_id ? (
          <div className="mb-5">
            <button
              className=" mb-4 mx-3 float-right "
              onClick={handleDeleteReply}
            >
              <GrTrash />
            </button>
            <button
              className=" mb-4 mx-3 float-right"
              onClick={toggleShowEditReply}
            >
              <GrEdit />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Reply;
