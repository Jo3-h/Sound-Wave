import React from "react";
import "./css/PlaylistForm.css";
import PlaylistCard from "./PlaylistCard";

export default function PlaylistForm({ userPlaylists, handleImportPlaylist }) {
  return (
    <div className="playlist-form-container">
      {userPlaylists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          handleImportPlaylist={handleImportPlaylist}
        />
      ))}
    </div>
  );
}
