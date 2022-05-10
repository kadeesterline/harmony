import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { useChannel } from "../Context/ChannelContext";
import { useMember } from "../Context/MemberContext";

function MemberModal({ setShowModal, roomMembers, setChannelMessages }) {
  const currentChannel = useChannel();
  let { id } = useParams();
  let [room, setRoom] = useState();
  const currentMember = useMember();

  useEffect(() => {
    fetch(`/rooms/${id}`).then((r) => {
      if (r.ok) {
        r.json().then(setRoom);
      }
    });
  }, [id]);

  function handleHideModal() {
    setShowModal(false);
  }

  const memberList = roomMembers?.map((member) =>
    member.is_admin ? (
      <div className="p-1 m-1">Admin: {member?.user?.username}</div>
    ) : (
      <div className="p-1 m-1">
        {member?.user?.username}
        {currentMember.is_admin ? (
          <button
            className="bg-slate-200 rounded-full p-1 m-2"
            onClick={(event) => handleModChange(event, member)}
          >
            {member.is_mod ? "Remove Mod" : "Make Moderator"}
          </button>
        ) : null}
      </div>
    )
  );

  function handleModChange(event, member) {
    member.is_mod
      ? handleRemoveMod(event, member)
      : handleNewModerator(event, member);
  }

  function handleNewModerator(event, member) {
    fetch(`/room_members/${member.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/JSON",
        accept: "application/JSON",
      },
      body: JSON.stringify({ is_mod: true }),
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

  function handleRemoveMod(event, member) {
    fetch(`/room_members/${member.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/JSON",
        accept: "application/JSON",
      },
      body: JSON.stringify({ is_mod: false }),
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
    <div className="rounded-lg">
      <div className=" fixed right-5 top-20 rounded-lg flex  z-50 outline-none focus:outline-none">
        <div className=" w-auto my-6 mx-auto max-w-3xl  rounded-lg">
          {/* content */}
          <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 bg-slate-400 rounded-t-lg">
              <h2 className="text-black float-left text-3xl font-bold">
                Members
              </h2>
              <button
                onClick={handleHideModal}
                className="className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'"
              >
                <FiX />
              </button>
            </div>
            {/* content */}
            <div className="p-5">{memberList}</div>
            <div className="p-5">
              <h3 className="text-xl">Room Code: {room?.room_code}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberModal;
