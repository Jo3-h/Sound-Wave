import React from "react";
import { Button } from "react-bootstrap";
import "./css/PlayerCard.css";

export default function PlayerCard({
  playerId,
  player,
  editPlayer,
  removePlayer,
}) {
  return (
    <div className="player-card">
      <div className="player-card-player" style={{ display: "flex" }}>
        <img
          className="profile-image"
          src={player.profileImage}
          alt={`${player.name}'s profile`}
        />
        <div
          style={{
            height: "100px",
            width: "130px",
            padding: "20px",
            alignContent: "center",
          }}
        >
          <h5 style={{ fontWeight: "bold", fontSize: "larger" }}>
            {player.name}
          </h5>
        </div>
      </div>

      <div className="track-list">
        {player.selectedSongs.map((track) => (
          <div key={track.uri} className="song-card">
            <img
              className="album-image"
              src={track.albumUrl}
              alt={track.title}
              width={50}
              height={50}
            />
            <div className="text-content">
              <div className="flex">
                <div className="track-title">{track.title}</div>
              </div>

              <div className="artist-title">{track.artist}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto d-flex justify-content-between">
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
