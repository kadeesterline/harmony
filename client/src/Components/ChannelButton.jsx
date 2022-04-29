import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChannel, useChannelUpdate } from "../Context/ChannelContext";
import { useMember } from "../Context/MemberContext";
import { useUserUpdate } from "../Context/UserContext";
import EditChannelForm from "./EditChannelForm";

function ChannelButton({ channel }) {
  const [showEditChannel, setShowEditChannel] = useState(false);
  const [channelState, setChannelState] = useState({});

  let navigate = useNavigate();

  const handleSetChannel = useChannelUpdate();
  const currentChannel = useChannel();
  const currentMember = useMember();
  const setCurrentUser = useUserUpdate();

  useEffect(() => {
    setChannelState(channel);
  }, []);

  function handleChannelButtonClick() {
    // console.log(channel.id);
    handleSetChannel(channel);
  }
  function handleSetUser(user) {
    setCurrentUser(user);
  }

  function handleDeleteChannel() {
    console.log(channelState.id);
    fetch(`/channels/${channel.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/JSON",
        accept: "application/JSON",
      },
    }).then((r) => {
      if (r.ok) {
        fetch("/autologin").then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              handleSetUser(user);
            });
          }
        });
      }
    });
  }

  function toggleShowEditChannel() {
    setShowEditChannel(!showEditChannel);
  }

  return (
    <div className="flex justify-center">
      <div
        onClick={handleChannelButtonClick}
        className=" mt-4 ml-24 w-1/4 h-10 rounded-lg bg-slate-300"
      >
        {channelState.name}
      </div>
      {currentMember.is_admin ? (
        <div>
          <button
            className="ml-5 mt-4 w-1/4 h-10 rounded-full bg-green-1050"
            onClick={handleDeleteChannel}
          >
            {" "}
            Delete Channel{" "}
          </button>
          <button
            className="ml-5 mt-4 w-1/4 h-10 rounded-full bg-green-1050"
            onClick={toggleShowEditChannel}
          >
            {" "}
            Rename Channel
          </button>
          <EditChannelForm
            channel={channel}
            showEditChannel={showEditChannel}
            setChannelState={setChannelState}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ChannelButton;
