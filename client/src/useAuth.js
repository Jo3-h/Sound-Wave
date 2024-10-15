import { useState, useEffect, useRef } from "react";
import axios from "axios";

/*
useAuth - custom hook to manage Spotify API authentication
----------
This hook comunicates with the backend server to send a request for a spotify accessToken,
it utilises two useEffect functions to run based on dependancies code, refreshToken, and expiresIn

@param {string} code            // authorization code granted to uses through the spotify login screen
@returns { string | undefined } // current accessToken or undefined if none is available
*/

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const hasFetched = useRef(false);

  /**
   * useEffect function 1
   *
   * Run on initial render of calling page to post http request to server for accessToken, refreshToken,
   * and expiresIn value. Upon rerender the function will return undefined
   */
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

  /**
   * useEffect function 2
   *
   * Run on each timeout of the interval variable to obtain a new accessToken and expiresIn upon
   * expiry of current accessToken. Will return undefined
   */
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
            setExpiresIn(61);
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
