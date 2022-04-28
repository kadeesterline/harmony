import React from "react";
import { useNavigate } from "react-router-dom";
import { useChannelUpdate } from "../Context/ChannelContext";
import { useMemberUpdate } from "../Context/MemberContext";
import { useUser } from "../Context/UserContext";

function RoomButton({ name, id, handleChangeRoom }) {
  let navigate = useNavigate();

  const handleSetChannel = useChannelUpdate();
  const handleSetMember = useMemberUpdate();
  const currentUser = useUser();

  function findMember() {
    let member = currentUser.room_members.filter(
      (member) => member.room_id === id
    );
    handleSetMember(member[0]);
  }

  function handleRoomButtonClick() {
    navigate(`/room/${id}`);
    handleChangeRoom(id);
    handleSetChannel(0);
    findMember();
  }

  return (
    <div
      onClick={handleRoomButtonClick}
      className="m-auto mt-4 w-10 h-10 rounded-full bg-green-1050"
    >
      {name}
    </div>
  );
}

export default RoomButton;
