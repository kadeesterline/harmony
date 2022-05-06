import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser, useUserUpdate } from "../Context/UserContext";
import { useChannel, useChannelUpdate } from "../Context/ChannelContext";
import { useMember, useMemberUpdate } from "../Context/MemberContext";
import Message from "../Components/Message";
import { GrAdd, GrFormAttachment } from "react-icons/gr";
import { DirectUpload } from "activestorage";
import GifPicker from "../Components/GifPicker";
import TipTap from "../Components/TipTap";
import GifGrid from "../Components/GifGrid";

function Room() {
  const handleSetChannel = useChannelUpdate();
  const currentChannel = useChannel();
  const setCurrentChannel = useChannelUpdate();
  const currentMember = useMember();
  const setCurrentUser = useUserUpdate();

  const [gifSearchResponse, setGifSearchResponse] = useState([]);
  const [showGifs, setShowGifs] = useState(false);
  const [chatInput, setChatInput] = useState({
    content: "",
    image: {},
  });

  const [channelMessages, setChannelMessages] = useState({});

  let { id } = useParams();

  function handleSetUser(user) {
    setCurrentUser(user);
  }

  useEffect(() => {
    // console.log(currentChannel.id);
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
    } else {
      setChatInput({
        [e.target.name]: e.target.value,
      });
    }
  }

  return (
    <div className="room-div left-80 absolute h-100 grid grid-cols-1 ">
      <div
        id="message-container"
        className="p-10 fixed bottom-52 h-96 overflow-y-auto   "
      >
        <div className="border-2 border-red-700">{channelPosts}</div>
        <div className=" fixed right-0 bottom-52 h-96 overflow-y-auto ">
          <GifGrid
            handleSubmitGif={handleSubmitGif}
            gifSearchResponse={gifSearchResponse}
            showGifs={showGifs}
          />
        </div>
      </div>

      <div className=" bottom-0 right-0 fixed  bg-green-1000 chat-bar ">
        <div className="flex ">
          <TipTap />

          <div className="grid grid-rows-2">
            <GifPicker
              setGifSearchResponse={setGifSearchResponse}
              setShowGifs={setShowGifs}
              showGifs={showGifs}
            />

            <form onSubmit={handleAddPost} className="mx-4 mt-4 ">
              {/* <input
            autoComplete="nope"
            placeholder="Enter a new message"
            type="textarea"
            name="content"
            value={chatInput.content}
            onChange={(e) => handleChange(e)}
            className="border-2  m-5 rounded-lg  h-11"
            id="chat-input"
          ></input> */}

              <input
                type="file"
                name="image"
                onChange={(e) => handleChange(e)}
                className="custom-file-upload"
                id="file-input"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
