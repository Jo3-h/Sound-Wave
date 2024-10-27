import React from "react";

import "./css/TrackSearchResult.css";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }
  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        height: "60px",
        marginBottom: "10px",
        borderRadius: "10px",
      }}
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        style={{ height: "60px", width: "60px", borderRadius: "10px" }}
      />
      <div style={{ padding: "5px 10px 5px 10px" }}>
        <div className="track-result">{track.title}</div>
        <div className="artist-result">{track.artist}</div>
      </div>
    </div>
  );
}
