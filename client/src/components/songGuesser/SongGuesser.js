import React from "react";
import { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

// import custom components and style sheets
import "./css/SongGuesser.css";
import TrackSearchResult from "../common/TrackSearchResult";
import GameCard from "./GameCard";
import GameHistoryCard from "./GameHistoryCard";

const spotifyApi = new SpotifyWebApi({
  clientId: "af336f24a30e439b88ed899c0813426a",
});

const gameSettings = {
  guessLimit: 3,
};

export default function SongGuesser({
  accessToken,
  setPlayingTrack,
  playerRef,
}) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const gameIndex = useRef(0);
  const [showTrack, setShowTrack] = useState(false);
  const [gameStats, setGameStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
    totalGuesses: 0,
    totalTime: 0,
    streak: 0,
  });
  const [currentGame, setCurrentGame] = useState({
    mysteryTrack: {},
    guesses: [],
    incorrectGuesses: 0,
  });
  const [gameHistory, setGameHistory] = useState([]);

  const handleGuess = (track) => {
    const correctTrack = currentGame.mysteryTrack;
    const correct =
      track.artist === correctTrack.artist &&
      track.title === correctTrack.title;

    // add guess to current game
    setCurrentGame((prevGame) => ({
      ...prevGame,
      guesses: [...prevGame.guesses, { ...track, correct }],
      win: correct,
      incorrectGuesses: prevGame.incorrectGuesses + (correct ? 0 : 1),
    }));

    // either guess is correct or 3 guesses have been made
    if (correct || currentGame.guesses.length + 1 >= gameSettings.guessLimit) {
      if (correct) {
        setGameStats((prevStats) => {
          return {
            ...prevStats,
            correct: prevStats.correct + 1,
            total: prevStats.total + 1,
            totalGuesses: prevStats.totalGuesses + currentGame.guesses.length,
            totalTime:
              prevStats.totalTime + (new Date() - currentGame.startTime),
            streak: prevStats.streak + 1,
          };
        });
      } else {
        setGameStats((prevStats) => {
          return {
            ...prevStats,
            incorrect: prevStats.incorrect + 1,
            total: prevStats.total + 1,
            totalGuesses: prevStats.totalGuesses + currentGame.guesses.length,
            totalTime:
              prevStats.totalTime + (new Date() - currentGame.startTime),
            streak: 0,
          };
        });
      }

      // Show the correct track for 5 seconds before starting the next game
      setShowTrack(true);
      setTimeout(() => {
        setShowTrack(false);

        // Iterate game index
        gameIndex.current++;
        if (gameIndex.current >= savedTracks.length) {
          console.log("No more tracks to play");
          gameIndex.current = 0;
        }

        setPlayingTrack(savedTracks[gameIndex.current]);
      }, 5000);
    }

    // clear search
    setSearch("");
  };

  useEffect(() => {
    if (
      !isGameStarted ||
      savedTracks.length === 0 ||
      currentGame.guesses.length === 0
    ) {
      return;
    }

    const recent_guess = currentGame.guesses[currentGame.guesses.length - 1];
    const correct =
      recent_guess.title === currentGame.mysteryTrack.title &&
      recent_guess.artist === currentGame.mysteryTrack.artist &&
      recent_guess.album === currentGame.mysteryTrack.album;

    // if game has finished then add to game history
    if (correct) {
      setGameHistory((prevHistory) => [
        ...prevHistory,
        {
          ...currentGame,
          endTime: new Date(),
        },
      ]);
      setCurrentGame({
        mysteryTrack: savedTracks[gameIndex.current],
        guesses: [],
        win: false,
        incorrectGuesses: 0,
        startTime: new Date(),
      });
    }
  }, [currentGame]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const fetchSavedTracks = async () => {
      let allTracks = [];
      let offset = 0;
      const limit = 50;
      let total = 0;

      do {
        try {
          const res = await spotifyApi.getMySavedTracks({ limit, offset });
          console.log("Saved tracks response:", res.body);
          const tracks = res.body.items.map((item) => ({
            id: item.track.id,
            artist: item.track.artists
              .map((_artist) => _artist.name)
              .join(", "),
            title: item.track.name,
            album: item.track.album.name,
            uri: item.track.uri,
            releaseDate: item.track.album.release_date,
            image: item.track.album.images[1]?.url,
          }));
          allTracks = [...allTracks, ...tracks];
          offset += limit;
          total = res.body.total;
        } catch (err) {
          console.log("Error fetching saved tracks:", err);
          break;
        }
      } while (offset < total && total < 200);

      const shuffledTracks = shuffleArray(allTracks);
      setSavedTracks(shuffledTracks);

      console.log("All shuffled saved tracks:", allTracks);
    };

    fetchSavedTracks();
  }, [accessToken]);

  useEffect(() => {
    if (!search) {
      return setSearchResults([]);
    }
    if (!accessToken) {
      return;
    }

    // search spotify based on search value
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestImage = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          });
          return {
            artist: track.artists.map((_artist) => _artist.name).join(", "),
            title: track.name,
            album: track.album.name,
            uri: track.uri,
            albumUrl: smallestImage.url,
            releaseDate: track.album.release_date,
          };
        })
      );
      console.log(searchResults);
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  const handlePlay = () => {
    // if first call then start game else increment game index
    if (!isGameStarted) {
      setIsGameStarted(true);
      gameIndex.current = 0;
    } else {
      setGameHistory((prevHistory) => [
        ...prevHistory,
        {
          ...currentGame,
          endTime: new Date(),
        },
      ]);
      gameIndex.current++;
    }

    // set up game
    if (gameIndex.current >= savedTracks.length) {
      console.log("No more tracks to play");
      return;
    }
    setCurrentGame({
      mysteryTrack: savedTracks[gameIndex.current],
      guesses: [],
      win: false,
      incorrectGuesses: 0,
      startTime: new Date(),
    });
    setPlayingTrack(savedTracks[gameIndex.current]);
  };

  return (
    <div className="content-container">
      <div className="song-guesser-container">
        {isGameStarted && (
          <div>
            <h1>Song Guesser</h1>
            <div className="game-status-container">
              <GameCard
                showTrack={showTrack}
                game={currentGame}
                gameStats={gameStats}
                gameSettings={gameSettings}
              />
            </div>
            <div className="guess-entry-container">
              <Form.Control
                type="search"
                placeholder="enter guess"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                className="results-container"
                style={{ display: search === "" ? "none" : "" }}
              >
                {searchResults.map((track, index) => (
                  <TrackSearchResult
                    key={index}
                    track={track}
                    chooseTrack={handleGuess}
                  />
                ))}
              </div>
            </div>
            <div className="game-history-container">
              <GameHistoryCard
                game={currentGame}
                index={gameHistory.length + 1}
              />
              {gameHistory.map((game, index) => (
                <GameHistoryCard key={index} game={game} index={index + 1} />
              ))}
            </div>
          </div>
        )}
        {!isGameStarted && (
          <div>
            <h1>Song Guesser</h1>
            <button onClick={handlePlay}>Play</button>
          </div>
        )}
      </div>
    </div>
  );
}
