import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// import custom functional components
import Login from "./login";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import Player from "./Player";
import useAuth from "./useAuth";
import SongCountdown from "./SongCountdown";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  // get state from dashboard components
  const [playingTrack, setPlayingTrack] = useState("");
  const accessToken = useAuth(code);

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
          <Route
            path="/dashboard"
            element={
              <Dashboard
                accessToken={accessToken}
                setPlayingTrack={setPlayingTrack}
              />
            }
          />
          <Route
            path="/song-countdown"
            element={
              <SongCountdown
                accessToken={accessToken}
                setPlayingTrack={setPlayingTrack}
              />
            }
          />
        </Routes>
        {accessToken && (
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        )}
      </Layout>
    </Router>
  );
}

export default App;
