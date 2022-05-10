import React, { useEffect } from "react";
import { useState } from "react";
import { useChannelUpdate } from "../Context/ChannelContext";
import { useMember } from "../Context/MemberContext";
import { useUserUpdate } from "../Context/UserContext";
import EditChannelForm from "./EditChannelForm";
import { GrTrash, GrEdit } from "react-icons/gr";

function ChannelButton({ channel }) {
  const [showEditChannel, setShowEditChannel] = useState(false);
  const [channelState, setChannelState] = useState({});

  const handleSetChannel = useChannelUpdate();

  const currentMember = useMember();
  const setCurrentUser = useUserUpdate();

  useEffect(() => {
    setChannelState(channel);
  }, [channel]);

  function handleChannelButtonClick() {
    handleSetChannel(channel);
  }
  function handleSetUser(user) {
    setCurrentUser(user);
  }

  function handleDeleteChannel() {
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
    <div className="flex justify-center mr-3 ">
      <div className="flex items-center  mt-4 p-2 ml-24 w-3/4 h-10 rounded-lg bg-slate-300">
        <div onClick={handleChannelButtonClick} className="float-left">
          {channelState.name}
        </div>

        {currentMember.is_admin ? (
          <div className="right-2 absolute">
            <button
              className=" float-right text-xl mx-2 "
              onClick={handleDeleteChannel}
            >
              <GrTrash />
            </button>
            <button
              className=" float-right text-xl  mx-1  "
              onClick={toggleShowEditChannel}
            >
              <GrEdit />
            </button>
            <EditChannelForm
              channel={channel}
              showEditChannel={showEditChannel}
              setShowEditChannel={setShowEditChannel}
              setChannelState={setChannelState}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ChannelButton;
