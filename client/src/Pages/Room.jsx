import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser, useUserUpdate } from "../Context/UserContext";
import { useChannel } from "../Context/ChannelContext";
import { useMember } from "../Context/MemberContext";
import Message from "../Components/Message";
import MemberModal from "../Components/MemberModal";

import { GrAdd } from "react-icons/gr";
import { DirectUpload } from "activestorage";
import GifPicker from "../Components/GifPicker";
import TipTap from "../Components/TipTap";
import GifGrid from "../Components/GifGrid";

function Room() {
  // const handleSetChannel = useChannelUpdate();
  const currentChannel = useChannel();
  // const setCurrentChannel = useChannelUpdate();
  const currentMember = useMember();
  const setCurrentUser = useUserUpdate();

  const [gifSearchResponse, setGifSearchResponse] = useState([]);
  const [showGifs, setShowGifs] = useState(false);
  const [chatInput, setChatInput] = useState({
    content: "",
    image: {},
  });

  const [channelMessages, setChannelMessages] = useState({});
  const [showModal, setShowModal] = useState(false);

  let { id } = useParams();

  let roomName = currentChannel?.room?.name;

  function handleSetUser(user) {
    setCurrentUser(user);
  }

  useEffect(() => {
    fetch(`/channels/${currentChannel?.id}`).then((r) => {
      if (r.ok) {
        r.json().then(setChannelMessages);
      }
    });

    // console.log(process.env.REACT_APP_GIPHY_KEY);
  }, [currentChannel.id]);

  let navigate = useNavigate();

  const currentUser = useUser();

  function handleAddPost(e) {
    e.preventDefault();
    // console.log("chatInput content:", chatInput.content);
    // console.log("chatInput image:", chatInput.image);

    let post = {
      content: chatInput.content,
      channel_id: currentChannel?.id,
      room_member_id: currentMember?.id,
    };

    fetch("/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    }).then((r) => {
      if (chatInput.image) {
        r.json().then((data) => uploadFile(chatInput.image, data));
      } else {
        fetch(`/channels/${currentChannel?.id}`).then((r) => {
          if (r.ok) {
            r.json().then(setChannelMessages);
          }
        });
      }

      //   // fetch(`/channels/${currentChannel?.id}`).then((r) => {
      //   //   if (r.ok) {
      //   //     r.json().then("response", console.log);
      //   //   }
      //   // })
      // );
      //}
    });
  }

  function uploadFile(file, post) {
    const upload = new DirectUpload(
      file,
      "http://localhost:3000/rails/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      if (error) {
        console.log(error);
      } else {
        console.log("blob:", blob);
        fetch(`http://localhost:3000/posts/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({ image: blob.signed_id }),
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
    });
  }

  function handleSubmitGif(e, imgPath) {
    e.preventDefault();
    let post = {
      gif_url: imgPath,
      channel_id: currentChannel?.id,
      room_member_id: currentMember?.id,
    };
    console.log(post);
    fetch("/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    }).then((r) => {
      fetch(`/channels/${currentChannel?.id}`).then((r) => {
        if (r.ok) {
          r.json().then(setChannelMessages);
        }
      });
    });
  }

  const channelPosts = channelMessages?.posts?.map((post) => (
    <div className="flex grid-rows-1">
      <Message
        key={post.id + post.content + "post"}
        message={post}
        setChannelMessages={setChannelMessages}
      />
    </div>
  ));

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setChatInput((input) => ({ ...input, [name]: value }));
  // }

  function handleChange(e) {
    if (e.target.name === "image") {
      setChatInput((input) => ({
        ...input,
        [e.target.name]: e.target.files[0],
      }));
    } //else {
    //   setChatInput({
    //     [e.target.name]: e.target.value,
    //   });
    // }
  }

  function handleShowModal() {
    setShowModal(true);
  }

  return (
    <div className="room-div left-80 absolute h-100 grid grid-cols-1 ">
      <div
        onClick={handleShowModal}
        className="fixed right-5 top-5 bg-green-1000 rounded-lg p-2 grid grid-cols-1 hover:cursor-pointer"
      >
        <div>channel: {currentChannel?.name}</div>
        <div>room: {channelMessages?.room?.name}</div>
      </div>
      <div id="message-container" className=" fixed  overflow-y-auto ">
        <div className=" px-7 pr-80 ">{channelPosts}</div>
        {showModal ? (
          <div>
            <MemberModal
              setShowModal={setShowModal}
              roomMembers={channelMessages?.room?.room_members}
            />
          </div>
        ) : null}
        <div className=" fixed right-0 bottom-52 h-96 overflow-y-auto ">
          <GifGrid
            handleSubmitGif={handleSubmitGif}
            gifSearchResponse={gifSearchResponse}
            showGifs={showGifs}
          />
        </div>
      </div>

      <div className=" bottom-0 left-80 right-0 fixed  bg-green-1000 chat-bar ">
        <div className="flex ">
          <TipTap setInputState={setChatInput} />

          <div className="grid grid-cols-1 gap-0 justify-items-center ">
            <div>
              <GifPicker
                setGifSearchResponse={setGifSearchResponse}
                setShowGifs={setShowGifs}
                showGifs={showGifs}
              />
            </div>
            <div>
              <form onSubmit={handleAddPost} className="mx-4  ">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleChange(e)}
                  className="custom-file-upload"
                  id="file-input"
                ></input>
              </form>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                onClick={handleAddPost}
                className="bg-green-1050 rounded-full p-3 text-2xl"
              >
                <GrAdd />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
