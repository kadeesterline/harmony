import React from "react";
import { useMember } from "../Context/MemberContext";

function Reply({ reply }) {
  const currentMember = useMember();

  function handleDeleteReply() {
    fetch(`/replies/${reply.id}`, {
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

  return (
    <div className="border-2 border-blue-600">
      {reply.content}
      {currentMember.id === reply.room_member_id ? (
        <button
          className=" m-2 w-10 h-10  rounded-full bg-green-1050"
          onClick={handleDeleteReply}
        >
          {" "}
          Delete{" "}
        </button>
      ) : null}
    </div>
  );
}

export default Reply;
