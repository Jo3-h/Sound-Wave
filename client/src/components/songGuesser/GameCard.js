import React from "react";
import { useState, useEffect, useRef } from "react";

// import custom components and style sheets
import "./css/GameCard.css";

export default function GameCard({ showTrack, game, gameStats, gameSettings }) {
  const [highlight, setHighlight] = useState("white");

  useEffect(() => {
    if (game.win) {
      setHighlight("white");
    } else {
      setHighlight("white");
    }
  }, []);

  return (
    <div
      className="game-card-container"
      style={{
        backgroundColor: showTrack ? highlight : "white",
      }}
    >
      <img
        className="game-card-image"
        src={showTrack ? game.mysteryTrack.image : "/question_mark.png"}
        alt="Mystery Track"
      />
      <div className="song-info-container">
        <div className="song-title">
          {showTrack ? game.mysteryTrack.title : "?"}
        </div>
        <div className="song-artist">
          {showTrack ? game.mysteryTrack.artist : "?"}
        </div>
        <div className="lives-array">
          {Array.from(
            { length: gameSettings.guessLimit - game.incorrectGuesses },
            (_, i) => (
              <img
                key={i}
                src="/heart_icon.png"
                alt="Life"
                className="life-icon-active"
              />
            )
          )}
          {Array.from({ length: game.incorrectGuesses }, (_, i) => (
            <img
              key={i}
              src="/heart_icon.png"
              alt="Life"
              className="life-icon-inactive"
            />
          ))}
        </div>
        <div className="streak-array">
          <img
            src="/streak_icon.png"
            alt="streak_icon"
            className="streak-icon"
            style={{
              filter: gameStats.streak > 0 ? "none" : "grayscale(100%)",
            }}
          />
          <div className="streak-text">{gameStats.streak} song streak</div>
        </div>
      </div>
      <div className="game-stats-container">
        <div className="stats-title">Game Stats</div>
        <div className="stats-array">
          <div className="stats-item">
            <div className="stats-label">Correct:</div>
            <div className="stats-value">{gameStats.correct}</div>
          </div>
          <div className="stats-item">
            <div className="stats-label">Incorrect:</div>
            <div className="stats-value">{gameStats.incorrect}</div>
          </div>
          <div className="stats-item">
            <div className="stats-label">Total Games:</div>
            <div className="stats-value">{gameStats.total}</div>
          </div>
          <div className="stats-item">
            <div className="stats-label">Avg Guesses:</div>
            <div className="stats-value">
              {gameStats.totalGuesses
                ? (gameStats.total / gameStats.totalGuesses).toFixed(2)
                : "-"}
            </div>
          </div>
          <div className="stats-item">
            <div className="stats-label">Avg Time:</div>
            <div className="stats-value">
              {gameStats.total
                ? (gameStats.totalTime / (gameStats.total * 1000)).toFixed(2)
                : "- "}
              s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
