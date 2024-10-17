import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "af336f24a30e439b88ed899c0813426a",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) {
      return setSearchResults([]);
    } // if there isn't a value for search then set results to empty array
    if (!accessToken) {
      return;
    }

    // search spotify based on search value
    spotifyApi.searchTracks(search).then((res) => {
      console.log(res);
    });
  }, [search, accessToken]);

  return (
    <div>
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <Form.Control
          type="search"
          placeholder="search songs/artist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          Songs
        </div>
      </Container>
      <div>
        Dashboard
        <p>
          - code - <br />
          {code}
        </p>
        <p>
          - Access Token - <br />
          {accessToken}
        </p>
      </div>
    </div>
  );
}
