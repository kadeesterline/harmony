import React from "react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

function GifPicker({ setGifSearchResponse, setShowGifs, showGifs }) {
  const [gifSearch, setGifSearch] = useState({});

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

  function hideGifs() {
    setShowGifs(false);
  }

  return (
    <div className="  overflow-y-auto">
      <div className=" bg-white "></div>
      <div className=" mx-4 mb-4 bg-green-1000 flex items-center">
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
