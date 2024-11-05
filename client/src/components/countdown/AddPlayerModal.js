import React from "react";
import { Container, Button, Modal, ModalBody } from "react-bootstrap";

// import custom components
import PlayerForm from "./PlayerForm";

export default function AddPlayerModal({
  showModal,
  handleModalClose,
  addPlayer,
  accessToken,
  editPlayerDetails,
}) {
  return (
    <Modal
      className="custom-modal"
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
  );
}
