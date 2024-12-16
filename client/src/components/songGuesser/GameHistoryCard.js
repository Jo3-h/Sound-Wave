import React from "react";

import "./css/GameHistoryCard.css";

export default function GameHistoryCard({ game }) {
  return (
    <div className="game-card-container-master">
      <div className="header-text-section">
        <div className="header-text">Album Cover</div>
        <div className="header-text">Song Title</div>
        <div className="header-text">Album Title</div>
        <div className="header-text">Artist Name</div>
        <div className="header-text">Release Date</div>
      </div>
      {game.guesses
        .slice()
        .reverse()
        .map((guess, index) => (
          <div key={index} className="guess-card">
            <div className="flex-box">
              <img
                className="game-history-card-image"
                src={guess.albumUrl}
                alt="Album Cover"
              />
            </div>
            <div
              className="guess-card-text"
              style={{
                textShadow:
                  guess.title === game.mysteryTrack.title
                    ? "green 0 0 10px"
                    : "red 0 0 10px",
                color:
                  guess.title === game.mysteryTrack.title ? "green" : "red",
              }}
            >
              {guess.title}
            </div>
            <div
              className="guess-card-text"
              style={{
                textShadow:
                  guess.album === game.mysteryTrack.album
                    ? "green 0 0 10px"
                    : "red 0 0 10px",
                color:
                  guess.album === game.mysteryTrack.album ? "green" : "red",
              }}
            >
              {guess.album}
            </div>
            <div
              className="guess-card-text"
              style={{
                textShadow:
                  guess.artist.split(",")[0] ===
                  game.mysteryTrack.artist.split(",")[0]
                    ? "green 0 0 10px"
                    : "red 0 0 10px",
                color:
                  guess.artist.split(",")[0] ===
                  game.mysteryTrack.artist.split(",")[0]
                    ? "green"
                    : "red",
              }}
            >
              {guess.artist}
            </div>
            <div
              className="guess-card-text"
              style={{
                textShadow:
                  guess.releaseDate === game.mysteryTrack.releaseDate
                    ? "green 0 0 10px"
                    : "red 0 0 10px",
                color:
                  guess.releaseDate === game.mysteryTrack.releaseDate
                    ? "green"
                    : "red",
              }}
            >
              {guess.releaseDate}
            </div>
          </div>
        ))}
    </div>
  );
}
