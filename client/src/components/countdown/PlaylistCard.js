import React from "react";

import "./css/PlaylistCard.css";

export default function PlaylistCard({ playlist }) {
  return (
    <>
      <div className="playlist-card-container">
        <img
          className="playlist-image"
          src={playlist.images[1]?.url || playlist.images[0]?.url || null}
          alt="playlist img"
        />
        <div className="information-container">
          <div className="playlist-name-label">{playlist.name}</div>
          <div className="playlist-owner-label">
            {playlist.owner?.display_name || "unknown"}
          </div>
          <div className="playlist-tracks-label">
            songs: {playlist.tracks?.total || "N/A"}
          </div>
        </div>
      </div>
    </>
  );
}

// PLAYLIST OBJECT EXAMPLE
/**
 * {
    "collaborative": false,
    "description": "",
    "external_urls": {
        "spotify": "https://open.spotify.com/playlist/4f2eWopVtjnnPrPjSQmCZB"
    },
    "href": "https://api.spotify.com/v1/playlists/4f2eWopVtjnnPrPjSQmCZB",
    "id": "4f2eWopVtjnnPrPjSQmCZB",
    "images": [
        {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/ab67616d00001e0225b055377757b3cdd6f26b78ab67616d00001e026610c21366e613bfd9f5d197ab67616d00001e026c7112082b63beefffe40151ab67616d00001e02c5649add07ed3720be9d5526",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/ab67616d00001e0225b055377757b3cdd6f26b78ab67616d00001e026610c21366e613bfd9f5d197ab67616d00001e026c7112082b63beefffe40151ab67616d00001e02c5649add07ed3720be9d5526",
            "width": 300
        },
        {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/ab67616d00001e0225b055377757b3cdd6f26b78ab67616d00001e026610c21366e613bfd9f5d197ab67616d00001e026c7112082b63beefffe40151ab67616d00001e02c5649add07ed3720be9d5526",
            "width": 60
        }
    ],
    "name": "hottest-100-test",
    "owner": {
        "display_name": "Joe Hosking",
        "external_urls": {
            "spotify": "https://open.spotify.com/user/joe_hosking"
        },
        "href": "https://api.spotify.com/v1/users/joe_hosking",
        "id": "joe_hosking",
        "type": "user",
        "uri": "spotify:user:joe_hosking"
    },
    "primary_color": null,
    "public": true,
    "snapshot_id": "AAAAECgdVx5d4jDS6SaLDuU5Q91LExob",
    "tracks": {
        "href": "https://api.spotify.com/v1/playlists/4f2eWopVtjnnPrPjSQmCZB/tracks",
        "total": 15
    },
    "type": "playlist",
    "uri": "spotify:playlist:4f2eWopVtjnnPrPjSQmCZB"
}
 */
