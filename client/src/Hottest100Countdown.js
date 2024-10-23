import React from "react";
import { Container, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

// import custom elements and styling sheets
import PlayingTrackCard from "./PlayingTrackCard";
import PlayerStatusCard from "./PlayerStatusCard";
import PlayedTrackCard from "./PlayedTrackCard";
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
  const [isWideScreen, setIsWideScreen] = useState(true);

  // hook for testing
  useEffect(() => {
    setGamePlayers([
      {
        id: 1729595189106,
        name: "Joe Hosking",
        profileImage:
          "https://i.scdn.co/image/ab67616d0000485154539f552c0fda9cb1ecd0c8",
        selectedSongs: [
          {
            artist: "Fred again..",
            title: "places to be",
            uri: "spotify:track:561pBFcFL2Pwb9HPO9tU8J",
            albumUrl:
              "https://i.scdn.co/image/ab67616d0000485154539f552c0fda9cb1ecd0c8",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e0254539f552c0fda9cb1ecd0c8",
            played: false,
          },
          {
            artist: "Frank Ocean",
            title: "Pyramids",
            uri: "spotify:track:4QhWbupniDd44EDtnh2bFJ",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048517aede4855f6d0d738012e2e5",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e027aede4855f6d0d738012e2e5",
            played: false,
          },
          {
            artist: "Radiohead",
            title: "How to Disappear Completely",
            uri: "spotify:track:2rtGaCAeYtmcIvuZsvgTf6",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048516c7112082b63beefffe40151",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e026c7112082b63beefffe40151",
            played: false,
          },
          {
            artist: "Oasis",
            title: "Champagne Supernova",
            uri: "spotify:track:6EMynpZ10GVcwVqiLZj6Ye",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048512f2eeee9b405f4d00428d84c",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e022f2eeee9b405f4d00428d84c",
            played: false,
          },
          {
            artist: "Frank Ocean",
            title: "Solo",
            uri: "spotify:track:35xSkNIXi504fcEwz9USRB",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851c5649add07ed3720be9d5526",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526",
            played: false,
          },
        ],
      },
      {
        id: 1729595209647,
        name: "Kiefer ",
        profileImage: "",
        selectedSongs: [
          {
            artist: "Frank Ocean",
            title: "Solo",
            uri: "spotify:track:35xSkNIXi504fcEwz9USRB",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851c5649add07ed3720be9d5526",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526",
            played: false,
          },
          {
            artist: "Daft Punk",
            title: "Digital Love",
            uri: "spotify:track:2VEZx7NWsZ1D0eJ4uv5Fym",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048516610c21366e613bfd9f5d197",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e026610c21366e613bfd9f5d197",
            played: false,
          },
          {
            artist: "Travis Scott",
            title: "FE!N (feat. Playboi Carti)",
            uri: "spotify:track:42VsgItocQwOQC3XWZ8JNA",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851881d8d8378cd01099babcd44",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02881d8d8378cd01099babcd44",
            played: false,
          },
          {
            artist: "Future",
            title: "Red Leather",
            uri: "spotify:track:4Dx4e0X5dR6TW85dtFU42x",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851d353552c4c2932094456bbe9",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02d353552c4c2932094456bbe9",
            played: false,
          },
          {
            artist: "Kendrick Lamar",
            title: "euphoria",
            uri: "spotify:track:77DRzu7ERs0TX3roZcre7Q",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048517587213b1be294ac4000f648",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e027587213b1be294ac4000f648",
            played: false,
          },
        ],
      },
      {
        id: 1729595243487,
        name: "Hamish",
        profileImage: "",
        selectedSongs: [
          {
            artist: "Frank Ocean",
            title: "Solo",
            uri: "spotify:track:35xSkNIXi504fcEwz9USRB",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851c5649add07ed3720be9d5526",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526",
            played: false,
          },
          {
            artist: "Frank Ocean",
            title: "White Ferrari",
            uri: "spotify:track:2LMkwUfqC6S6s6qDVlEuzV",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851c5649add07ed3720be9d5526",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526",
            played: false,
          },
          {
            artist: "Djo",
            title: "End of Beginning",
            uri: "spotify:track:3qhlB30KknSejmIvZZLjOD",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851fddfffec51b4580acae727c1",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02fddfffec51b4580acae727c1",
            played: false,
          },
          {
            artist: "MF DOOM",
            title: "Rhymes Like Dimes",
            uri: "spotify:track:6OkDb9fyi22Pr6QJIrUNdJ",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048516ce90ec627a0198a8efd127f",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e026ce90ec627a0198a8efd127f",
            played: false,
          },
          {
            artist: "Kanye West",
            title: "POWER",
            uri: "spotify:track:2gZUPNdnz5Y45eiGxpHGSc",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851d9194aa18fa4c9362b47464f",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
            played: false,
          },
        ],
      },
      {
        id: 17295951891061,
        name: "Joe Hosking",
        profileImage: "",
        selectedSongs: [
          {
            artist: "Fred again..",
            title: "places to be",
            uri: "spotify:track:561pBFcFL2Pwb9HPO9tU8J",
            albumUrl:
              "https://i.scdn.co/image/ab67616d0000485154539f552c0fda9cb1ecd0c8",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e0254539f552c0fda9cb1ecd0c8",
            played: false,
          },
          {
            artist: "Frank Ocean",
            title: "Pyramids",
            uri: "spotify:track:4QhWbupniDd44EDtnh2bFJ",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048517aede4855f6d0d738012e2e5",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e027aede4855f6d0d738012e2e5",
            played: false,
          },
          {
            artist: "Radiohead",
            title: "How to Disappear Completely",
            uri: "spotify:track:2rtGaCAeYtmcIvuZsvgTf6",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048516c7112082b63beefffe40151",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e026c7112082b63beefffe40151",
            played: false,
          },
          {
            artist: "Oasis",
            title: "Champagne Supernova",
            uri: "spotify:track:6EMynpZ10GVcwVqiLZj6Ye",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048512f2eeee9b405f4d00428d84c",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e022f2eeee9b405f4d00428d84c",
            played: false,
          },
          {
            artist: "Frank Ocean",
            title: "Solo",
            uri: "spotify:track:35xSkNIXi504fcEwz9USRB",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851c5649add07ed3720be9d5526",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526",
            played: false,
          },
        ],
      },
      {
        id: 17295952096472,
        name: "Kiefer ",
        profileImage: "",
        selectedSongs: [
          {
            artist: "Frank Ocean",
            title: "Solo",
            uri: "spotify:track:35xSkNIXi504fcEwz9USRB",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851c5649add07ed3720be9d5526",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526",
            played: false,
          },
          {
            artist: "Daft Punk",
            title: "Digital Love",
            uri: "spotify:track:2VEZx7NWsZ1D0eJ4uv5Fym",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048516610c21366e613bfd9f5d197",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e026610c21366e613bfd9f5d197",
            played: false,
          },
          {
            artist: "Travis Scott",
            title: "FE!N (feat. Playboi Carti)",
            uri: "spotify:track:42VsgItocQwOQC3XWZ8JNA",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851881d8d8378cd01099babcd44",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02881d8d8378cd01099babcd44",
            played: false,
          },
          {
            artist: "Future",
            title: "Red Leather",
            uri: "spotify:track:4Dx4e0X5dR6TW85dtFU42x",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851d353552c4c2932094456bbe9",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02d353552c4c2932094456bbe9",
            played: false,
          },
          {
            artist: "Kendrick Lamar",
            title: "euphoria",
            uri: "spotify:track:77DRzu7ERs0TX3roZcre7Q",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048517587213b1be294ac4000f648",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e027587213b1be294ac4000f648",
            played: false,
          },
        ],
      },
      {
        id: 17295952434873,
        name: "Hamish",
        profileImage: "",
        selectedSongs: [
          {
            artist: "Frank Ocean",
            title: "Solo",
            uri: "spotify:track:35xSkNIXi504fcEwz9USRB",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851c5649add07ed3720be9d5526",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526",
            played: false,
          },
          {
            artist: "Frank Ocean",
            title: "White Ferrari",
            uri: "spotify:track:2LMkwUfqC6S6s6qDVlEuzV",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851c5649add07ed3720be9d5526",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526",
            played: false,
          },
          {
            artist: "Djo",
            title: "End of Beginning",
            uri: "spotify:track:3qhlB30KknSejmIvZZLjOD",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851fddfffec51b4580acae727c1",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02fddfffec51b4580acae727c1",
            played: false,
          },
          {
            artist: "MF DOOM",
            title: "Rhymes Like Dimes",
            uri: "spotify:track:6OkDb9fyi22Pr6QJIrUNdJ",
            albumUrl:
              "https://i.scdn.co/image/ab67616d000048516ce90ec627a0198a8efd127f",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e026ce90ec627a0198a8efd127f",
            played: false,
          },
          {
            artist: "Kanye West",
            title: "POWER",
            uri: "spotify:track:2gZUPNdnz5Y45eiGxpHGSc",
            albumUrl:
              "https://i.scdn.co/image/ab67616d00004851d9194aa18fa4c9362b47464f",
            albumUrlLarge:
              "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
            played: false,
          },
        ],
      },
    ]);
  }, []);

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

  useEffect(() => {
    /**
     * useEffect Hook 4 - Check width for playerCard render
     *
     * This useEffect hook listens for window size changes to decide whether playerStatusCards
     * should render fully or render icon version. This will be stored as a boolean value which is
     * passed to the playerStatusCard as a prop to decide which is rendered
     *
     * NOTE: Icon version playerStatusCard will not be impletented yet, simply don't render cards if
     * wideWindow state is false
     */

    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 700); // Update based on width
    };

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
    if (currentPosition < songQueue.length - 1) {
      setCurrentPosition(currentPosition + 1);
    } else {
      console.log("All Songs have played");
    }
    console.log("SongQueue -> ", songQueue);
    console.log("currentPosition -> ", currentPosition);
    console.log("currentSongNumber -> ", currentSongNumber);
    console.log("gamePlayers -> ", gamePlayers);
  };

  /**
   * Auxiliary Function 4 - Mark the param nextSong as played in the gamePlayers array
   *
   * @param {*} nextSong
   */
  const markSongPlayed = (nextSong) => {
    console.log("nextSong -> ", nextSong);
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

  return (
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
          <Button
            variant="secondary"
            onClick={playNextSong}
            style={{ height: "40px", width: "80px", marginBottom: "20px" }}
          >
            Play Next Song
          </Button>
          {songQueue.map((track, index) => {
            const reverseIndex = songQueue.length - 1 - index; // Calculate the reverse index
            return (
              reverseIndex <= currentPosition && (
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
          {/* <div className="lyrics-box"></div> */}
        </div>
      )}
    </div>
  );
}
