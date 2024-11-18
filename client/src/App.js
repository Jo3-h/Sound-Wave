import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// import custom functional components
import Login from "./components/common/Login";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/common/Layout";
import Player from "./components/common/Player";
import SongCountdown from "./components/countdown/SongCountdown";
import StatisticsDashboard from "./components/statistics/statisticsDashboard";
import SongGuesser from "./components/songGuesser/SongGuesser";
import ProtectedRoute from "./components/common/ProtectedRoute";

// import global styles
import "./global.css";
import SignUp from "./components/common/SignUp";

function App() {
  // get state from dashboard components
  const [playingTrack, setPlayingTrack] = useState("");
  const [playerRef, setPlayerRef] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const updatePlayerRef = (ref) => {
    setPlayerRef(ref);
  };

  useEffect(() => {
    console.log("accessToken -> ", accessToken);
  }, [accessToken]);

  // else render the main application
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/music-player"
            element={
              <ProtectedRoute
                element={MusicPlayer}
                setPlayingTrack={setPlayingTrack}
                setAccessToken={setAccessToken}
                accessToken={accessToken}
              />
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute
                element={StatisticsDashboard}
                setPlayingTrack={setPlayingTrack}
                setAccessToken={setAccessToken}
                playerRef={playerRef}
                accessToken={accessToken}
              />
            }
          />
          <Route
            path="/song-countdown"
            element={
              <ProtectedRoute
                element={SongCountdown}
                setPlayingTrack={setPlayingTrack}
                setAccessToken={setAccessToken}
                playerRef={playerRef}
                accessToken={accessToken}
              />
            }
          />
          <Route
            path="/song-guesser"
            element={
              <ProtectedRoute
                element={SongGuesser}
                setPlayingTrack={setPlayingTrack}
                setAccessToken={setAccessToken}
                accessToken={accessToken}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
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
