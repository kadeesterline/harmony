import React from "react";
import { useState, useEffect } from "react";

function GifGridItem({ gif, handleSubmitGif }) {
  const [imgPath, setImgPath] = useState("");

  useEffect(() => {
    setImgPath(gif.images.fixed_width.url);
  }, [gif]);

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
