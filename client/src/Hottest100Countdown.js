import React from "react";
import { Container, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

// import custom elements and styling sheets
import PlayingTrackCard from "./PlayingTrackCard";
import "./css/Hottest100Countdown.css";

export default function Hottest100Countdown({
  accessToken,
  players,
  setPlayingTrack,
}) {
  const [songQueue, setSongQueue] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(-1);
  const [gamePlayers, setGamePlayers] = useState(players);
  const [currentSongNumber, setCurrentSongNumber] = useState(-1);

  useEffect(() => {
    console.log("Players -> ", players);
  }, []);

  useEffect(() => {
    if (gamePlayers && gamePlayers.length > 0) {
      const allSongs = getAllSongsWithPlayedState(gamePlayers);
      const randomQueue = shuffleSongs(allSongs);
      setSongQueue(randomQueue);
    } else {
      console.log("Error: players invalid for making queue");
    }
  }, []);

  useEffect(() => {
    if (currentPosition === -1) {
      return;
    }

    if (songQueue.length > 0 && currentPosition < songQueue.length) {
      const nextSong = songQueue[currentPosition];
      setCurrentlyPlaying(nextSong);
      markSongPlayed(nextSong);
      console.log("Next Song -> ", nextSong);
      console.log(`playing track uri: ${nextSong.uri} with ${accessToken}`);
      setPlayingTrack(nextSong);
      setCurrentSongNumber(songQueue.length - currentPosition);
    } else {
      console.log(
        "can't play next song, current position not valid or queue length <= 0"
      );
    }
  }, [songQueue, currentPosition]);

  useEffect(() => {
    if (currentSongNumber > 0) {
      console.log("attempting to play audio file ", currentSongNumber);
      const audio = new Audio(`/audio_files/${currentSongNumber}.mp3`);
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
  }, [currentSongNumber]);

  // Helper function to extract all songs and add a 'played' state
  const getAllSongsWithPlayedState = (players) => {
    return players.flatMap((player) =>
      player.selectedSongs.map((song) => ({
        ...song,
        player: player.name, // Track who owns the song
      }))
    );
  };

  // Shuffle songs randomly (Fisher-Yates shuffle)
  const shuffleSongs = (songs) => {
    const shuffled = [...songs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const playNextSong = () => {
    if (currentPosition < songQueue.length - 1) {
      setCurrentPosition(currentPosition + 1);
    } else {
      console.log("All Songs have played");
    }
  };

  const markSongPlayed = (nextSong) => {
    // Use setPlayers to immutably update the state
    setGamePlayers((prevGamePlayers) =>
      prevGamePlayers.map((player) =>
        player.name === nextSong.player
          ? {
              ...player,
              selectedSongs: player.selectedSongs.map((song) =>
                song.title === nextSong.title
                  ? { ...song, played: true } // Update the song's played state
                  : song
              ),
            }
          : player
      )
    );
  };

  return (
    <Container
      className="d-flex flex-row vh-100 w-100 justify-content-center align-items-center"
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        marginTop: "20px",
        marginBottom: "130px",
        backgroundColor: "#f7f7f7",
        marginRight: "20px",
        marginLeft: "20px",
        padding: "0",
        borderRadius: "10px",
      }}
    >
      <div className="countdownStatusSection">
        <PlayingTrackCard
          number={songQueue ? songQueue.length - currentPosition : -1}
          track={
            currentlyPlaying
              ? currentlyPlaying
              : { title: "No Song Playing", player: "N/A" }
          }
          player={currentlyPlaying ? currentlyPlaying.player : "unknown"}
        />
        <Container
          className="h-100 w-100 py-3"
          style={{
            height: "100%",
            backgroundColor: "white",
            overflow: "hidden",
            borderRadius: "10px",
            marginTop: "15px",
          }}
        >
          <Button variant="secondary" onClick={playNextSong}></Button>
        </Container>
      </div>
      <div className="playerStatusSection"></div>
    </Container>
  );
}
