import React from "react";
import { useEffect } from "react";

// import custom styling
import "./css/TopTrackCard.css";
import playButton from "./assets/play-button.png";

export default function TopTrackCard({
  track,
  index,
  setPlayingTrack,
  setTopTrackCardSelected,
  isPlaying,
}) {
  function handlePlay() {
    setPlayingTrack(track);
    setTopTrackCardSelected(track.id);
  }

  return (
    <div className="top-track-card-container">
      <div className="top-track-index">
        <div style={{ fontWeight: "bold" }}>{index}</div>
      </div>
      <img
        className="album-image"
        src={track.album.images[1].url}
        atl="album image"
      />
      <div className="information-container">
        <div className="track-label">{track.name}</div>
        <div className="artist-label">
          {track.artists
            .map((artist) => artist.name)
            .reduce(
              (acc, name, index, array) =>
                acc + name + (index < array.length - 1 ? ", " : ""),
              ""
            )}
        </div>
      </div>
      <div onClick={handlePlay} className="play-button">
        <img
          src={playButton}
          atl="play \n button"
          style={{
            height: "100%",
            width: "100%",
            filter: isPlaying ? "brightness(60%)" : "brightness(100%)",
          }}
        />
      </div>
    </div>
  );
}
