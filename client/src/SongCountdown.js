import React from "react";
import { useState, useEffect } from "react";
import { Container, Button, Modal, ModalBody } from "react-bootstrap";

// import custom compenents
import PlayerCard from "./PlayerCard";
import PlayerForm from "./PlayerForm";
import Hottest100Countdown from "./Hottest100Countdown";
import "./css/SongCountdown.css";

export default function SongCountdown({ accessToken, setPlayingTrack }) {
  const [players, setPlayers] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editPlayerDetails, setEditPlayerDetails] = useState(null);

  const addPlayer = (newPlayer) => {
    console.log("Current Players -> ", players);
    console.log("Player to add -> ", newPlayer);

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
    handleModalClose();
  };
  const editPlayer = (updatedPlayer) => {
    setEditPlayerDetails(updatedPlayer);
    setShowModal(true);
  };
  const removePlayer = (PlayerId) => {
    setPlayers(players.filter((player) => player.id !== PlayerId));
  };
  const startCountdown = () => {
    setIsGameStarted(true);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleImportPlaylist = () => {};

  useEffect(() => {
    console.log("Update in Players Array -> ", players);
  }, [players]);

  return showModal ? (
    <Modal
      className="modal-content"
      show={showModal}
      onHide={handleModalClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Player</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <PlayerForm
          addPlayer={addPlayer}
          accessToken={accessToken}
          editPlayerDetails={editPlayerDetails}
        />
      </ModalBody>
    </Modal>
  ) : (
    <div
      className="wrapper"
      style={{
        width: "100%",
        height: "auto",
        padding: "20px",
        marginBottom: "110px",
      }}
    >
      {!isGameStarted ? (
        <Container
          className="justify-content-center align-items-top py-50"
          style={{
            width: "70%",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
            marginBottom: "130px",
            marginTop: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <div className="position-relative top-20 start-20 mt-20">
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={handleModalOpen}>
                Add Player
              </Button>
              <Button variant="secondary" onClick={handleImportPlaylist}>
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
        />
      )}
    </div>
  );
}
