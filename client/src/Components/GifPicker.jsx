import React from "react";
import { useState } from "react";
import GifGridItem from "./GifGridItem";
import { GrClose } from "react-icons/gr";

function GifPicker({ handleSubmitGif }) {
  const [gifSearch, setGifSearch] = useState({});
  const [gifSearchResponse, setGifSearchResponse] = useState([]);
  const [showGifs, setShowGifs] = useState(false);

  let gifSearchInput = gifSearch.gif;

  function handleGifInputChange(e) {
    const { name, value } = e.target;
    setGifSearch((gifSearch) => ({ ...gifSearch, [name]: value }));
  }

  let giphyApiKey = process.env.REACT_APP_GIPHY_KEY;
  let giphySearchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${gifSearchInput}&limit=20&offset=0&rating=pg&lang=en`;

  function searchGif(event) {
    event.preventDefault();
    setShowGifs(true);
    fetch(giphySearchUrl)
      .then((r) => r.json())
      .then((r) => setGifSearchResponse(r.data));
    //   .then((r) => setImgPath(r.data[0].images.preview_gif.url));
  }

  const gifs = gifSearchResponse?.map((gif) => (
    <GifGridItem
      key={gif.id + gif.url}
      gif={gif}
      handleSubmitGif={handleSubmitGif}
    />
  ));

  function hideGifs() {
    setShowGifs(false);
  }

  return (
    <div className=" h-96 w-96 overflow-y-auto">
      <div className="mb-24">
        {showGifs ? <div className="container">{gifs}</div> : null}
      </div>
      <div className="absolute bottom-0 w-full bg-green-1000 flex items-center">
        <form onSubmit={searchGif} className=" ">
          <label className="m-2 p-2"> Choose a GIF </label>
          <input
            autoComplete="off"
            type="text"
            name="gif"
            value={gifSearch.gif}
            onChange={(e) => handleGifInputChange(e)}
            className="border rounded-lg m-2 p-2"
          ></input>
        </form>
        {showGifs ? (
          <button className="text-xl float-right " onClick={hideGifs}>
            <GrClose />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default GifPicker;
