import React from "react";
import { Container } from "react-bootstrap";
import { useEffect } from "react";

import "./css/PlayingTrackCard.css";

export default function PlayingTrackCard({ number, track, player }) {
  useEffect(() => {
    console.log("Value of Track within PlayingTrackCard -> ", track);
  }, [track]);

  return track ? (
    <div>
      <Container
        className="d-flex flex-row"
        style={{
          border: "2px solid black",
          padding: "0",
          width: "100%",
          aspectRatio: "2.5/1",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            height: "100%",
            aspectRatio: "1/1",
          }}
        >
          <img
            src={track.albumUrlLarge}
            alt="Album Cover"
            style={{
              height: "100%", // Full height of the container
              width: "auto", // Maintain aspect ratio
              maxWidth: "100%", // Ensure it doesn't overflow
              borderRadius: "10px 0 0 10px",
            }}
          />
        </div>
        <div className="track-information-section">
          <div>
            <p className="song-number">Number {number}</p>
            <h4 className="song-title">{track.title}</h4>
            <h5 className="song-artist">{track.artist}</h5>
          </div>
          <p className="song-player">{player}</p>
        </div>
      </Container>
    </div>
  ) : (
    <Container
      className="d-flex flex-row"
      style={{
        backgroundColor: "grey",
        width: "100%",
        aspectRatio: "2.5/1",
      }}
    ></Container>
  );
}
