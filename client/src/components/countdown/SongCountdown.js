import React from "react";
import { useState, useEffect } from "react";
import { Container, Button, Modal, ModalBody } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

// import custom components
import PlayerCard from "./PlayerCard";
import Hottest100Countdown from "./Hottest100Countdown";
import ImportPlaylistModal from "./ImportPlaylistModal";
import AddPlayerModal from "./AddPlayerModal";
import "./css/SongCountdown.css";

const spotifyApi = new SpotifyWebApi({
  clientId: "af336f24a30e439b88ed899c0813426a",
});

export default function SongCountdown({
  accessToken,
  setPlayingTrack,
  playerRef,
}) {
  const [players, setPlayers] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [editPlayerDetails, setEditPlayerDetails] = useState(null);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const addPlayer = (newPlayer) => {
    setPlayers((prevPlayers) => {
      const isUpdate = prevPlayers.some((player) => player.id === newPlayer.id);

      if (isUpdate) {
        console.log("Updating player");
        return prevPlayers.map((player) =>
          player.id === newPlayer.id ? newPlayer : player
        );
      } else {
        console.log("Adding new player");
        console.log("players -> ", players);
        return [...prevPlayers, newPlayer];
      }
    });

    setEditPlayerDetails(null);
    setShowModal("");
  };
  const editPlayer = (updatedPlayer) => {
    setEditPlayerDetails(updatedPlayer);
    setShowModal("AddPlayerModal");
  };
  const removePlayer = (PlayerId) => {
    setPlayers(players.filter((player) => player.id !== PlayerId));
  };
  const startCountdown = () => {
    setIsGameStarted(true);
  };
  const handleModalOpen = () => {
    setShowModal("AddPlayerModal");
  };
  const handleModalClose = () => {
    setEditPlayerDetails(null);
    setShowModal("");
  };
  const handleImportPlaylistModalOpen = () => {
    setShowModal("ImportPlaylistModal");
  };
  const handleImportPlaylist = (playlist) => {
    console.log("importing playlist -> ", playlist);
    axios
      .get("http://localhost:3001/spotify/import-countdown-playlist", {
        params: {
          accessToken: accessToken,
          playlistId: playlist.id,
        },
      })
      .then((res) => {
        setPlayers(res.data.players);
        setShowModal("");
      })
      .catch((error) => {
        console.error("Failed to import playlist -> ", error);
      });
  };

  useEffect(() => {
    console.log("Update in Players Array -> ", players);
  }, [players]);

  return (
    <div className="content-container">
      {showModal !== "" ? (
        showModal === "AddPlayerModal" ? (
          <AddPlayerModal
            showModal={showModal}
            handleModalClose={handleModalClose}
            addPlayer={addPlayer}
            accessToken={accessToken}
            editPlayerDetails={editPlayerDetails}
          />
        ) : (
          <ImportPlaylistModal
            showModal={showModal}
            handleImportPlaylist={handleImportPlaylist}
            handleModalClose={handleModalClose}
            accessToken={accessToken}
          />
        )
      ) : (
        <>
          {!isGameStarted ? (
            <Container
              className="justify-content-center align-items-top py-50"
              style={{
                width: "70%",
                height: "auto",
                backgroundColor: "#f8f9fa",
                marginBottom: "130px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "10px",
              }}
            >
              <div className="position-relative top-20 start-20 mt-20">
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={handleModalOpen}>
                    Add Player
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleImportPlaylistModalOpen}
                  >
                    Import Playlist
                  </Button>
                  <Button variant="danger" onClick={startCountdown}>
                    Start Countdown
                  </Button>
                </div>
                <div className="grid-container mt-4">
                  {players.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      editPlayer={editPlayer}
                      removePlayer={removePlayer}
                    />
                  ))}
                </div>
              </div>
            </Container>
          ) : (
            <Hottest100Countdown
              accessToken={accessToken}
              players={players}
              setPlayingTrack={setPlayingTrack}
              playerRef={playerRef}
            />
          )}
        </>
      )}
    </div>
  );
}
