import React from "react";
import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

// import custom components
import TopTrackCard from "./TopTrackCard";
import TopArtistCard from "./TopArtistCard";

// import custom css styling sheets
import "./css/statisticsDashboard.css";

const spotifyApi = new SpotifyWebApi({
  clientId: "af336f24a30e439b88ed899c0813426a",
});

export default function StatisticsDashboard({
  accessToken,
  setPlayingTrack,
  playerRef,
}) {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [selectStat, setSelectStat] = useState("tracks");
  const [selectTime, setSelectTime] = useState("short_term");
  const [topTrackCardSelected, setTopTrackCardSelected] = useState("");
  const [topArtistCardSelected, setTopArtistCardSelected] = useState("");
  const [displayMessage, setTitleMessage] = useState("");
  const [username, setUsername] = useState("");
  const userProfileImage = useRef("");

  /**
   * useEffect Hook 1 - request user stats from backend
   *
   * This custom hook is called upon rendering of this component to fetch the users top tracks
   * and top artists for the short_term, medium_term, and long_term from the server using the
   * Spotify Web API with the accessToken passed to the component
   *
   * Dependancies:
   * - null
   */
  useEffect(() => {
    axios // request data from backend
      .get("http://localhost:3001/user-stats", {
        params: { accessToken },
      })
      .then((res) => {
        console.log("User Top Tracks -> ", res.data);
        setTopTracks(res.data.tracks);
        setTopArtists(res.data.artists);
      });

    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe().then((res) => {
      setUsername(res.body.display_name);
      userProfileImage.current = res.body.images[0].url;
      setSelectStat("tracks");
      setSelectTime("short_term");
    });
  }, []);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    let message = `${username}'s Top `;
    if (selectStat === "tracks") {
      message = message + "Tracks";
    } else {
      message = message + "Artists";
    }
    setTitleMessage(message);
  }, [selectStat, selectTime, username]);

  const handleSelectStat = (stat) => {
    if (selectStat === stat) {
      setSelectStat("");
    } else {
      setSelectStat(stat);
    }
  };

  const handleSelectTime = (time) => {
    if (selectTime === time) {
      setSelectTime("");
    } else {
      setSelectTime(time);
    }
  };

  return (
    <div className="content-container">
      <div className="stats-wrapper">
        <div className="stats-content">
          <div className="options-container">
            <div
              style={{
                height: "40px",
                display: "flex",
              }}
            >
              <div
                style={{
                  alignContent: "center",
                  fontSize: "12px",
                  width: "100px",
                  justifyContent: "right",
                }}
              >
                Stat Type:
              </div>
              <Button
                className="option-button"
                style={
                  selectStat === "tracks"
                    ? {
                        backgroundColor: "#d4d4d4",
                        fontWeight: "bold",
                        height: "30px",
                        width: "200px",
                        fontSize: "12px",
                        margin: "5px",
                      }
                    : {
                        backgroundColor: "white",
                        fontWeight: "lighter",
                        height: "20px",
                        width: "160px",
                        fontSize: "10px",
                        padding: "0",
                        margin: "10px 5px 10px 5px",
                      }
                }
                onClick={() => handleSelectStat("tracks")}
              >
                Top Tracks Stats
              </Button>
              <Button
                className="option-button"
                style={
                  selectStat === "artists"
                    ? {
                        backgroundColor: "#d4d4d4",
                        fontWeight: "bold",
                        height: "30px",
                        width: "200px",
                        fontSize: "12px",
                        margin: "5px",
                      }
                    : {
                        backgroundColor: "white",
                        fontWeight: "lighter",
                        height: "20px",
                        width: "160px",
                        fontSize: "10px",
                        padding: "0",
                        margin: "10px 5px 10px 5px",
                      }
                }
                onClick={() => handleSelectStat("artists")}
              >
                Top Artists Stats
              </Button>
            </div>
            <div
              style={{
                height: "40px",
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "right",
                }}
              >
                <div
                  style={{
                    alignContent: "center",
                    fontSize: "12px",
                    width: "100px",
                    justifyContent: "right",
                    flexWrap: "wrap",
                  }}
                >
                  Time Frame:
                </div>
              </div>

              <Button
                className="option-button"
                style={
                  selectTime === "short_term"
                    ? {
                        backgroundColor: "#d4d4d4",
                        fontWeight: "bold",
                        height: "30px",
                        width: "200px",
                        fontSize: "12px",
                        margin: "5px",
                      }
                    : {
                        backgroundColor: "white",
                        fontWeight: "lighter",
                        height: "20px",
                        width: "160px",
                        fontSize: "10px",
                        padding: "0",
                        margin: "10px 5px 10px 5px",
                      }
                }
                onClick={() => handleSelectTime("short_term")}
              >
                Last 4 Weeks
              </Button>
              <Button
                className="option-button"
                style={
                  selectTime === "medium_term"
                    ? {
                        backgroundColor: "#d4d4d4",
                        fontWeight: "bold",
                        height: "30px",
                        width: "200px",
                        fontSize: "12px",
                        margin: "5px",
                      }
                    : {
                        backgroundColor: "white",
                        fontWeight: "lighter",
                        height: "20px",
                        width: "160px",
                        fontSize: "10px",
                        padding: "0",
                        margin: "10px 5px 10px 5px",
                      }
                }
                onClick={() => handleSelectTime("medium_term")}
              >
                Last 6 Months
              </Button>
              <Button
                className="option-button"
                style={
                  selectTime === "long_term"
                    ? {
                        backgroundColor: "#d4d4d4",
                        fontWeight: "bold",
                        height: "30px",
                        width: "200px",
                        fontSize: "12px",
                        margin: "5px",
                      }
                    : {
                        backgroundColor: "white",
                        fontWeight: "lighter",
                        height: "20px",
                        width: "160px",
                        fontSize: "10px",
                        padding: "0",
                        margin: "10px 5px 10px 5px",
                      }
                }
                onClick={() => handleSelectTime("long_term")}
              >
                Last 12 Months
              </Button>
            </div>
            <div
              style={{
                height: "calc(100% - 80px)",
                weight: "100%",
                fontSize: "26px",
                fontWeight: "bolder",
                margin: "10px",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              {displayMessage}
            </div>
          </div>
          <div>
            {selectStat === "tracks" &&
              topTracks
                .filter((track_array) => track_array.term === selectTime)
                .map((track_array) =>
                  track_array.topTracks.map((track, index) => (
                    <TopTrackCard
                      key={track.id}
                      track={track}
                      index={index + 1}
                      setPlayingTrack={setPlayingTrack}
                      setTopTrackCardSelected={setTopTrackCardSelected}
                      isPlaying={topTrackCardSelected === track.id}
                    />
                  ))
                )}
            {selectStat === "artists" && (
              <div className="artist-grid">
                {topArtists
                  .filter((artist_array) => artist_array.term === selectTime)
                  .flatMap((artist_array) =>
                    artist_array.topArtists.map((artist, index) => (
                      <TopArtistCard
                        key={artist.id}
                        artist={artist}
                        index={index + 1}
                        setPlayingTrack={setPlayingTrack}
                        setTopArtistSelected={setTopArtistCardSelected}
                        isPlaying={topArtistCardSelected === artist.id}
                      />
                    ))
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// EXAMPLE OF ARTIST OBJECT
/**
 * {
    "external_urls": {
        "spotify": "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb"
    },
    "followers": {
        "href": null,
        "total": 10744857
    },
    "genres": [
        "alternative rock",
        "art rock",
        "melancholia",
        "oxford indie",
        "permanent wave",
        "rock"
    ],
    "href": "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
    "id": "4Z8W4fKeB5YxbusRsdQVPb",
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/ab6761610000e5eba03696716c9ee605006047fd",
            "width": 640
        },
        {
            "height": 320,
            "url": "https://i.scdn.co/image/ab67616100005174a03696716c9ee605006047fd",
            "width": 320
        },
        {
            "height": 160,
            "url": "https://i.scdn.co/image/ab6761610000f178a03696716c9ee605006047fd",
            "width": 160
        }
    ],
    "name": "Radiohead",
    "popularity": 84,
    "type": "artist",
    "uri": "spotify:artist:4Z8W4fKeB5YxbusRsdQVPb"
}
 */

// EXAMPLE OF TRACK OBJECT
/**
 * {
    "album": {
        "album_type": "ALBUM",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb"
                },
                "href": "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
                "id": "4Z8W4fKeB5YxbusRsdQVPb",
                "name": "Radiohead",
                "type": "artist",
                "uri": "spotify:artist:4Z8W4fKeB5YxbusRsdQVPb"
            }
        ],
        "available_markets": [
            "AU",
        ],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/6GjwtEZcfenmOf6l18N7T7"
        },
        "href": "https://api.spotify.com/v1/albums/6GjwtEZcfenmOf6l18N7T7",
        "id": "6GjwtEZcfenmOf6l18N7T7",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2736c7112082b63beefffe40151",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e026c7112082b63beefffe40151",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048516c7112082b63beefffe40151",
                "width": 64
            }
        ],
        "name": "Kid A",
        "release_date": "2000-10-02",
        "release_date_precision": "day",
        "total_tracks": 11,
        "type": "album",
        "uri": "spotify:album:6GjwtEZcfenmOf6l18N7T7"
    },
    "artists": [
        {
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb"
            },
            "href": "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
            "id": "4Z8W4fKeB5YxbusRsdQVPb",
            "name": "Radiohead",
            "type": "artist",
            "uri": "spotify:artist:4Z8W4fKeB5YxbusRsdQVPb"
        }
    ],
    "available_markets": [
        "XK"
    ],
    "disc_number": 1,
    "duration_ms": 356333,
    "explicit": false,
    "external_ids": {
        "isrc": "GBAYE0000813"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/2rtGaCAeYtmcIvuZsvgTf6"
    },
    "href": "https://api.spotify.com/v1/tracks/2rtGaCAeYtmcIvuZsvgTf6",
    "id": "2rtGaCAeYtmcIvuZsvgTf6",
    "is_local": false,
    "name": "How to Disappear Completely",
    "popularity": 67,
    "preview_url": "https://p.scdn.co/mp3-preview/7236209a1042a9508b66d02bd18deed9bfd4bb99?cid=af336f24a30e439b88ed899c0813426a",
    "track_number": 4,
    "type": "track",
    "uri": "spotify:track:2rtGaCAeYtmcIvuZsvgTf6"
}
 */
