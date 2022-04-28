import React from "react";
import { useNavigate } from "react-router-dom";

function RoomButton({ name, id }) {
  let navigate = useNavigate();

  function handleRoomButtonClick() {
    navigate(`/room/${id}`);
  }

  return (
    <div
      onClick={handleRoomButtonClick}
      className="m-auto mt-4 w-10 h-10 rounded-full bg-green-200"
    >
      {name}
    </div>
  );
}

export default RoomButton;
