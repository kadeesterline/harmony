import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser, useUserUpdate } from "../Context/UserContext";
import { useMember } from "../Context/MemberContext";

import RoomButton from "./RoomButton";
import AddChannelForm from "./AddChannelForm";
import ChannelButton from "./ChannelButton";
import EditRoomForm from "./EditRoomForm";
import { GrTrash, GrAdd, GrEdit } from "react-icons/gr";
import { GoSignOut } from "react-icons/go";

function SideBar() {
  let [showAddChannel, setShowAddChannel] = useState(false);
  let [showEditRoom, setShowEditRoom] = useState(false);
  let [currentRoom, setCurrentRoom] = useState([]);

  let navigate = useNavigate();
  let { id } = useParams();

  const handleSetUser = useUserUpdate();
  const currentUser = useUser();

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
      <ChannelButton
        key={channel.id + channel.name + channel}
        channel={channel}
      />
    ))
  );

  function handleShowAddChannel() {
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

  function handleSignOut() {
    fetch(`/logout`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    }).then(navigate("/"));
  }

  return (
    <div className="w-80 h-full shadow-md bg-slate-500 fixed left-0 border-r border-slate-700">
      <div className="w-20 h-full shadow-md bg-slate-700 absolute">
        {roomButtons}
        <div className="mt-4">
          {currentMember.is_admin ? (
            <button
              className="m-auto w-16 h-16 rounded-full bg-slate-300 text-2xl flex justify-center items-center"
              onClick={handleDeleteRoom}
            >
              <GrTrash />
            </button>
          ) : null}
          <Link
            to="/new"
            className="m-auto w-16 h-16 mt-4 rounded-full bg-slate-300 text-2xl flex justify-center items-center"
          >
            <GrAdd />
          </Link>
        </div>
      </div>

      <div className="">
        {currentRoom?.name}
        {channelList}
        {currentMember.is_admin ? (
          <button
            onClick={handleShowAddChannel}
            className="absolute text-2xl bg-slate-300 mt-4 ml-44 p-2 rounded-full"
          >
            <GrAdd />
          </button>
        ) : null}

        {showAddChannel ? (
          <AddChannelForm setShowAddChannel={setShowAddChannel} />
        ) : null}
      </div>

      {currentMember.is_admin ? (
        <div className="">
          <button
            className="absolute bottom-32 text-2xl left-20 bg-slate-300 p-2 ml-24 rounded-full"
            onClick={toggleShowEditRoom}
          >
            <GrEdit />
          </button>
          <EditRoomForm
            showEditRoom={showEditRoom}
            setShowEditRoom={setShowEditRoom}
          />
        </div>
      ) : null}

      <div className="w-80 h-20 shadow-md bg-slate-600 bottom-0 absolute flex justify-center items-center text-2xl text-white">
        {currentUser.username}
        <button
          className="bg-slate-300 p-3  mx-5 rounded-full text-3xl text-black"
          onClick={handleSignOut}
        >
          <GoSignOut />
        </button>
      </div>
    </div>
  );
}

export default SideBar;
