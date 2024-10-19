import React from "react";
import { Button, Container } from "react-bootstrap";
import "./css/PlayerCard.css";

export default function PlayerCard({
  playerId,
  player,
  editPlayer,
  removePlayer,
}) {
  return (
    <div className="player-card" style={{ width: "30%" }}>
      <img
        src={player.profileImage}
        alt={`${player.name}'s profile`}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <h5>{player.name}</h5>
      <div className="track-list">
        {player.selectedSongs.map((track) => (
          <div key={track.uri} className="d-flex m-2 align-items-center">
            <img
              src={track.albumUrl}
              alt={track.title}
              width={50}
              height={50}
            />
            <div>
              <strong className="track-title">{track.title}</strong> <br />
              <span className="artist-title">{track.artist}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="player-card-buttons">
        <Button variant="outline-secondary" onClick={() => editPlayer(player)}>
          Edit
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => removePlayer(player.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
