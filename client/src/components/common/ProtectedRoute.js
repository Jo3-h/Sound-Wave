import React, { useEffect } from "react";
import { redirect, useLocation } from "react-router-dom";
import SpotifyLogin from "./SpotifyLogin";
import useAuth from "./useAuth";

const ProtectedRoute = ({
  element: Component,
  setAccessToken,
  accessToken,
  ...rest
}) => {
  const location = useLocation();
  const redirectUri = `${window.location.origin}${location.pathname}`;
  const code = new URLSearchParams(window.location.search).get("code");
  console.log("code", code);

  // Always call useAuth, but only use its result if accessToken is not set
  const authAccessToken = useAuth(code, redirectUri);
  const newAccessToken = accessToken || authAccessToken;
  console.log("newAccessToken", newAccessToken);
  console.log("authAccessToken", authAccessToken);

  useEffect(() => {
    if (newAccessToken && newAccessToken !== accessToken) {
      setAccessToken(newAccessToken);
      console.log("set access token in protected route to", newAccessToken);
    }
  }, [newAccessToken, accessToken, setAccessToken]);

  if (!code && !accessToken) {
    return <SpotifyLogin redirectUri={redirectUri} />;
  }

  return <Component accessToken={accessToken} {...rest} />;
};

export default ProtectedRoute;
