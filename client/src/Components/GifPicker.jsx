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
      .then((r) => setGifSearchResponse(r.data))(setGifSearch({ gif: "" }));
  }

  function hideGifs() {
    setShowGifs(false);
    setGifSearch({ gif: "" });
  }

  return (
    <div className="  overflow-y-auto">
      <div className=" bg-white "></div>
      <div className=" mx-4 bg-slate-5-- ">
        <form onSubmit={searchGif} className="relative ">
          {/* <label className="mx-2 p-2"> Choose a GIF </label> */}
          <input
            autoComplete="off"
            placeholder="Choose a GIF"
            type="text"
            name="gif"
            value={gifSearch.gif}
            onChange={(e) => handleGifInputChange(e)}
            className="border rounded-lg mx-2 mt-2 p-2 w-64"
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
