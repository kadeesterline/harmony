import React from "react";
import { useState, useEffect } from "react";
import { useChannel, useChannelUpdate } from "../Context/ChannelContext";
import { useMember } from "../Context/MemberContext";

function GifGridItem({ gif, handleSubmitGif }) {
  const [imgPath, setImgPath] = useState("");
  const handleSetChannel = useChannelUpdate();
  const currentChannel = useChannel();
  const currentMember = useMember();

  useEffect(() => {
    setImgPath(gif.images.fixed_width.url);
  });

  return (
    <div className="m-0 p-0 item">
      <img
        src={imgPath}
        alt="gif"
        onClick={(e) => handleSubmitGif(e, imgPath)}
      />
    </div>
  );
}

export default GifGridItem;
