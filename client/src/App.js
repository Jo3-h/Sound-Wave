import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// import custom functional components
import Login from "./components/common/login";
import MusicPlayer from "./components/musicplayer/MusicPlayer";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/common/Layout";
import Player from "./components/common/Player";
import useAuth from "./components/common/useAuth";
import SongCountdown from "./components/countdown/SongCountdown";
import StatisticsDashboard from "./components/statistics/statisticsDashboard";
import SongGuesser from "./components/songGuesser/SongGuesser";

// import global styles
import "./global.css";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  // get state from dashboard components
  const [playingTrack, setPlayingTrack] = useState("");
  const [playerRef, setPlayerRef] = useState(null);
  const accessToken = useAuth(code);

  const updatePlayerRef = (ref) => {
    setPlayerRef(ref);
  };
  // if the code is not set then render login page
  if (!code) {
    return <Login />;
  }

  // else render the main application
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/music-player"
            element={
              <MusicPlayer
                accessToken={accessToken}
                setPlayingTrack={setPlayingTrack}
              />
            }
          />
          <Route
            path="/statistics"
            element={
              <StatisticsDashboard
                accessToken={accessToken}
                setPlayingTrack={setPlayingTrack}
                playerRef={playerRef}
              />
            }
          />
          <Route
            path="/song-countdown"
            element={
              <SongCountdown
                accessToken={accessToken}
                setPlayingTrack={setPlayingTrack}
                playerRef={playerRef}
              />
            }
          />
          <Route path="song-guesser" element={<SongGuesser />} />
        </Routes>
        {accessToken && (
          <Player
            accessToken={accessToken}
            trackUri={playingTrack?.uri}
            getPlayerRef={updatePlayerRef}
          />
        )}
      </Layout>
    </Router>
  );
}

export default App;
