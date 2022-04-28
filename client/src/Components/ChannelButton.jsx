import React from "react";
import { useNavigate } from "react-router-dom";

function ChannelButton({ channel }) {
  let navigate = useNavigate();

  function handleChannelButtonClick() {
    console.log();
  }

  return (
    <div
      onClick={handleChannelButtonClick}
      className="m-auto mt-4 w-10 h-10 rounded-large bg-green-200"
    >
      {channel.name}
    </div>
  );
}

export default ChannelButton;
