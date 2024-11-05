import React from "react";
import { useEffect, useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import PlaylistForm from "./PlaylistForm";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "af336f24a30e439b88ed899c0813426a",
});

export default function ImportPlaylistModal({
  showModal,
  handleModalClose,
  accessToken,
}) {
  const [userPlaylists, setUserPlaylist] = useState([]);

  /**
   * useEffect Hook 1 - setting SpotifyApi accesstoken
   *
   * Set accessToken in the Spotify API upon initial render of the page as
   * well as each time the accessToken changes from above
   */
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    const fetchAllPlaylists = async (offset = 0, accumulatedPlaylists = []) => {
      try {
        const res = await spotifyApi.getUserPlaylists({ limit: 50, offset });
        console.log("res -> ", res);
        const fetchedPlaylists = accumulatedPlaylists.concat(res.body.items);

        if (res.body.items.length === 50) {
          // If there are more playlists, recursively fetch the next page
          fetchAllPlaylists(offset + 50, fetchedPlaylists);
        } else {
          // No more playlists, set the accumulated playlists
          setUserPlaylist(fetchedPlaylists);
        }
      } catch (error) {
        console.log("error getting user playlists -> ", error);
      }
    };

    fetchAllPlaylists();
  }, [accessToken]);

  useEffect(() => {
    console.log("user playlists -> ", userPlaylists);
  }, [userPlaylists]);

  return (
    <Modal
      className="custom-modal"
      show={showModal}
      onHide={handleModalClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Import Playlist</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <PlaylistForm userPlaylists={userPlaylists} />
      </ModalBody>
    </Modal>
  );
}
