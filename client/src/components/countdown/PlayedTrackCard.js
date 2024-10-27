import React from "react";

import "./css/PlayedTrackCard.css";

export default function PlayedTrackCard({ track, position }) {
  return (
    <>
      <div className="played-track-container">
        <div className="track-number-container">{position}</div>
        <div className="track-album-cover-container">
          <img className="album-image" src={track.albumUrl} alt="img" />
        </div>
        <div className="track-details-container">
          <h4 className="track-text" style={{ margin: "0" }}>
            {track.title}
          </h4>
          <p className="track-text" style={{ color: "grey", fontSize: "12" }}>
            {track.artist}
          </p>
        </div>
      </div>
    </>
  );
}
