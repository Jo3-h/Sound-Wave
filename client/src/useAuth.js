import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const hasFetched = useRef(false);

  useEffect(() => {
    // if code has already executed or code is invalid, do not attempt to call the server API
    if (!code || hasFetched.current) {
      return;
    }

    hasFetched.current = true;
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        if (
          res.data.accessToken &&
          res.data.refreshToken &&
          res.data.expiresIn
        ) {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          console.log("Successfully set token information");
        } else {
          console.error("Missing token information from response");
          window.location = "/";
        }
      })
      .catch(() => {
        console.log("Error with axios request to server sides");
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    // if there isn't a refresh token or expires in set, then return
    if (!refreshToken || !expiresIn) {
      return;
    }

    // create a timeout for auto refresh
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          if (res.data.accessToken && res.data.expiresIn) {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
            console.log("Successfully refreshed token information");
          } else {
            console.error("Missing token information from response");
            window.location = "/";
          }
        })
        .catch(() => {
          console.log("Error with axios request to server sides");
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
