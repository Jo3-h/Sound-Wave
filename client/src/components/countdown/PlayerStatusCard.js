import React from "react";
import { useEffect, useState } from "react";

import "./css/PlayerStatusCard.css";

/**
 * 
 * player = {
 * {
    "id": 1729577986388,
    "name": "Joe",
    "profileImage":
    "selectedSongs": [
        {
            "artist": "Prince",
            "title": "Purple Rain",
            "uri": "spotify:track:1uvyZBs4IZYRebHIB1747m",
            "albumUrl": "https://i.scdn.co/image/ab67616d000048518a2ce3f148f57584269c3782",
            "albumUrlLarge": "https://i.scdn.co/image/ab67616d00001e028a2ce3f148f57584269c3782",
            "played": false
        },
        {
            "artist": "Stevie Wonder",
            "title": "Pastime Paradise",
            "uri": "spotify:track:4Gn4b1qJ12rowCNRw5DHM9",
            "albumUrl": "https://i.scdn.co/image/ab67616d000048512fee61bfec596bb6f5447c50",
            "albumUrlLarge": "https://i.scdn.co/image/ab67616d00001e022fee61bfec596bb6f5447c50",
            "played": false
        },
        {
            "artist": "Fred again..",
            "title": "places to be",
            "uri": "spotify:track:561pBFcFL2Pwb9HPO9tU8J",
            "albumUrl": "https://i.scdn.co/image/ab67616d0000485154539f552c0fda9cb1ecd0c8",
            "albumUrlLarge": "https://i.scdn.co/image/ab67616d00001e0254539f552c0fda9cb1ecd0c8",
            "played": false
        }
    ]
}
 * }
 */
export default function PlayerStatusCard({ player, iconCard }) {
  const [songsRemaining, setSongsRemaining] = useState(-1);

  /**
   * useEffect Hook 1 - Update songs remaining state
   *
   * This hook updates state songsRemaining whenever player object changes. Once triggered
   * the hook will count how many songs within the player.selectedSongs array have played
   * bool value set to false. This will then set the songsRemaining to this value and update card
   */
  useEffect(() => {
    if (!player || !player.selectedSongs) {
      return;
    }

    const count = player.selectedSongs.filter((song) => !song.played).length;
    setSongsRemaining(count);
  }, [player]);

  return (
    <div className="player-status-container">
      <div className="profile-image-container">
        <img
          className="profile-image"
          src={player.profileImage}
          alt="Profile Pic"
        />
      </div>
      <div className="player-status-content">
        <div className="text-container">
          <div className="player-name-label">{player.name}</div>
          <div className="songs-remaining-label">
            Songs Remaining: {songsRemaining}
          </div>
        </div>
        <div className="images-array">
          {player.selectedSongs.map(
            (track) =>
              track.played === false && (
                <img
                  key={track.id}
                  className="album-image"
                  src={track.albumUrl}
                  alt="album img"
                />
              )
          )}
          {player.selectedSongs.map(
            (track) =>
              track.played === true && (
                <img
                  key={track.id}
                  className="album-image-played"
                  src={track.albumUrl}
                  alt="album img"
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
