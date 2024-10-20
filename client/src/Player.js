import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    console.log("Updated trackUri");
    console.log("TrackUri -> ", trackUri);
    console.log("AccessToken -> ", accessToken);

    // Play the track if trackUri is valid
    if (trackUri) {
      setPlay(true);
    }
  }, [trackUri, accessToken]);

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
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          if (state.isPlaying) {
            console.log("Currently playing:", state.track);
          } else {
            setPlay(false);
          }
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
      />
    </div>
  );
}
