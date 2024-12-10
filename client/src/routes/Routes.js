import React from "react";
import { Routes } from "react-router-dom";
import { Route, Navigate } from "react-router-dom";

// import all app routes
import Login from "../components/common/Login";
import SignUp from "../components/common/SignUp";
import Dashboard from "../components/dashboard/Dashboard";
import MusicStreamer from "../components/StreamMusic/StreamMusic";
import ProtectedRoute from "../components/common/ProtectedRoute";
import StatisticsDashboard from "../components/statistics/statisticsDashboard";
import SongGuesser from "../components/songGuesser/SongGuesser";
import SongCountdown from "../components/countdown/SongCountdown";
import Profile from "../components/common/Profile";

const AppRoutes = ({
  setPlayingTrack,
  setAccessToken,
  accessToken,
  playerRef,
}) => (
  <Routes>
    {/* Authentication Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />

    {/* User Routes */}
    <Route path="/profile" element={<Profile />} />

    {/* Dashboard Routes */}
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<Dashboard />} />

    {/* Spotify Routes */}
    <Route
      path="/music-player"
      element={
        <ProtectedRoute
          element={MusicStreamer}
          setPlayingTrack={setPlayingTrack}
          setAccessToken={setAccessToken}
          playerRef={playerRef}
          accessToken={accessToken}
        />
      }
    />
    <Route
      path="/statistics"
      element={
        <ProtectedRoute
          element={StatisticsDashboard}
          setPlayingTrack={setPlayingTrack}
          setAccessToken={setAccessToken}
          playerRef={playerRef}
          accessToken={accessToken}
        />
      }
    />
    <Route
      path="/song-countdown"
      element={
        <ProtectedRoute
          element={SongCountdown}
          setPlayingTrack={setPlayingTrack}
          setAccessToken={setAccessToken}
          playerRef={playerRef}
          accessToken={accessToken}
        />
      }
    />
    <Route
      path="/song-guesser"
      element={
        <ProtectedRoute
          element={SongGuesser}
          setPlayingTrack={setPlayingTrack}
          setAccessToken={setAccessToken}
          playerRef={playerRef}
          accessToken={accessToken}
        />
      }
    />
  </Routes>
);

export default AppRoutes;
