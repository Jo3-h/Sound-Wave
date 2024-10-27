import React, { useState, useEffect, useRef } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri, getPlayerRef }) {
  const [play, setPlay] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    // Play the track if trackUri is valid
    if (trackUri) {
      setPlay(true);
    }
  }, [trackUri, accessToken]);

  useEffect(() => {
    const attemptToPassRef = () => {
      if (playerRef.current) {
        getPlayerRef(playerRef);
      } else {
        setTimeout(attemptToPassRef, 1000);
      }
    };

    attemptToPassRef();
    return () => clearTimeout(attemptToPassRef);
  }, []);

  // Early return if no access token
  if (!accessToken) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        bottom: "30px",
        width: "100%",
      }}
    >
      <style>{`
        ._ControlsButtonsRSWP > div:nth-child(2),
        ._ControlsButtonsRSWP > div:nth-child(4) {
          display: none !important;
        }
      `}</style>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        play={play}
        uris={trackUri ? [trackUri] : []}
        ref={playerRef}
      />
    </div>
  );
}
