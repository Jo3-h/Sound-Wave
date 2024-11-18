import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";

// import custom elements and styling sheets
import PlayingTrackCard from "./PlayingTrackCard";
import PlayerStatusCard from "./PlayerStatusCard";
import PlayedTrackCard from "./PlayedTrackCard";
import "./css/Hottest100Countdown.css";

export default function Hottest100Countdown({
  accessToken,
  players,
  setPlayingTrack,
  playerRef,
}) {
  const [songQueue, setSongQueue] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(-1);
  const [gamePlayers, setGamePlayers] = useState(players);
  const [currentSongNumber, setCurrentSongNumber] = useState(-1);
  const [isWideScreen, setIsWideScreen] = useState(true);
  const timer = useRef(null);
  const isPlayingRef = useRef(false);
  const [isIntervalActive, setIsIntervalActive] = useState(true);

  useEffect(() => {
    if (!playerRef || !playerRef.current || !playerRef.current.state) return;

    // Function to check the player's state and handle volume change
    const checkPlayerState = () => {
      const time_remaining =
        playerRef.current.state.track.durationMs -
        playerRef.current.state.progressMs;
      console.log("time_remaining -> ", time_remaining);

      if (time_remaining < 5000 && currentPosition > -1) {
        clearTimeout(timer.current);
        console.log("changing volume");
        changeVolume(100, 20, 20, 100);

        // Stop the interval
        setIsIntervalActive(false);

        timer.current = setTimeout(() => {
          console.log("playing next track");
          playNextSong();
          setIsIntervalActive(true);
        }, time_remaining);
      }
    };

    // Set up an interval to check every second if it's active
    let intervalId;
    if (isIntervalActive) {
      intervalId = setInterval(checkPlayerState, 1000);
      return () => clearInterval(intervalId);
    }

    // Cleanup function to clear the interval and timeout
    return () => {
      clearInterval(intervalId);
      clearTimeout(timer.current);
    };
  }, [playerRef, currentPosition, isIntervalActive]);

  useEffect(() => {
    /**
     * useEffect Hook 1 - Initialising songQueue
     *
     * This hook checks for valid gamePlayers (initialisd from players prop) and initialises the random
     * song queue upon rendering of the page. no dependencies, will only run on intial render to maintain
     * a single constant songQueue once it is set the first time.
     *
     * Dependencies:
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
     * Dependencies:
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
  }, [currentPosition]);

  useEffect(() => {
    /**
     * useEffect Hook 3 - Play audio file on change of tracks
     *
     * This hook will play the audio file corresponding to the value of currentSongNumber.
     * The currentSongNumber state is only iterated in Hook 2, so this hook will only run
     * as an effect of that hook playing
     *
     * Dependencies:
     * - currentSongNumber      // used to store the countdown number to announce
     */

    if (currentSongNumber > 0) {
      const audio = new Audio(`/audio_files/${currentSongNumber}.mp3`);

      const playAudio = async () => {
        try {
          await audio.play();
          console.log(`Audio ${currentSongNumber}.mp3 playing`);
          changeVolume(20, 100, 20, 100);
        } catch (error) {
          console.log("Error playing Audio: ", error);
        }
      };

      playAudio();
    }
  }, [currentSongNumber]);

  useEffect(() => {
    /**
     * useEffect Hook 4 - Check width for playerCard render
     *
     * This useEffect hook listens for window size changes to decide whether playerStatusCards
     * should render fully or render icon version. This will be stored as a boolean value which is
     * passed to the playerStatusCard as a prop to decide which is rendered
     *
     * NOTE: Icon version playerStatusCard will not be implemented yet, simply don't render cards if
     * wideWindow state is false
     */

    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 700); // Update based on width
    };
    console.log("isWideScreen -> ", isWideScreen);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        playerId: player.id,
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
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;

    if (currentPosition < songQueue.length - 1) {
      setCurrentPosition((prev) => prev + 1);
    } else {
      console.log("All Songs have played");
    }

    // create a timeout to release the mutex lock for next execution (guards against double calls)
    setTimeout(() => {
      isPlayingRef.current = false;
    }, 1000);
  };

  /**
   * Auxiliary Function 4 - Mark the param nextSong as played in the gamePlayers array
   *
   * @param {*} nextSong
   */
  const markSongPlayed = (nextSong) => {
    setGamePlayers((prevGamePlayers) =>
      prevGamePlayers.map((player) =>
        player.name === nextSong.player && player.id === nextSong.playerId
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

  const changeVolume = (startVolume, endVolume, steps, interval) => {
    let current_step = 0;
    const volume_change = (startVolume - endVolume) / steps;

    //define interval
    const intervalId = setInterval(() => {
      if (current_step < steps) {
        const new_volume = Math.max(
          0,
          Math.min(100, startVolume - volume_change * current_step)
        );
        if (playerRef.current) {
          playerRef.current.setVolume(new_volume / 100);
        }
        current_step++;
      } else {
        clearInterval(intervalId);
      }
    }, interval);
  };

  return currentPosition == -1 ? (
    <Button
      variant="secondary"
      onClick={playNextSong}
      style={{ height: "40px", width: "180px", marginBottom: "20px" }}
    >
      Start Countdown
    </Button>
  ) : (
    <div className="hottest-100-container">
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
        <div className="played-tracks-container">
          {currentPosition !== -1 &&
            songQueue.map((track, index) => {
              const reverseIndex = songQueue.length - 1 - index; // Calculate the reverse index
              return (
                reverseIndex < songQueue.length - currentSongNumber && (
                  <PlayedTrackCard
                    key={reverseIndex}
                    track={songQueue[reverseIndex]}
                    position={index + 1}
                  />
                )
              );
            })}
        </div>
      </div>
      {isWideScreen && (
        <div className="playerStatusSection">
          {gamePlayers.map((player) => (
            <PlayerStatusCard
              key={player.id}
              player={player}
              iconCard={isWideScreen}
            />
          ))}
        </div>
      )}
    </div>
  );
}
