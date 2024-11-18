import React, { useEffect } from "react";

export default function SpotifyLogin({ redirectUri }) {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=af336f24a30e439b88ed899c0813426a&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read`;

  useEffect(() => {
    console.log("redirectUri", redirectUri);
    console.log("AUTH_URL", AUTH_URL);
  }, []);

  return (
    <div
      className="content-container"
      style={{ height: "100%", alignItems: "center" }}
    >
      <a
        className="btn btn-success btn-lg"
        style={{ height: "50px" }}
        href={AUTH_URL}
      >
        Login with Spotify
      </a>
    </div>
  );
}
