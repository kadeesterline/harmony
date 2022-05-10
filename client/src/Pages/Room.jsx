import React, { useEffect } from "react";
import { useState } from "react";
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

  const [gifSearchResponse, setGifSearchResponse] = useState([]);
  const [showGifs, setShowGifs] = useState(false);
  const [chatInput, setChatInput] = useState({
    content: "",
    image: {},
  });

  const [channelMessages, setChannelMessages] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`/channels/${currentChannel?.id}`).then((r) => {
      if (r.ok) {
        r.json().then(setChannelMessages);
      }
    });
  }, [currentChannel.id]);

  function handleAddPost(e) {
    e.preventDefault();

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
            r.json().then(
              setChannelMessages,
              setChatInput({
                content: "",
                image: {},
              })
            );
          }
        });
      }
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

  function handleChange(e) {
    if (e.target.name === "image") {
      setChatInput((input) => ({
        ...input,
        [e.target.name]: e.target.files[0],
      }));
    }
  }

  function handleShowModal() {
    setShowModal(!showModal);
  }

  return (
    <div className="room-div left-80 absolute h-100 grid grid-cols-1 ">
      <button
        onClick={handleShowModal}
        className="fixed right-5 top-5 bg-slate-400 rounded-lg p-2 grid grid-cols-1 cursor-pointer"
      >
        <span>channel: {currentChannel?.name}</span>
        <span>room: {channelMessages?.room?.name}</span>
      </button>
      <div id="message-container" className=" fixed  overflow-y-auto ">
        <div className=" px-7 pr-80 ">{channelPosts}</div>

        {showModal ? (
          <div>
            <MemberModal
              setShowModal={setShowModal}
              roomMembers={channelMessages?.room?.room_members}
              setChannelMessages={setChannelMessages}
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

      <div className=" bottom-0 left-80 right-0 fixed  bg-slate-500 chat-bar">
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
              <form onSubmit={handleAddPost} className="ml-10  ">
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
                className="bg-slate-300 rounded-full p-3 text-2xl"
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
