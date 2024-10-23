import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

// import custom components
import TrackSearchResult from "./TrackSearchResult";
import "./css/PlayerForm.css";

const spotifyApi = new SpotifyWebApi({
  clientId: "af336f24a30e439b88ed899c0813426a",
});

export default function PlayerForm({
  accessToken,
  addPlayer,
  editPlayerDetails,
  handleModalClose,
}) {
  console.log(
    editPlayerDetails
      ? `Editing player: ${editPlayerDetails.id} ${editPlayerDetails.name}`
      : "New Player"
  );
  const PlayerDetails = {
    id: editPlayerDetails ? editPlayerDetails.id : Date.now(),
    name: editPlayerDetails ? editPlayerDetails.name : "",
    profileImage: editPlayerDetails ? editPlayerDetails.profileImage : null,
    selectedSongs: editPlayerDetails ? editPlayerDetails.selectedSongs : [],
  };

  // set variables present in the form
  const id = PlayerDetails.id;
  const [name, setName] = useState(PlayerDetails.name);
  const [profileImage, setProfileImage] = useState(PlayerDetails.profileImage);
  const [selectedSongs, setSelectedSongs] = useState(
    PlayerDetails.selectedSongs
  );
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");

  // function to handle the submitting button
  const handleSubmit = (e) => {
    if (!profileImage || selectedSongs.length === 0 || !name) {
      alert("Please fill out all details");
      return;
    }
    e.preventDefault();
    const newPlayer = {
      id,
      name,
      profileImage,
      selectedSongs,
    };
    console.log("PLAYER ADDING -> ", newPlayer);
    addPlayer(newPlayer);
    setName("");
    setProfileImage(null);
    setSelectedSongs([]);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Use FileReader to convert the file
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the image URL in state
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  const chooseTrack = (track) => {
    setSelectedSongs((prevSongs) => {
      if (prevSongs.some((t) => t.uri === track.uri)) return prevSongs;
      return [...prevSongs, track];
    });
    setSearch("");
  };
  const noop = () => {
    return;
  };

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
      console.log(res);
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
            albumUrlLarge: track.album.images[1].url
              ? track.album.images[1].url
              : null,
            played: false,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="player-form-container">
      <Button style={{ height: "40px", width: "130px" }} onClick={handleSubmit}>
        Add Player
      </Button>
      <Form onSubmit={handleSubmit} className="add-player-form">
        <Form.Group controlId="formPlayerName" className="form-group">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPlayerProfileImage" className="form-group">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
            required
          />
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}
        </Form.Group>
        <Form.Group controlId="searchString" className="form-group">
          <Form.Control
            type="search"
            placeholder="search songs/artists"
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
        </Form.Group>
      </Form>
      <div className="selectedSongs" style={{ width: "200px" }}>
        <h4 className="selected-tracks">Selected Tracks</h4>
        {selectedSongs.map((track) => (
          <TrackSearchResult track={track} key={track.uri} chooseTrack={noop} />
        ))}
      </div>
    </div>
  );
}
