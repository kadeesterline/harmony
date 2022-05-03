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

  const firstLetters = name
    .toUpperCase()
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <button
      onClick={handleRoomButtonClick}
      className="m-auto mt-4 w-16 h-16 rounded-full bg-green-1050 flex justify-center items-center "
    >
      {firstLetters}
    </button>
  );
}

export default RoomButton;
