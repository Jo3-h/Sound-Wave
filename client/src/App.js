import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// import custom functional components
import AppRoutes from "./routes/Routes";
import Layout from "./components/common/Layout";
import Player from "./components/common/MusicPlayer";

// import global styles
import "./global.css";

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
        <AppRoutes
          setPlayingTrack={setPlayingTrack}
          setAccessToken={setAccessToken}
          accessToken={accessToken}
          playerRef={playerRef}
        />
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
