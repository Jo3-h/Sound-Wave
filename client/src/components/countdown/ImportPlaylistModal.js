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
      className="modal-content"
      style={{ height: "40%", maxHeight: "600px" }}
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

// {
//   "href": "https://api.spotify.com/v1/users/joe_hosking/playlists?offset=0&limit=50&locale=en-GB,en-US;q%3D0.9,en;q%3D0.8",
//   "limit": 50,
//   "next": "https://api.spotify.com/v1/users/joe_hosking/playlists?offset=50&limit=50&locale=en-GB,en-US;q%3D0.9,en;q%3D0.8",
//   "offset": 0,
//   "previous": null,
//   "total": 52,
//   "items": [
//     {
//       "collaborative": false,
//       "description": "好狗屎",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/0PnE6foeWbiB0BCBQxjmzK"
//       },
//       "href": "https://api.spotify.com/v1/playlists/0PnE6foeWbiB0BCBQxjmzK",
//       "id": "0PnE6foeWbiB0BCBQxjmzK",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e022e02117d76426a08ac7c174fab67616d00001e025b7865be7f7fcc05faec6137ab67616d00001e02d3f287e73f69eb431ee17f50ab67616d00001e02df7600498a07afd75f83d067",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e022e02117d76426a08ac7c174fab67616d00001e025b7865be7f7fcc05faec6137ab67616d00001e02d3f287e73f69eb431ee17f50ab67616d00001e02df7600498a07afd75f83d067",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e022e02117d76426a08ac7c174fab67616d00001e025b7865be7f7fcc05faec6137ab67616d00001e02d3f287e73f69eb431ee17f50ab67616d00001e02df7600498a07afd75f83d067",
//           "width": 60
//         }
//       ],
//       "name": "science/fiction",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAARPYH5x+xkRaUS1Zvfg7lNdOcTe87L",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/0PnE6foeWbiB0BCBQxjmzK/tracks",
//         "total": 2538
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:0PnE6foeWbiB0BCBQxjmzK"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/0euE659qDabGJUHZ6umXFB"
//       },
//       "href": "https://api.spotify.com/v1/playlists/0euE659qDabGJUHZ6umXFB",
//       "id": "0euE659qDabGJUHZ6umXFB",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e020c471c36970b9406233842a5ab67616d00001e02595101c281d7e229e1f0e6c4ab67616d00001e027622b889949b07f15c6b57e2ab67616d00001e02c5649add07ed3720be9d5526",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e020c471c36970b9406233842a5ab67616d00001e02595101c281d7e229e1f0e6c4ab67616d00001e027622b889949b07f15c6b57e2ab67616d00001e02c5649add07ed3720be9d5526",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e020c471c36970b9406233842a5ab67616d00001e02595101c281d7e229e1f0e6c4ab67616d00001e027622b889949b07f15c6b57e2ab67616d00001e02c5649add07ed3720be9d5526",
//           "width": 60
//         }
//       ],
//       "name": "Anchor.FM",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAABABfUbTnlK6akaV5csKjwe3AWtbML",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/0euE659qDabGJUHZ6umXFB/tracks",
//         "total": 222
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:0euE659qDabGJUHZ6umXFB"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/4XeDiBgyx8kAX2hZBgWuPQ"
//       },
//       "href": "https://api.spotify.com/v1/playlists/4XeDiBgyx8kAX2hZBgWuPQ",
//       "id": "4XeDiBgyx8kAX2hZBgWuPQ",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e027aede4855f6d0d738012e2e5ab67616d00001e028940ac99f49e44f59e6f7fb3ab67616d00001e02a47ee7a49c53ccdcb38dc874ab67616d00001e02e08b1250db5f75643f1508c9",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e027aede4855f6d0d738012e2e5ab67616d00001e028940ac99f49e44f59e6f7fb3ab67616d00001e02a47ee7a49c53ccdcb38dc874ab67616d00001e02e08b1250db5f75643f1508c9",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e027aede4855f6d0d738012e2e5ab67616d00001e028940ac99f49e44f59e6f7fb3ab67616d00001e02a47ee7a49c53ccdcb38dc874ab67616d00001e02e08b1250db5f75643f1508c9",
//           "width": 60
//         }
//       ],
//       "name": "LOVE.frequencies",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAT/DcyobNfFXwysgkxT2fNvkBoJOZ",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/4XeDiBgyx8kAX2hZBgWuPQ/tracks",
//         "total": 60
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:4XeDiBgyx8kAX2hZBgWuPQ"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/2KUxKN0LjAqPjsobqnX0Ra"
//       },
//       "href": "https://api.spotify.com/v1/playlists/2KUxKN0LjAqPjsobqnX0Ra",
//       "id": "2KUxKN0LjAqPjsobqnX0Ra",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e025d46e4578c8e1adad9206480ab67616d00001e026b470a1425fd95cc4ce4e991ab67616d00001e026ca5c90113b30c3c43ffb8f4ab67616d00001e028b52c6b9bc4e43d873869699",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e025d46e4578c8e1adad9206480ab67616d00001e026b470a1425fd95cc4ce4e991ab67616d00001e026ca5c90113b30c3c43ffb8f4ab67616d00001e028b52c6b9bc4e43d873869699",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e025d46e4578c8e1adad9206480ab67616d00001e026b470a1425fd95cc4ce4e991ab67616d00001e026ca5c90113b30c3c43ffb8f4ab67616d00001e028b52c6b9bc4e43d873869699",
//           "width": 60
//         }
//       ],
//       "name": "workout.FM",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAQ8Ip208fDPiHMLTVe1JZsNGlkkYg",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/2KUxKN0LjAqPjsobqnX0Ra/tracks",
//         "total": 62
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:2KUxKN0LjAqPjsobqnX0Ra"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/4f2eWopVtjnnPrPjSQmCZB"
//       },
//       "href": "https://api.spotify.com/v1/playlists/4f2eWopVtjnnPrPjSQmCZB",
//       "id": "4f2eWopVtjnnPrPjSQmCZB",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e0225b055377757b3cdd6f26b78ab67616d00001e026610c21366e613bfd9f5d197ab67616d00001e026c7112082b63beefffe40151ab67616d00001e02c5649add07ed3720be9d5526",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e0225b055377757b3cdd6f26b78ab67616d00001e026610c21366e613bfd9f5d197ab67616d00001e026c7112082b63beefffe40151ab67616d00001e02c5649add07ed3720be9d5526",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e0225b055377757b3cdd6f26b78ab67616d00001e026610c21366e613bfd9f5d197ab67616d00001e026c7112082b63beefffe40151ab67616d00001e02c5649add07ed3720be9d5526",
//           "width": 60
//         }
//       ],
//       "name": "hottest-100-test",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAECgdVx5d4jDS6SaLDuU5Q91LExob",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/4f2eWopVtjnnPrPjSQmCZB/tracks",
//         "total": 15
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:4f2eWopVtjnnPrPjSQmCZB"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/5yVBFdQAeQ8yB8vvNC3JVj"
//       },
//       "href": "https://api.spotify.com/v1/playlists/5yVBFdQAeQ8yB8vvNC3JVj",
//       "id": "5yVBFdQAeQ8yB8vvNC3JVj",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e0225b055377757b3cdd6f26b78ab67616d00001e028746fc698ca9bbccd85c39c2ab67616d00001e02c2bfb82f7c041397d897b8b1ab67616d00001e02e1fc562d74fee8e0b36e742e",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e0225b055377757b3cdd6f26b78ab67616d00001e028746fc698ca9bbccd85c39c2ab67616d00001e02c2bfb82f7c041397d897b8b1ab67616d00001e02e1fc562d74fee8e0b36e742e",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e0225b055377757b3cdd6f26b78ab67616d00001e028746fc698ca9bbccd85c39c2ab67616d00001e02c2bfb82f7c041397d897b8b1ab67616d00001e02e1fc562d74fee8e0b36e742e",
//           "width": 60
//         }
//       ],
//       "name": "Michael is a gay cunt",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAKsbdalrItbua8lMiA9ufvsGSShWU",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/5yVBFdQAeQ8yB8vvNC3JVj/tracks",
//         "total": 40
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:5yVBFdQAeQ8yB8vvNC3JVj"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/77ILeSWLI4XcoEUY8UO5gc"
//       },
//       "href": "https://api.spotify.com/v1/playlists/77ILeSWLI4XcoEUY8UO5gc",
//       "id": "77ILeSWLI4XcoEUY8UO5gc",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e020cd942c1a864afa4e92d04f2ab67616d00001e026c7112082b63beefffe40151ab67616d00001e02cad190f1a73c024e5a40ddddab67616d00001e02de3c04b5fc750b68899b20a9",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e020cd942c1a864afa4e92d04f2ab67616d00001e026c7112082b63beefffe40151ab67616d00001e02cad190f1a73c024e5a40ddddab67616d00001e02de3c04b5fc750b68899b20a9",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e020cd942c1a864afa4e92d04f2ab67616d00001e026c7112082b63beefffe40151ab67616d00001e02cad190f1a73c024e5a40ddddab67616d00001e02de3c04b5fc750b68899b20a9",
//           "width": 60
//         }
//       ],
//       "name": "Ethereal ",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAADKatd1GWVxNIJlnZ7mXN4sr2OvVf",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/77ILeSWLI4XcoEUY8UO5gc/tracks",
//         "total": 10
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:77ILeSWLI4XcoEUY8UO5gc"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/2EUMQNtXEJc9qzU0MhfLiy"
//       },
//       "href": "https://api.spotify.com/v1/playlists/2EUMQNtXEJc9qzU0MhfLiy",
//       "id": "2EUMQNtXEJc9qzU0MhfLiy",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e022fee61bfec596bb6f5447c50ab67616d00001e026a760642a56847027428cb61ab67616d00001e0286e5468d84ed66f06d9a799eab67616d00001e02aff6573c5110e0732fbab3d8",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e022fee61bfec596bb6f5447c50ab67616d00001e026a760642a56847027428cb61ab67616d00001e0286e5468d84ed66f06d9a799eab67616d00001e02aff6573c5110e0732fbab3d8",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e022fee61bfec596bb6f5447c50ab67616d00001e026a760642a56847027428cb61ab67616d00001e0286e5468d84ed66f06d9a799eab67616d00001e02aff6573c5110e0732fbab3d8",
//           "width": 60
//         }
//       ],
//       "name": "Nanna's Bowling Club",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAGe8h09HDifTdtyS+ryDqk/BQ8zm7",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/2EUMQNtXEJc9qzU0MhfLiy/tracks",
//         "total": 23
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:2EUMQNtXEJc9qzU0MhfLiy"
//     },
//     {
//       "collaborative": false,
//       "description": "All kinds of music, selected by your own AI DJ.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/37i9dQZF1EYkqdzj48dyYq"
//       },
//       "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EYkqdzj48dyYq",
//       "id": "37i9dQZF1EYkqdzj48dyYq",
//       "images": [
//         {
//           "height": null,
//           "url": "https://lexicon-assets.spotifycdn.com/DJ-Beta-CoverArt-300.jpg",
//           "width": null
//         }
//       ],
//       "name": "DJ",
//       "owner": {
//         "display_name": "Spotify",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/spotify"
//         },
//         "href": "https://api.spotify.com/v1/users/spotify",
//         "id": "spotify",
//         "type": "user",
//         "uri": "spotify:user:spotify"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAAAAAAABxX0NVQ7rBo2sgjS+DuR6h",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EYkqdzj48dyYq/tracks",
//         "total": 0
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:37i9dQZF1EYkqdzj48dyYq"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/45mKoHBjUmXc91hEa6lOml"
//       },
//       "href": "https://api.spotify.com/v1/playlists/45mKoHBjUmXc91hEa6lOml",
//       "id": "45mKoHBjUmXc91hEa6lOml",
//       "images": [
//         {
//           "height": null,
//           "url": "https://i.scdn.co/image/ab67616d00001e02a47ee7a49c53ccdcb38dc874",
//           "width": null
//         }
//       ],
//       "name": "LOVE",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAABIGNmYrLCZW2tYV1TedhX60wq7//",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/45mKoHBjUmXc91hEa6lOml/tracks",
//         "total": 2
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:45mKoHBjUmXc91hEa6lOml"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/49nL6YgTQKf2klww7NaWMZ"
//       },
//       "href": "https://api.spotify.com/v1/playlists/49nL6YgTQKf2klww7NaWMZ",
//       "id": "49nL6YgTQKf2klww7NaWMZ",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e0210e6745bb2f179dd3616b85fab67616d00001e027d6cd95a046a3c0dacbc7d33ab67616d00001e02b84e077bb3f2e36adbdeb6d4ab67616d00001e02cc3d962daa7e5d11efc6563e",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e0210e6745bb2f179dd3616b85fab67616d00001e027d6cd95a046a3c0dacbc7d33ab67616d00001e02b84e077bb3f2e36adbdeb6d4ab67616d00001e02cc3d962daa7e5d11efc6563e",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e0210e6745bb2f179dd3616b85fab67616d00001e027d6cd95a046a3c0dacbc7d33ab67616d00001e02b84e077bb3f2e36adbdeb6d4ab67616d00001e02cc3d962daa7e5d11efc6563e",
//           "width": 60
//         }
//       ],
//       "name": "UPBEAT",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAD9oRZS5sipNN4n91vlQn2E1jClyw",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/49nL6YgTQKf2klww7NaWMZ/tracks",
//         "total": 13
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:49nL6YgTQKf2klww7NaWMZ"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/6pKKuBKxkDDbdXfIOgTkMs"
//       },
//       "href": "https://api.spotify.com/v1/playlists/6pKKuBKxkDDbdXfIOgTkMs",
//       "id": "6pKKuBKxkDDbdXfIOgTkMs",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e0278de8b28de36a74afc0348b5ab67616d00001e027d37a4cb9bf92e31e2162fd7ab67616d00001e02aa739a5e844220bb44a64adcab67616d00001e02c2bfb82f7c041397d897b8b1",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e0278de8b28de36a74afc0348b5ab67616d00001e027d37a4cb9bf92e31e2162fd7ab67616d00001e02aa739a5e844220bb44a64adcab67616d00001e02c2bfb82f7c041397d897b8b1",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e0278de8b28de36a74afc0348b5ab67616d00001e027d37a4cb9bf92e31e2162fd7ab67616d00001e02aa739a5e844220bb44a64adcab67616d00001e02c2bfb82f7c041397d897b8b1",
//           "width": 60
//         }
//       ],
//       "name": "HARD DANCE",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAB5ZHdDq/evDSga+cxPfbVpONxVxi",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/6pKKuBKxkDDbdXfIOgTkMs/tracks",
//         "total": 5
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:6pKKuBKxkDDbdXfIOgTkMs"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/5J5GKWb4a0xJZCIR3t5pjU"
//       },
//       "href": "https://api.spotify.com/v1/playlists/5J5GKWb4a0xJZCIR3t5pjU",
//       "id": "5J5GKWb4a0xJZCIR3t5pjU",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e021e816be3575d007cc77bac94ab67616d00001e022e02117d76426a08ac7c174fab67616d00001e02a6625f9fffcbd29e556293e9ab67616d00001e02d9fe75fdf3c39ae51240ceca",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e021e816be3575d007cc77bac94ab67616d00001e022e02117d76426a08ac7c174fab67616d00001e02a6625f9fffcbd29e556293e9ab67616d00001e02d9fe75fdf3c39ae51240ceca",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e021e816be3575d007cc77bac94ab67616d00001e022e02117d76426a08ac7c174fab67616d00001e02a6625f9fffcbd29e556293e9ab67616d00001e02d9fe75fdf3c39ae51240ceca",
//           "width": 60
//         }
//       ],
//       "name": "SOFT DANCE",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAEWnLr9umjVbNQLxhxrooYvNi90h1",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/5J5GKWb4a0xJZCIR3t5pjU/tracks",
//         "total": 15
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:5J5GKWb4a0xJZCIR3t5pjU"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/50WwIEeaIMh16sjHCcv8SO"
//       },
//       "href": "https://api.spotify.com/v1/playlists/50WwIEeaIMh16sjHCcv8SO",
//       "id": "50WwIEeaIMh16sjHCcv8SO",
//       "images": [
//         {
//           "height": null,
//           "url": "https://i.scdn.co/image/ab67616d00001e0270dbc9f47669d120ad874ec1",
//           "width": null
//         }
//       ],
//       "name": "SMOOTH",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAABZBk19O8Vg+mCQ1azfaK1KTmyjde",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/50WwIEeaIMh16sjHCcv8SO/tracks",
//         "total": 3
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:50WwIEeaIMh16sjHCcv8SO"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/11topXKvPCjdwB5NH1rAlv"
//       },
//       "href": "https://api.spotify.com/v1/playlists/11topXKvPCjdwB5NH1rAlv",
//       "id": "11topXKvPCjdwB5NH1rAlv",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e020cd942c1a864afa4e92d04f2ab67616d00001e025986d0cd52e16f556c70d2c2ab67616d00001e0270dbc9f47669d120ad874ec1ab67616d00001e02c5649add07ed3720be9d5526",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e020cd942c1a864afa4e92d04f2ab67616d00001e025986d0cd52e16f556c70d2c2ab67616d00001e0270dbc9f47669d120ad874ec1ab67616d00001e02c5649add07ed3720be9d5526",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e020cd942c1a864afa4e92d04f2ab67616d00001e025986d0cd52e16f556c70d2c2ab67616d00001e0270dbc9f47669d120ad874ec1ab67616d00001e02c5649add07ed3720be9d5526",
//           "width": 60
//         }
//       ],
//       "name": "FLOATING",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAACVnk7VQG/Wagi2aKJcZ58kyXamMZ",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/11topXKvPCjdwB5NH1rAlv/tracks",
//         "total": 7
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:11topXKvPCjdwB5NH1rAlv"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/3qkCyQc51ewgKkRaQ9IsFt"
//       },
//       "href": "https://api.spotify.com/v1/playlists/3qkCyQc51ewgKkRaQ9IsFt",
//       "id": "3qkCyQc51ewgKkRaQ9IsFt",
//       "images": [
//         {
//           "height": null,
//           "url": "https://i.scdn.co/image/ab67616d00001e02c3c9109636a187c61b6c7717",
//           "width": null
//         }
//       ],
//       "name": "HAPPY",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAABFungjW9XPoIZ5UwpZhTwez0Zc5L",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/3qkCyQc51ewgKkRaQ9IsFt/tracks",
//         "total": 2
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:3qkCyQc51ewgKkRaQ9IsFt"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/6rY5fBNNqj3CoLtZL25ssL"
//       },
//       "href": "https://api.spotify.com/v1/playlists/6rY5fBNNqj3CoLtZL25ssL",
//       "id": "6rY5fBNNqj3CoLtZL25ssL",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e02619148c724e3bff56baadaffab67616d00001e02661d019f34569f79eae9e985ab67616d00001e02a6d6e4d30c273873f375b541ab67616d00001e02acebb58ea70a6e5ff1c4d261",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e02619148c724e3bff56baadaffab67616d00001e02661d019f34569f79eae9e985ab67616d00001e02a6d6e4d30c273873f375b541ab67616d00001e02acebb58ea70a6e5ff1c4d261",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e02619148c724e3bff56baadaffab67616d00001e02661d019f34569f79eae9e985ab67616d00001e02a6d6e4d30c273873f375b541ab67616d00001e02acebb58ea70a6e5ff1c4d261",
//           "width": 60
//         }
//       ],
//       "name": "SAD",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAG6ob+xls8skY4b1TFl8z65bofrdo",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/6rY5fBNNqj3CoLtZL25ssL/tracks",
//         "total": 25
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:6rY5fBNNqj3CoLtZL25ssL"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/6BPryZJ8ghJ1au0kCy6HhE"
//       },
//       "href": "https://api.spotify.com/v1/playlists/6BPryZJ8ghJ1au0kCy6HhE",
//       "id": "6BPryZJ8ghJ1au0kCy6HhE",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e021c0bcf8b536295438d26c70dab67616d00001e021e816be3575d007cc77bac94ab67616d00001e02b2f893f4215f2930e7320355ab67616d00001e02b792922b3b1dff076c151a0d",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e021c0bcf8b536295438d26c70dab67616d00001e021e816be3575d007cc77bac94ab67616d00001e02b2f893f4215f2930e7320355ab67616d00001e02b792922b3b1dff076c151a0d",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e021c0bcf8b536295438d26c70dab67616d00001e021e816be3575d007cc77bac94ab67616d00001e02b2f893f4215f2930e7320355ab67616d00001e02b792922b3b1dff076c151a0d",
//           "width": 60
//         }
//       ],
//       "name": "In your body",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAG1PcmRlUd/4YQrntOmwsAd3hkXoN",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/6BPryZJ8ghJ1au0kCy6HhE/tracks",
//         "total": 26
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:6BPryZJ8ghJ1au0kCy6HhE"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/6mr46grGQiRIrKW0rGfAwi"
//       },
//       "href": "https://api.spotify.com/v1/playlists/6mr46grGQiRIrKW0rGfAwi",
//       "id": "6mr46grGQiRIrKW0rGfAwi",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e022e02117d76426a08ac7c174fab67616d00001e0278de8b28de36a74afc0348b5ab67616d00001e02aa739a5e844220bb44a64adcab67616d00001e02d843fabb75fef14010e30cae",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e022e02117d76426a08ac7c174fab67616d00001e0278de8b28de36a74afc0348b5ab67616d00001e02aa739a5e844220bb44a64adcab67616d00001e02d843fabb75fef14010e30cae",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e022e02117d76426a08ac7c174fab67616d00001e0278de8b28de36a74afc0348b5ab67616d00001e02aa739a5e844220bb44a64adcab67616d00001e02d843fabb75fef14010e30cae",
//           "width": 60
//         }
//       ],
//       "name": "workout.AM",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAB6ZUmgJBXdimJnGa4hlkPOwnwLxZ",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/6mr46grGQiRIrKW0rGfAwi/tracks",
//         "total": 6
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:6mr46grGQiRIrKW0rGfAwi"
//     },
//     {
//       "collaborative": false,
//       "description": "A Blend of music for Joe, Michael, Harvey, Kyle and 4 others. Updates daily.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/37i9dQZF1EJGCWT995p0vS"
//       },
//       "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EJGCWT995p0vS",
//       "id": "37i9dQZF1EJGCWT995p0vS",
//       "images": [
//         {
//           "height": null,
//           "url": "https://blend-playlist-covers.spotifycdn.com/group-blends-v1/group-blend-green-1-DEFAULT-en-GB.jpg",
//           "width": null
//         }
//       ],
//       "name": "Joe + 7 others",
//       "owner": {
//         "display_name": "Spotify",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/spotify"
//         },
//         "href": "https://api.spotify.com/v1/users/spotify",
//         "id": "spotify",
//         "type": "user",
//         "uri": "spotify:user:spotify"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAAAAAAADoJPIIUIhgFHlqBS7/dvQZ",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EJGCWT995p0vS/tracks",
//         "total": 50
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:37i9dQZF1EJGCWT995p0vS"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/6KtK2YwV9AFLfJnDNLAq4Y"
//       },
//       "href": "https://api.spotify.com/v1/playlists/6KtK2YwV9AFLfJnDNLAq4Y",
//       "id": "6KtK2YwV9AFLfJnDNLAq4Y",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e021c1c33c63cdbcb5788975a93ab67616d00001e0228f137f2d8bda3ddd5d045cfab67616d00001e0270dbc9f47669d120ad874ec1ab67616d00001e02d3f287e73f69eb431ee17f50",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e021c1c33c63cdbcb5788975a93ab67616d00001e0228f137f2d8bda3ddd5d045cfab67616d00001e0270dbc9f47669d120ad874ec1ab67616d00001e02d3f287e73f69eb431ee17f50",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e021c1c33c63cdbcb5788975a93ab67616d00001e0228f137f2d8bda3ddd5d045cfab67616d00001e0270dbc9f47669d120ad874ec1ab67616d00001e02d3f287e73f69eb431ee17f50",
//           "width": 60
//         }
//       ],
//       "name": "potential sex playlist",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAIlpaRtiMwW6aw3T+QykB9JiIfpvk",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/6KtK2YwV9AFLfJnDNLAq4Y/tracks",
//         "total": 28
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:6KtK2YwV9AFLfJnDNLAq4Y"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/2sWD9ot3qagt7wFWR4kSOV"
//       },
//       "href": "https://api.spotify.com/v1/playlists/2sWD9ot3qagt7wFWR4kSOV",
//       "id": "2sWD9ot3qagt7wFWR4kSOV",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e023782d9f9058ef3cc963c09ccab67616d00001e02595101c281d7e229e1f0e6c4ab67616d00001e02b4d59e6fa7e5e7cbc57ac33aab67616d00001e02b57074c36a92143915fecee3",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e023782d9f9058ef3cc963c09ccab67616d00001e02595101c281d7e229e1f0e6c4ab67616d00001e02b4d59e6fa7e5e7cbc57ac33aab67616d00001e02b57074c36a92143915fecee3",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e023782d9f9058ef3cc963c09ccab67616d00001e02595101c281d7e229e1f0e6c4ab67616d00001e02b4d59e6fa7e5e7cbc57ac33aab67616d00001e02b57074c36a92143915fecee3",
//           "width": 60
//         }
//       ],
//       "name": "SOUL radio",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAyUcARgLjR79B3hepcYKPtekhdqlx",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/2sWD9ot3qagt7wFWR4kSOV/tracks",
//         "total": 142
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:2sWD9ot3qagt7wFWR4kSOV"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/7pOaKDpuD8TfbDOEHQjczc"
//       },
//       "href": "https://api.spotify.com/v1/playlists/7pOaKDpuD8TfbDOEHQjczc",
//       "id": "7pOaKDpuD8TfbDOEHQjczc",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e020009ff4085864d592d09cbdaab67616d00001e02072e9faef2ef7b6db63834a3ab67616d00001e025d7d7120db1b859d5077e1d2ab67616d00001e02f907de96b9a4fbc04accc0d5",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e020009ff4085864d592d09cbdaab67616d00001e02072e9faef2ef7b6db63834a3ab67616d00001e025d7d7120db1b859d5077e1d2ab67616d00001e02f907de96b9a4fbc04accc0d5",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e020009ff4085864d592d09cbdaab67616d00001e02072e9faef2ef7b6db63834a3ab67616d00001e025d7d7120db1b859d5077e1d2ab67616d00001e02f907de96b9a4fbc04accc0d5",
//           "width": 60
//         }
//       ],
//       "name": "DANCE.AM",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAABLP9AVojpRhXkQh5flfSJ+d/xJJeC",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/7pOaKDpuD8TfbDOEHQjczc/tracks",
//         "total": 140
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:7pOaKDpuD8TfbDOEHQjczc"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/004JfLMAfbUO0w1zkgJQya"
//       },
//       "href": "https://api.spotify.com/v1/playlists/004JfLMAfbUO0w1zkgJQya",
//       "id": "004JfLMAfbUO0w1zkgJQya",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e0290b8a540137ee2a718a369f9ab67616d00001e029e1cfc756886ac782e363d79ab67616d00001e02bf7c317a63c4f128b8823406ab67616d00001e02f6bdf2250d0637d8e8d12935",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e0290b8a540137ee2a718a369f9ab67616d00001e029e1cfc756886ac782e363d79ab67616d00001e02bf7c317a63c4f128b8823406ab67616d00001e02f6bdf2250d0637d8e8d12935",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e0290b8a540137ee2a718a369f9ab67616d00001e029e1cfc756886ac782e363d79ab67616d00001e02bf7c317a63c4f128b8823406ab67616d00001e02f6bdf2250d0637d8e8d12935",
//           "width": 60
//         }
//       ],
//       "name": "house party",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAgReGUgsnOZ//oIIYozdyvewK2BOS",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/004JfLMAfbUO0w1zkgJQya/tracks",
//         "total": 103
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:004JfLMAfbUO0w1zkgJQya"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/0C4MNJ6GIsxjoMHHmM0oRQ"
//       },
//       "href": "https://api.spotify.com/v1/playlists/0C4MNJ6GIsxjoMHHmM0oRQ",
//       "id": "0C4MNJ6GIsxjoMHHmM0oRQ",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e02072e9faef2ef7b6db63834a3ab67616d00001e0278de8b28de36a74afc0348b5ab67616d00001e02ce159a3ba2096e13fa9d4b4cab67616d00001e02fcd3724fba954e6104e4530d",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e02072e9faef2ef7b6db63834a3ab67616d00001e0278de8b28de36a74afc0348b5ab67616d00001e02ce159a3ba2096e13fa9d4b4cab67616d00001e02fcd3724fba954e6104e4530d",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e02072e9faef2ef7b6db63834a3ab67616d00001e0278de8b28de36a74afc0348b5ab67616d00001e02ce159a3ba2096e13fa9d4b4cab67616d00001e02fcd3724fba954e6104e4530d",
//           "width": 60
//         }
//       ],
//       "name": "energy",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": false,
//       "snapshot_id": "AAAANYwEZc09h1T71D+7aZSb6+djJXvk",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/0C4MNJ6GIsxjoMHHmM0oRQ/tracks",
//         "total": 49
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:0C4MNJ6GIsxjoMHHmM0oRQ"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/3K04IP9nnWtfRkugZ19Dtw"
//       },
//       "href": "https://api.spotify.com/v1/playlists/3K04IP9nnWtfRkugZ19Dtw",
//       "id": "3K04IP9nnWtfRkugZ19Dtw",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e022801552d2b5fdf55c814a42cab67616d00001e02d9fe75fdf3c39ae51240cecaab67616d00001e02de8b653acb692b4ce30b49a5ab67616d00001e02e1fc562d74fee8e0b36e742e",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e022801552d2b5fdf55c814a42cab67616d00001e02d9fe75fdf3c39ae51240cecaab67616d00001e02de8b653acb692b4ce30b49a5ab67616d00001e02e1fc562d74fee8e0b36e742e",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e022801552d2b5fdf55c814a42cab67616d00001e02d9fe75fdf3c39ae51240cecaab67616d00001e02de8b653acb692b4ce30b49a5ab67616d00001e02e1fc562d74fee8e0b36e742e",
//           "width": 60
//         }
//       ],
//       "name": "Soul music",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAABpRP2DROa12zAwJb3VelAT7uuslB",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/3K04IP9nnWtfRkugZ19Dtw/tracks",
//         "total": 5
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:3K04IP9nnWtfRkugZ19Dtw"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/7h0vGBlJbLmgCkkkPtsvV8"
//       },
//       "href": "https://api.spotify.com/v1/playlists/7h0vGBlJbLmgCkkkPtsvV8",
//       "id": "7h0vGBlJbLmgCkkkPtsvV8",
//       "images": [
//         {
//           "height": null,
//           "url": "https://i.scdn.co/image/ab67616d00001e023e94984ffd2929be2df61582",
//           "width": null
//         }
//       ],
//       "name": "Breakup",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAA/NXx9LF/yrZFVH96AQAeEKPJOD1",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/7h0vGBlJbLmgCkkkPtsvV8/tracks",
//         "total": 2
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:7h0vGBlJbLmgCkkkPtsvV8"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/4w7x5sFfGVff3hIiQms0mq"
//       },
//       "href": "https://api.spotify.com/v1/playlists/4w7x5sFfGVff3hIiQms0mq",
//       "id": "4w7x5sFfGVff3hIiQms0mq",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e02661d019f34569f79eae9e985ab67616d00001e02a6d6e4d30c273873f375b541ab67616d00001e02b84e077bb3f2e36adbdeb6d4ab67616d00001e02bef074de9ca825bddaeb9f46",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e02661d019f34569f79eae9e985ab67616d00001e02a6d6e4d30c273873f375b541ab67616d00001e02b84e077bb3f2e36adbdeb6d4ab67616d00001e02bef074de9ca825bddaeb9f46",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e02661d019f34569f79eae9e985ab67616d00001e02a6d6e4d30c273873f375b541ab67616d00001e02b84e077bb3f2e36adbdeb6d4ab67616d00001e02bef074de9ca825bddaeb9f46",
//           "width": 60
//         }
//       ],
//       "name": "Chrismas",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAPRIvx4QqboE8cdCxsr4kwaj+PA0k",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/4w7x5sFfGVff3hIiQms0mq/tracks",
//         "total": 67
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:4w7x5sFfGVff3hIiQms0mq"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/53mP0tQaCwkWBEytqc2SLD"
//       },
//       "href": "https://api.spotify.com/v1/playlists/53mP0tQaCwkWBEytqc2SLD",
//       "id": "53mP0tQaCwkWBEytqc2SLD",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e020009ff4085864d592d09cbdaab67616d00001e02072e9faef2ef7b6db63834a3ab67616d00001e0250b5922bdf87ba4213b25234ab67616d00001e02d9194aa18fa4c9362b47464f",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e020009ff4085864d592d09cbdaab67616d00001e02072e9faef2ef7b6db63834a3ab67616d00001e0250b5922bdf87ba4213b25234ab67616d00001e02d9194aa18fa4c9362b47464f",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e020009ff4085864d592d09cbdaab67616d00001e02072e9faef2ef7b6db63834a3ab67616d00001e0250b5922bdf87ba4213b25234ab67616d00001e02d9194aa18fa4c9362b47464f",
//           "width": 60
//         }
//       ],
//       "name": "King shit",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAA+kv7Bkb86kWer/RvY+TJtiaf/Nh1",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/53mP0tQaCwkWBEytqc2SLD/tracks",
//         "total": 112
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:53mP0tQaCwkWBEytqc2SLD"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/4sjgeQ8JMx6f3RVU6Evy7X"
//       },
//       "href": "https://api.spotify.com/v1/playlists/4sjgeQ8JMx6f3RVU6Evy7X",
//       "id": "4sjgeQ8JMx6f3RVU6Evy7X",
//       "images": [
//         {
//           "height": null,
//           "url": "https://i.scdn.co/image/ab67616d00001e02a47ee7a49c53ccdcb38dc874",
//           "width": null
//         }
//       ],
//       "name": "Wedding",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAABIdL+5QC/JS1TS2Gz4SDX44R2oZD",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/4sjgeQ8JMx6f3RVU6Evy7X/tracks",
//         "total": 3
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:4sjgeQ8JMx6f3RVU6Evy7X"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/2RIPZAXMbBMzyzurv0VqBU"
//       },
//       "href": "https://api.spotify.com/v1/playlists/2RIPZAXMbBMzyzurv0VqBU",
//       "id": "2RIPZAXMbBMzyzurv0VqBU",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e0210e6745bb2f179dd3616b85fab67616d00001e02a2329c84c1421041f06a7ad5ab67616d00001e02b84e077bb3f2e36adbdeb6d4ab67616d00001e02d9ed6221913fca80d32a34d0",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e0210e6745bb2f179dd3616b85fab67616d00001e02a2329c84c1421041f06a7ad5ab67616d00001e02b84e077bb3f2e36adbdeb6d4ab67616d00001e02d9ed6221913fca80d32a34d0",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e0210e6745bb2f179dd3616b85fab67616d00001e02a2329c84c1421041f06a7ad5ab67616d00001e02b84e077bb3f2e36adbdeb6d4ab67616d00001e02d9ed6221913fca80d32a34d0",
//           "width": 60
//         }
//       ],
//       "name": "Uplifting",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAC9hfWo/S79vfp4nJSJ6K7iA7aAio",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/2RIPZAXMbBMzyzurv0VqBU/tracks",
//         "total": 7
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:2RIPZAXMbBMzyzurv0VqBU"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/35PBHxmLTvrrcSkrduVJf9"
//       },
//       "href": "https://api.spotify.com/v1/playlists/35PBHxmLTvrrcSkrduVJf9",
//       "id": "35PBHxmLTvrrcSkrduVJf9",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e021bfa23b13d0504fb90c37b39ab67616d00001e0226f7f19c7f0381e56156c94aab67616d00001e02c5663e50de353981ed2b1a37ab67616d00001e02d9194aa18fa4c9362b47464f",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e021bfa23b13d0504fb90c37b39ab67616d00001e0226f7f19c7f0381e56156c94aab67616d00001e02c5663e50de353981ed2b1a37ab67616d00001e02d9194aa18fa4c9362b47464f",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e021bfa23b13d0504fb90c37b39ab67616d00001e0226f7f19c7f0381e56156c94aab67616d00001e02c5663e50de353981ed2b1a37ab67616d00001e02d9194aa18fa4c9362b47464f",
//           "width": 60
//         }
//       ],
//       "name": "Rap",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAARrp+H+ja50RsF0cpQjS2q9TGqcen",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/35PBHxmLTvrrcSkrduVJf9/tracks",
//         "total": 185
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:35PBHxmLTvrrcSkrduVJf9"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/03UVi1lAvyE7wNPclQs1qd"
//       },
//       "href": "https://api.spotify.com/v1/playlists/03UVi1lAvyE7wNPclQs1qd",
//       "id": "03UVi1lAvyE7wNPclQs1qd",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e026bebaef95e5df37d0db5da97ab67616d00001e026da502e35a7a3e48de2b0f74ab67616d00001e02da071ae7564949fbbfc6904dab67616d00001e02f9b3ece3271d3a5fa73d3759",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e026bebaef95e5df37d0db5da97ab67616d00001e026da502e35a7a3e48de2b0f74ab67616d00001e02da071ae7564949fbbfc6904dab67616d00001e02f9b3ece3271d3a5fa73d3759",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e026bebaef95e5df37d0db5da97ab67616d00001e026da502e35a7a3e48de2b0f74ab67616d00001e02da071ae7564949fbbfc6904dab67616d00001e02f9b3ece3271d3a5fa73d3759",
//           "width": 60
//         }
//       ],
//       "name": "HeadBack",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAXjUKUm6I8dNs7tBTl/BjS9Sw9AX8",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/03UVi1lAvyE7wNPclQs1qd/tracks",
//         "total": 89
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:03UVi1lAvyE7wNPclQs1qd"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/0qSr8O1piQO0MsMsBxT9dr"
//       },
//       "href": "https://api.spotify.com/v1/playlists/0qSr8O1piQO0MsMsBxT9dr",
//       "id": "0qSr8O1piQO0MsMsBxT9dr",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e02333cce71efc74e11f8cb8b32ab67616d00001e028c86b05d0cd1b9e770eae2f8ab67616d00001e02c1d25017774b9744920fad83ab67616d00001e02c4ccc131831321088462a9e6",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e02333cce71efc74e11f8cb8b32ab67616d00001e028c86b05d0cd1b9e770eae2f8ab67616d00001e02c1d25017774b9744920fad83ab67616d00001e02c4ccc131831321088462a9e6",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e02333cce71efc74e11f8cb8b32ab67616d00001e028c86b05d0cd1b9e770eae2f8ab67616d00001e02c1d25017774b9744920fad83ab67616d00001e02c4ccc131831321088462a9e6",
//           "width": 60
//         }
//       ],
//       "name": "DANCE.FM",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAARMbCFjUGEpjIGp1jZEVYhFNjwUM0",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/0qSr8O1piQO0MsMsBxT9dr/tracks",
//         "total": 62
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:0qSr8O1piQO0MsMsBxT9dr"
//     },
//     {
//       "collaborative": false,
//       "description": "Spotify Wrapped presents the songs that you loved most this year.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/37i9dQZF1F0sijgNaJdgit"
//       },
//       "href": "https://api.spotify.com/v1/playlists/37i9dQZF1F0sijgNaJdgit",
//       "id": "37i9dQZF1F0sijgNaJdgit",
//       "images": [
//         {
//           "height": null,
//           "url": "https://wrapped-images.spotifycdn.com/image/yts-2022/default/your-top-songs-2022_default_en.jpg",
//           "width": null
//         }
//       ],
//       "name": "Your Top Songs 2022",
//       "owner": {
//         "display_name": "Spotify",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/spotify"
//         },
//         "href": "https://api.spotify.com/v1/users/spotify",
//         "id": "spotify",
//         "type": "user",
//         "uri": "spotify:user:spotify"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "Y4jJ4gAAAACwtlsyYn1Mcj+djyNdzcd5",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/37i9dQZF1F0sijgNaJdgit/tracks",
//         "total": 101
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:37i9dQZF1F0sijgNaJdgit"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/3bQjyz8O14zNLXKoqRaUyL"
//       },
//       "href": "https://api.spotify.com/v1/playlists/3bQjyz8O14zNLXKoqRaUyL",
//       "id": "3bQjyz8O14zNLXKoqRaUyL",
//       "images": [
//         {
//           "height": null,
//           "url": "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da84f0cba1272bbf918411fa1b2e",
//           "width": null
//         }
//       ],
//       "name": "PerfectSongs",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAIWCnNAUkiZcWPAf3rCjiBLXxijzC",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/3bQjyz8O14zNLXKoqRaUyL/tracks",
//         "total": 22
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:3bQjyz8O14zNLXKoqRaUyL"
//     },
//     {
//       "collaborative": false,
//       "description": "Every week on triple j’s Like A Version segment, artists perform their own take on a current hit or a classic song.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/28oY1vSsipRE5VOyLDQqed"
//       },
//       "href": "https://api.spotify.com/v1/playlists/28oY1vSsipRE5VOyLDQqed",
//       "id": "28oY1vSsipRE5VOyLDQqed",
//       "images": [
//         {
//           "height": null,
//           "url": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8437be78ea752bee0f442526b1",
//           "width": null
//         }
//       ],
//       "name": "triple j's Like A Version",
//       "owner": {
//         "display_name": "triple j",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/triple.j.abc"
//         },
//         "href": "https://api.spotify.com/v1/users/triple.j.abc",
//         "id": "triple.j.abc",
//         "type": "user",
//         "uri": "spotify:user:triple.j.abc"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAACKZM5WCjO7FMd1KDFhi7DpK2LH494",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/28oY1vSsipRE5VOyLDQqed/tracks",
//         "total": 235
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:28oY1vSsipRE5VOyLDQqed"
//     },
//     {
//       "collaborative": false,
//       "description": "We collected all the songs you loved the most this year, wrapped them up and are serving them back in this beautiful little playlist.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/37i9dQZF1CyYrz3C7AnIuX"
//       },
//       "href": "https://api.spotify.com/v1/playlists/37i9dQZF1CyYrz3C7AnIuX",
//       "id": "37i9dQZF1CyYrz3C7AnIuX",
//       "images": [
//         {
//           "height": null,
//           "url": "https://lineup-images.scdn.co/your-top-songs-2016_DEFAULT-en.jpg",
//           "width": null
//         }
//       ],
//       "name": "Your Top Songs 2016",
//       "owner": {
//         "display_name": "Spotify",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/spotify"
//         },
//         "href": "https://api.spotify.com/v1/users/spotify",
//         "id": "spotify",
//         "type": "user",
//         "uri": "spotify:user:spotify"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AXiRQAAAAAAi2eLZPYd90QfXPcL7/iFU",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/37i9dQZF1CyYrz3C7AnIuX/tracks",
//         "total": 101
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:37i9dQZF1CyYrz3C7AnIuX"
//     },
//     {
//       "collaborative": false,
//       "description": "The songs you loved most this year, all wrapped up.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/37i9dQZF1E9WY9VkQr1PiJ"
//       },
//       "href": "https://api.spotify.com/v1/playlists/37i9dQZF1E9WY9VkQr1PiJ",
//       "id": "37i9dQZF1E9WY9VkQr1PiJ",
//       "images": [
//         {
//           "height": null,
//           "url": "https://lineup-images.scdn.co/your-top-songs-2017_DEFAULT-en.jpg",
//           "width": null
//         }
//       ],
//       "name": "Your Top Songs 2017",
//       "owner": {
//         "display_name": "Spotify",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/spotify"
//         },
//         "href": "https://api.spotify.com/v1/users/spotify",
//         "id": "spotify",
//         "type": "user",
//         "uri": "spotify:user:spotify"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AYBCCwAAAAAzIKJh9aEUkDCQW9iusE8e",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/37i9dQZF1E9WY9VkQr1PiJ/tracks",
//         "total": 100
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:37i9dQZF1E9WY9VkQr1PiJ"
//     },
//     {
//       "collaborative": false,
//       "description": "The songs you loved most this year, all wrapped up.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/37i9dQZF1EjicQnnPU9pMl"
//       },
//       "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EjicQnnPU9pMl",
//       "id": "37i9dQZF1EjicQnnPU9pMl",
//       "images": [
//         {
//           "height": null,
//           "url": "https://lineup-images.scdn.co/your-top-songs-2018_DEFAULT-en.jpg",
//           "width": null
//         }
//       ],
//       "name": "Your Top Songs 2018",
//       "owner": {
//         "display_name": "Spotify",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/spotify"
//         },
//         "href": "https://api.spotify.com/v1/users/spotify",
//         "id": "spotify",
//         "type": "user",
//         "uri": "spotify:user:spotify"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AYkUmgAAAADuNX7s0Sik7okVE3drxpgb",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EjicQnnPU9pMl/tracks",
//         "total": 100
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:37i9dQZF1EjicQnnPU9pMl"
//     },
//     {
//       "collaborative": false,
//       "description": "The songs you loved most this year, all wrapped up.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/37i9dQZF1EtsQbs16JGZ9Z"
//       },
//       "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EtsQbs16JGZ9Z",
//       "id": "37i9dQZF1EtsQbs16JGZ9Z",
//       "images": [
//         {
//           "height": null,
//           "url": "https://lineup-images.scdn.co/your-top-songs-2019_DEFAULT-en.jpg",
//           "width": null
//         }
//       ],
//       "name": "Your Top Songs 2019",
//       "owner": {
//         "display_name": "Spotify",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/spotify"
//         },
//         "href": "https://api.spotify.com/v1/users/spotify",
//         "id": "spotify",
//         "type": "user",
//         "uri": "spotify:user:spotify"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AZDX5AAAAADwM60MRiAaIcm9NBYi678q",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EtsQbs16JGZ9Z/tracks",
//         "total": 100
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:37i9dQZF1EtsQbs16JGZ9Z"
//     },
//     {
//       "collaborative": false,
//       "description": "The songs you loved most this year, all wrapped up.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/37i9dQZF1ELVg8d2p69p5Q"
//       },
//       "href": "https://api.spotify.com/v1/playlists/37i9dQZF1ELVg8d2p69p5Q",
//       "id": "37i9dQZF1ELVg8d2p69p5Q",
//       "images": [
//         {
//           "height": null,
//           "url": "https://lineup-images.scdn.co/wrapped-2020-top100_DEFAULT-en.jpg",
//           "width": null
//         }
//       ],
//       "name": "Your Top Songs 2020",
//       "owner": {
//         "display_name": "Spotify",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/spotify"
//         },
//         "href": "https://api.spotify.com/v1/users/spotify",
//         "id": "spotify",
//         "type": "user",
//         "uri": "spotify:user:spotify"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AZiMYAAAAAC3BH4LFDJDDe5MpeDYkxYE",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/37i9dQZF1ELVg8d2p69p5Q/tracks",
//         "total": 100
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:37i9dQZF1ELVg8d2p69p5Q"
//     },
//     {
//       "collaborative": false,
//       "description": "Spotify Wrapped presents the songs that you loved most this year.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/37i9dQZF1EUMDoJuT8yJsl"
//       },
//       "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EUMDoJuT8yJsl",
//       "id": "37i9dQZF1EUMDoJuT8yJsl",
//       "images": [
//         {
//           "height": null,
//           "url": "https://lineup-images.scdn.co/wrapped-2021-top100_DEFAULT-en.jpg",
//           "width": null
//         }
//       ],
//       "name": "Your Top Songs 2021",
//       "owner": {
//         "display_name": "Spotify",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/spotify"
//         },
//         "href": "https://api.spotify.com/v1/users/spotify",
//         "id": "spotify",
//         "type": "user",
//         "uri": "spotify:user:spotify"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAAAAAAADy3rtDjP1mfND0KoHdzoaQ",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EUMDoJuT8yJsl/tracks",
//         "total": 100
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:37i9dQZF1EUMDoJuT8yJsl"
//     },
//     {
//       "collaborative": false,
//       "description": "Songs you love right now",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/37i9dQZF1Epjd8F7vtwKmX"
//       },
//       "href": "https://api.spotify.com/v1/playlists/37i9dQZF1Epjd8F7vtwKmX",
//       "id": "37i9dQZF1Epjd8F7vtwKmX",
//       "images": [
//         {
//           "height": null,
//           "url": "https://daily-mix.scdn.co/covers/on_repeat/PZN_On_Repeat2_DEFAULT-en-GB.jpg",
//           "width": null
//         }
//       ],
//       "name": "On Repeat",
//       "owner": {
//         "display_name": "Spotify",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/spotify"
//         },
//         "href": "https://api.spotify.com/v1/users/spotify",
//         "id": "spotify",
//         "type": "user",
//         "uri": "spotify:user:spotify"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "ZyUBSgAAAACKHKy0ltPwy+Rfr5h+VHrq",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/37i9dQZF1Epjd8F7vtwKmX/tracks",
//         "total": 30
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:37i9dQZF1Epjd8F7vtwKmX"
//     },
//     {
//       "collaborative": false,
//       "description": "16 hours of perfection ✅ (Email: jahtalksmusic@gmail.com)",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/4VaRVKURoSreO1w0mydv3q"
//       },
//       "href": "https://api.spotify.com/v1/playlists/4VaRVKURoSreO1w0mydv3q",
//       "id": "4VaRVKURoSreO1w0mydv3q",
//       "images": [
//         {
//           "height": null,
//           "url": "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da849813aabff2a7120720286a25",
//           "width": null
//         }
//       ],
//       "name": "250 Perfect Songs",
//       "owner": {
//         "display_name": "Jah Talks Music",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/fgy1vuygflfwapaeaba6wbxtf"
//         },
//         "href": "https://api.spotify.com/v1/users/fgy1vuygflfwapaeaba6wbxtf",
//         "id": "fgy1vuygflfwapaeaba6wbxtf",
//         "type": "user",
//         "uri": "spotify:user:fgy1vuygflfwapaeaba6wbxtf"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAD9KLmI12xri/6XfN5133V9MAPBdK",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/4VaRVKURoSreO1w0mydv3q/tracks",
//         "total": 250
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:4VaRVKURoSreO1w0mydv3q"
//     },
//     {
//       "collaborative": false,
//       "description": "Aggressive rap songs that&#x27;ll turn you into a BEAST 😤 (Email: jahtalksmusic@gmail.com)",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/6nHyMdQmjsGooa9oq7cJLu"
//       },
//       "href": "https://api.spotify.com/v1/playlists/6nHyMdQmjsGooa9oq7cJLu",
//       "id": "6nHyMdQmjsGooa9oq7cJLu",
//       "images": [
//         {
//           "height": null,
//           "url": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8437e11515faa79e61f04c93b5",
//           "width": null
//         }
//       ],
//       "name": "250 Gym Songs",
//       "owner": {
//         "display_name": "Jah Talks Music",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/fgy1vuygflfwapaeaba6wbxtf"
//         },
//         "href": "https://api.spotify.com/v1/users/fgy1vuygflfwapaeaba6wbxtf",
//         "id": "fgy1vuygflfwapaeaba6wbxtf",
//         "type": "user",
//         "uri": "spotify:user:fgy1vuygflfwapaeaba6wbxtf"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAKpvohO3HpJWed34GMsWjtMfXEJgU",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/6nHyMdQmjsGooa9oq7cJLu/tracks",
//         "total": 250
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:6nHyMdQmjsGooa9oq7cJLu"
//     },
//     {
//       "collaborative": false,
//       "description": "Tunes in bulk. Kick back with good company.",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/1fOTlKiHEjlHjcTocyBFFo"
//       },
//       "href": "https://api.spotify.com/v1/playlists/1fOTlKiHEjlHjcTocyBFFo",
//       "id": "1fOTlKiHEjlHjcTocyBFFo",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e0233aaecf7364ae1d02a914d26ab67616d00001e024ae1c4c5c45aabe565499163ab67616d00001e028eac29e8d4ed8c2c2a55e96dab67616d00001e02f8e77075414234fd77fce32b",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e0233aaecf7364ae1d02a914d26ab67616d00001e024ae1c4c5c45aabe565499163ab67616d00001e028eac29e8d4ed8c2c2a55e96dab67616d00001e02f8e77075414234fd77fce32b",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e0233aaecf7364ae1d02a914d26ab67616d00001e024ae1c4c5c45aabe565499163ab67616d00001e028eac29e8d4ed8c2c2a55e96dab67616d00001e02f8e77075414234fd77fce32b",
//           "width": 60
//         }
//       ],
//       "name": "Hangin' Out, Chewin' Fat",
//       "owner": {
//         "display_name": "Kiefer Scharkie",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/kieferscharkie13"
//         },
//         "href": "https://api.spotify.com/v1/users/kieferscharkie13",
//         "id": "kieferscharkie13",
//         "type": "user",
//         "uri": "spotify:user:kieferscharkie13"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAANFPOthg7EphptFtJ9A0Ax+dYQTb1e",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/1fOTlKiHEjlHjcTocyBFFo/tracks",
//         "total": 1356
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:1fOTlKiHEjlHjcTocyBFFo"
//     },
//     {
//       "collaborative": true,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/7slAuYxQI7Thtbq7jZ36xn"
//       },
//       "href": "https://api.spotify.com/v1/playlists/7slAuYxQI7Thtbq7jZ36xn",
//       "id": "7slAuYxQI7Thtbq7jZ36xn",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e020f76fb9c0ab0991c70829a91ab67616d00001e0226b7dd89810cc1a40ada642cab67616d00001e025b924aa009b61b6b9d831eecab67616d00001e0298f1817f4955a06492f0dd83",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e020f76fb9c0ab0991c70829a91ab67616d00001e0226b7dd89810cc1a40ada642cab67616d00001e025b924aa009b61b6b9d831eecab67616d00001e0298f1817f4955a06492f0dd83",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e020f76fb9c0ab0991c70829a91ab67616d00001e0226b7dd89810cc1a40ada642cab67616d00001e025b924aa009b61b6b9d831eecab67616d00001e0298f1817f4955a06492f0dd83",
//           "width": 60
//         }
//       ],
//       "name": "Rivalry",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAABldRcEqPC8EHszuwU+cMcCwREkAh4",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/7slAuYxQI7Thtbq7jZ36xn/tracks",
//         "total": 302
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:7slAuYxQI7Thtbq7jZ36xn"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/1rRPvAHFmqGkrl9R5McWD4"
//       },
//       "href": "https://api.spotify.com/v1/playlists/1rRPvAHFmqGkrl9R5McWD4",
//       "id": "1rRPvAHFmqGkrl9R5McWD4",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e024e2ac74342d72cad3d1fb747ab67616d00001e027b47a8c294c0fbda8bff3c8cab67616d00001e0290b8a540137ee2a718a369f9ab67616d00001e02acebb58ea70a6e5ff1c4d261",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e024e2ac74342d72cad3d1fb747ab67616d00001e027b47a8c294c0fbda8bff3c8cab67616d00001e0290b8a540137ee2a718a369f9ab67616d00001e02acebb58ea70a6e5ff1c4d261",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e024e2ac74342d72cad3d1fb747ab67616d00001e027b47a8c294c0fbda8bff3c8cab67616d00001e0290b8a540137ee2a718a369f9ab67616d00001e02acebb58ea70a6e5ff1c4d261",
//           "width": 60
//         }
//       ],
//       "name": "Rose tinted glasses",
//       "owner": {
//         "display_name": "Rivalry - Harbour Town",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/mtb35p38h4z1s5drvmus54in9"
//         },
//         "href": "https://api.spotify.com/v1/users/mtb35p38h4z1s5drvmus54in9",
//         "id": "mtb35p38h4z1s5drvmus54in9",
//         "type": "user",
//         "uri": "spotify:user:mtb35p38h4z1s5drvmus54in9"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAPrOczWQjh/qqh2+R84/WTCv87ArA",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/1rRPvAHFmqGkrl9R5McWD4/tracks",
//         "total": 59
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:1rRPvAHFmqGkrl9R5McWD4"
//     },
//     {
//       "collaborative": false,
//       "description": "",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/playlist/63oxkcbq85oFZJBxmtlrbW"
//       },
//       "href": "https://api.spotify.com/v1/playlists/63oxkcbq85oFZJBxmtlrbW",
//       "id": "63oxkcbq85oFZJBxmtlrbW",
//       "images": [
//         {
//           "height": 640,
//           "url": "https://mosaic.scdn.co/640/ab67616d00001e024e2ac74342d72cad3d1fb747ab67616d00001e02606d5328452b81683a125450ab67616d00001e027d6cd95a046a3c0dacbc7d33ab67616d00001e029164bafe9aaa168d93f4816a",
//           "width": 640
//         },
//         {
//           "height": 300,
//           "url": "https://mosaic.scdn.co/300/ab67616d00001e024e2ac74342d72cad3d1fb747ab67616d00001e02606d5328452b81683a125450ab67616d00001e027d6cd95a046a3c0dacbc7d33ab67616d00001e029164bafe9aaa168d93f4816a",
//           "width": 300
//         },
//         {
//           "height": 60,
//           "url": "https://mosaic.scdn.co/60/ab67616d00001e024e2ac74342d72cad3d1fb747ab67616d00001e02606d5328452b81683a125450ab67616d00001e027d6cd95a046a3c0dacbc7d33ab67616d00001e029164bafe9aaa168d93f4816a",
//           "width": 60
//         }
//       ],
//       "name": "Hosko.FM",
//       "owner": {
//         "display_name": "Joe Hosking",
//         "external_urls": {
//           "spotify": "https://open.spotify.com/user/joe_hosking"
//         },
//         "href": "https://api.spotify.com/v1/users/joe_hosking",
//         "id": "joe_hosking",
//         "type": "user",
//         "uri": "spotify:user:joe_hosking"
//       },
//       "primary_color": null,
//       "public": true,
//       "snapshot_id": "AAAAUg1ra2a4wn8sbVlNHlXRBHJlu5m+",
//       "tracks": {
//         "href": "https://api.spotify.com/v1/playlists/63oxkcbq85oFZJBxmtlrbW/tracks",
//         "total": 81
//       },
//       "type": "playlist",
//       "uri": "spotify:playlist:63oxkcbq85oFZJBxmtlrbW"
//     }
//   ]
// }
