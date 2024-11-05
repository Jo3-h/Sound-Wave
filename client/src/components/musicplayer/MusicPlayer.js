import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

// Import custom functional components
import TrackSearchResult from "../common/TrackSearchResult";

// Import custom style sheets
import "./css/MusicPlayer.css";

const spotifyApi = new SpotifyWebApi({
  clientId: "af336f24a30e439b88ed899c0813426a",
});

export default function MusicPlayer({ accessToken, setPlayingTrack }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) {
      return setSearchResults([]);
    } // if there isn't a value for search then set results to empty array
    if (!accessToken) {
      return;
    }

    // search spotify based on search value
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestImage = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          });
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestImage.url,
          };
        })
      );
      console.log(res);
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="content-container">
      <div className="music-player-container">
        <Form.Control
          type="search"
          placeholder="search songs/artist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
