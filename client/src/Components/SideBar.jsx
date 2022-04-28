import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser, useUserUpdate } from "../Context/UserContext";
import RoomButton from "./RoomButton";
import AddChannelForm from "./AddChannelForm";
import ChannelButton from "./ChannelButton";

function SideBar() {
  let [showAddChannel, setShowAddChannel] = useState(false);

  let navigate = useNavigate();
  let { id } = useParams();

  const handleSetUser = useUserUpdate();
  const currentUser = useUser();

  const roomButtons =
    currentUser?.rooms?.length > 0 &&
    currentUser?.rooms?.map((room) => (
      <RoomButton key={room.name + room.id} name={room.name} id={room.id} />
    ));

  const currentRoom =
    currentUser?.rooms?.length > 0 &&
    currentUser?.rooms?.forEach((room) => {
      if (room.id === id) {
        return room;
      }
    });
  const channelList = currentRoom?.channels.map((channel) => (
    <ChannelButton key={channel.id + channel.name} channel={channel} />
  ));

  function handleShowAddChannel() {
    setShowAddChannel(!showAddChannel);
  }

  return (
    <div className="w-80 h-full shadow-md bg-green-300 absolute">
      <div className="w-20 h-full shadow-md bg-green-500 absolute">
        {roomButtons}
      </div>

      <div>{channelList}</div>

      <button
        onClick={handleShowAddChannel}
        className="absolute bottom-20 left-20"
      >
        {" "}
        Add Channel{" "}
      </button>

      {showAddChannel ? <AddChannelForm /> : null}

      <div className="w-80 h-20 shadow-md bg-green-700 bottom-0 absolute"></div>
    </div>
  );
}

export default SideBar;
