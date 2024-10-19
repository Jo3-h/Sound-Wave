import React from "react";
import { useState } from "react";
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
    const isUpdate = players.some((player) => player.id === newPlayer.id);

    if (!isUpdate) {
      console.log("Update player -> ", newPlayer);
      setPlayers(
        players.map((player) =>
          player.id === newPlayer.id ? newPlayer : player
        )
      );
    } else {
      console.log("Add New Player -> ", newPlayer);
      setPlayers([...players, newPlayer]);
    }
    setEditPlayerDetails(null);
    setShowModal(false);
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
    <Container
      className="justify-content-center align-items-top py-50"
      style={{
        width: "70%",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {!isGameStarted ? (
        <div className="position-relative top-20 start-20 m-2">
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
          <div className="mt-4">
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
      ) : (
        <Hottest100Countdown players={players} />
      )}
    </Container>
  );
}
