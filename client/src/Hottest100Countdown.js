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
    /**
     * useEffect Hook 1 - Initialising songQueue
     *
     * This hook checks for valid gamePlayers (initialisd from players prop) and initialises the random
     * song queue upon rendering of the page. no dependancies, will only run on intial render to maintain
     * a single constant songQueue once it is set the first time.
     *
     * Dependancies:
     * - null
     */
    if (gamePlayers && gamePlayers.length > 0) {
      const allSongs = refactorPlayersArray(gamePlayers);
      const randomQueue = shuffleSongs(allSongs);
      setSongQueue(randomQueue);
    } else {
      console.log("Error: players invalid for making queue");
    }
  }, []);

  useEffect(() => {
    /**
     * useEffect Hook 2 - Play next song in Queue
     *
     * This hook executes on iteration of currentPosition state which holds the index
     * of the songQueue to play. Then sets the currentlyPlaying state to re-render currently
     * playing card. Marks song played in gamePlayers to update players cards. Sets the
     * nextSong to be playing on the player. Iterates the currentSongNumber to trigger next hook.
     *
     * Conditional will return early if countdown has not started yet
     *
     * Dependancies:
     * - currentPosition        // used to trigger playing next track
     */
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
    /**
     * useEffect Hook 3 - Play audio file on change of tracks
     *
     * This hook will play the audio file corresponding to the value of currentSongNumber.
     * The currentSongNumber state is only iterated in Hook 2, so this hook will only run
     * as an effect of that hook playing
     *
     * Dependancies:
     * - currentSongNumber      // used to store the countdown number to announce
     */

    if (currentSongNumber > 0) {
      console.log("attempting to play audio file ", currentSongNumber);
      const audio = new Audio(`/audio_files/${currentSongNumber}.mp3`);
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
  }, [currentSongNumber]);

  /**
   * Auxiliary Function 1 - Refactor players array for songQueue convenience
   *
   * @param {*} players
   * @returns
   */
  const refactorPlayersArray = (players) => {
    return players.flatMap((player) =>
      player.selectedSongs.map((song) => ({
        ...song,
        player: player.name, // Track who owns the song
      }))
    );
  };

  /**
   * Auxiliary Function 2 - Shuffle songs in param and return shuffled array
   *
   * @param {*} songs
   * @returns
   */
  const shuffleSongs = (songs) => {
    const shuffled = [...songs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  /**
   * Auxiliary Function 3 - Iterate currentPosition to trigger playing next song in queue
   */
  const playNextSong = () => {
    if (currentPosition < songQueue.length - 1) {
      setCurrentPosition(currentPosition + 1);
    } else {
      console.log("All Songs have played");
    }
  };

  /**
   * Auxiliary Function 4 - Mark the param nextSong as played in the gamePlayers array
   *
   * @param {*} nextSong
   */
  const markSongPlayed = (nextSong) => {
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
