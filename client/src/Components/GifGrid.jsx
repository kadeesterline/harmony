import React from "react";
import GifGridItem from "./GifGridItem";

function GifGrid({ showGifs, gifSearchResponse, handleSubmitGif }) {
  const gifs = gifSearchResponse?.map((gif) => (
    <GifGridItem
      key={gif.id + gif.url}
      gif={gif}
      handleSubmitGif={handleSubmitGif}
    />
  ));

  return (
    <div className="w-96  ">
      {showGifs ? <div className="container">{gifs}</div> : null}
    </div>
  );
}

export default GifGrid;
