import React from "react";

// import custom styling
import "./css/TopArtistCard.css";

export default function TopArtistCard({
  artist,
  index,
  setPlayingTrack,
  setTopArtistSelected,
  isPlaying,
}) {
  return (
    <div className="artist-card-container">
      <div className="square-container">
        <img
          className="artist-image"
          src={artist.images[1].url}
          atl="artist image"
        />
      </div>
      <div className="title-container"></div>
    </div>
  );
}
