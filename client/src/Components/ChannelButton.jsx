import React from "react";
import { useNavigate } from "react-router-dom";
import { useChannel, useChannelUpdate } from "../Context/ChannelContext";
import { useMember } from "../Context/MemberContext";

function ChannelButton({ channel }) {
  let navigate = useNavigate();

  const handleSetChannel = useChannelUpdate();
  const currentChannel = useChannel();
  const currentMember = useMember();

  function handleChannelButtonClick() {
    // console.log(channel.id);
    handleSetChannel(channel);
  }

  function handleDeleteChannel() {
    console.log(channel.id);
    fetch(`/channels/${channel.id}`, {
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
    <div className="flex justify-center">
      <div
        onClick={handleChannelButtonClick}
        className=" mt-4 ml-10 w-1/4 h-10 rounded-lg bg-slate-300"
      >
        {channel.name}
      </div>
      {currentMember.is_admin ? (
        <button
          className="ml-5 mt-4 w-1/4 h-10 rounded-full bg-green-1050"
          onClick={handleDeleteChannel}
        >
          {" "}
          Delete Channel{" "}
        </button>
      ) : null}
    </div>
  );
}

export default ChannelButton;
