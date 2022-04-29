import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser, useUserUpdate } from "../Context/UserContext";
import { useMember, useMemberUpdate } from "../Context/MemberContext";
import RoomButton from "./RoomButton";
import AddChannelForm from "./AddChannelForm";
import ChannelButton from "./ChannelButton";
import EditRoomForm from "./EditRoomForm";

function SideBar() {
  let [showAddChannel, setShowAddChannel] = useState(false);
  let [showEditRoom, setShowEditRoom] = useState(false);
  let [currentRoom, setCurrentRoom] = useState([]);

  let navigate = useNavigate();
  let { id } = useParams();

  const handleSetUser = useUserUpdate();
  const currentUser = useUser();

  const handleSetMember = useMemberUpdate();
  const currentMember = useMember();

  useEffect(() => {
    setCurrentRoom(
      currentUser?.rooms?.filter((room) => room?.id === parseInt(id))
    );
  }, [currentUser, id]);

  const roomButtons =
    currentUser?.rooms?.length > 0 &&
    currentUser?.rooms?.map((room) =>
      room?.name ? (
        <RoomButton
          key={room?.name + room?.id}
          name={room?.name}
          id={room?.id}
          handleChangeRoom={handleChangeRoom}
        />
      ) : null
    );

  function handleChangeRoom(id) {
    let newRoom = currentUser?.rooms?.filter((room) => room?.id === id);
    setCurrentRoom(newRoom);
  }

  const channelList = currentRoom?.map((r) =>
    r.channels?.map((channel) => (
      <ChannelButton key={channel.id + channel.name} channel={channel} />
    ))
  );

  function handleShowAddChannel() {
    console.log("Current room:", currentRoom);
    setShowAddChannel(!showAddChannel);
  }

  function toggleShowEditRoom() {
    setShowEditRoom(!showEditRoom);
  }

  function handleDeleteRoom(event) {
    event.preventDefault();
    fetch(`/rooms/${id}`, {
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

  return (
    <div className="w-80 h-full shadow-md bg-green-950 absolute">
      <div className="w-20 h-full shadow-md bg-green-1000 absolute">
        {roomButtons}
        <div className="m-auto mt-4">
          {currentMember.is_admin ? (
            <button
              className=" w-10 h-10 rounded-full bg-green-1050"
              onClick={handleDeleteRoom}
            >
              {" "}
              Delete Room{" "}
            </button>
          ) : null}
        </div>
      </div>

      <div>{channelList}</div>

      {currentMember.is_admin ? (
        <div>
          <button
            className="absolute bottom-32 left-20 bg-green-1050 p-2 m-2 rounded-full"
            onClick={toggleShowEditRoom}
          >
            {" "}
            Rename Room{" "}
          </button>
          <EditRoomForm showEditRoom={showEditRoom} />
        </div>
      ) : null}

      <button
        onClick={handleShowAddChannel}
        className="absolute bottom-20 left-20 bg-green-1050 p-2 m-2 rounded-full"
      >
        {" "}
        Add Channel{" "}
      </button>

      {showAddChannel ? <AddChannelForm /> : null}

      <div className="w-80 h-20 shadow-md bg-green-1050 bottom-0 absolute">
        {currentUser.username}
      </div>
    </div>
  );
}

export default SideBar;
