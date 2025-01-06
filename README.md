# SOUNDWAVE Full-Stack Application

Soundwave is a full-stack application engineering project designed to for music enthusiasts to analyse, review, and stream their favourite music. The platform integrates with Spotify and MusicBrainz APIs to obtain music data and stream music based on the users spotify playlist and account details. Included in this project is a web-based front-end to provide a user friendly interface, a back-end to handle server side endpoints and communicate with the database, and a data integration pipeline to popoulate the projects' connected database with existing music data.

---

## Table of Contents  

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation and Setup](#installation-and-setup)  
5. [Project Structure](#project-structure)  
6. [Future Enhancements](#future-enhancements)  

---

## Project Overview  

**SOUNDWAVE** is a React-based web application designed to showcase technical expertise in frontend development, backend development, API integration, data integration pipelines, and relational database management. It provides users with:  

- A music player integrated with Spotify.  
- A countdown-style music streaming game, a fun way to engage with your music library
- A song-guessing music streaming game.
- Detailed Spotify stats and insights display.
- Music / Album discovery.
- Album / Song rating and review capacity.

---

## Features  

### **Music Player with Spotify Integration**  
- Plays tracks using Spotify Web API Node.  
- Dynamically displays playlists and songs.
- Capacity for searching Artists / Tracks  

### **Countdown Game**  
- Timer feature for music listening sessions.  
- Inline styles applied specifically to the countdown section.  

### **Spotify Stats**  
- Analyze and display user data, such as:  
  - Most-played tracks.  
  - Favorite genres.  
  - Listening history.  

### **User Profile Customization**  
- Update profile pictures and display names.  

### **Navigation and Layout**  
- Responsive UI featuring a navbar and footer inspired by last.fm.  

### **Authentication and Data Storage**  
- Login and signup functionality.  
- User sessions and credentials stored in a MySQL database with hashed passwords.  

---

## Tech Stack  

### **Frontend**  
- **React.js**: For building a responsive and dynamic UI.  
- **JavaScript**: Core language for interactivity.  
- **CSS**: For styling components.  

### **Backend**  
- **Node.js**: Server-side logic.  
- **Spotify Web API Node**: Integration with Spotify's API.  
- **MySQL**: Database for user information and session persistence hosted on Amazon Web Services (AWS).
- **dotenv**: For storage of secret database credentials.

### **Data Integration Pipeline**
- **Python**: Primary data pipeline language.
- **Beautiful Soup**: To extract current highest streamed artists on spotify.
- **Music Brainz API**: To extract Artist / Album / Track meta data.
- **Pandas**: For data wrangling and transformation after extraction
- **MySql.connector**: For connection to and communication with externally hosted relational Database.
- **dotenv**: For storage of sensitive project secrets

### **Tools and Libraries**  
- **bcrypt**: For hashing user passwords.
- **Sequelize**: For creating and managing database entities and relationships.
- **Docker CLI**: Optional for environment management.  

---

## Installation and Setup  

1. Clone this repository:  
   ```bash
   git clone https://github.com/your-username/soundwave.git  
   cd soundwave```

2. Create a ```.env``` file in the ```soundwave/server``` directory

3. Add the following variables required for full application functionality. Note that spotify client id and secret can be obtained from https://developer.spotify.com/ and the database credentials (if applicable) will need to have a database instance hosted for full functionality.

```
# Development environment configuration variables (optional)
DB_USER=<database_username>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
DB_HOST=<database_hostname>

# Spotify API configuration variables
REDIRECT_URI=<your_redirect_uri> # Typically http://localhost:3000 for development
CLIENT_ID=<your_spotify_client_id>
CLIENT_SECRET=<your_spotify_client_secret>

# JWT Secret
JWT_SECRET=<your_jwt_secret_key>
```
4. Create a ```.env``` file in the ```soundwave/pipeline``` directory

5. Add the following variables for full application functionality. Note that these variables are required for the data integration pipeline to function.

```
# Development environment configuration variables
DB_USER=<database_username>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
DB_HOST=<database_hostname>
```
6. Start the Express Server

```npm run devStart```

7. Run the React Frontend

```npm start```

---

## Project Structure

```
├── README.md
├── client
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── heart_icon.png
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── profile_pictures
│   │   │   ├── Jo3_h.jpg
│   │   │   ├── Joe.jpg
│   │   │   ├── default-profile-pic.jpg
│   │   │   ├── joe_test.jpg
│   │   │   └── username.jpg
│   │   ├── question_mark.png
│   │   ├── robots.txt
│   │   └── streak_icon.png
│   └── src
│       ├── App.js
│       ├── components
│       │   ├── StreamMusic
│       │   │   ├── StreamMusic.js
│       │   │   └── css
│       │   │       └── MusicPlayer.css
│       │   ├── common
│       │   │   ├── ContentBackground.js
│       │   │   ├── Footer.js
│       │   │   ├── Layout.js
│       │   │   ├── Login.js
│       │   │   ├── MusicPlayer.js
│       │   │   ├── NavBar.js
│       │   │   ├── Profile.js
│       │   │   ├── ProtectedRoute.js
│       │   │   ├── SignUp.js
│       │   │   ├── SpotifyLogin.js
│       │   │   ├── ThreeDText.js
│       │   │   ├── TrackSearchResult.js
│       │   │   ├── assets
│       │   │   │   ├── angel-in-realtime.png
│       │   │   │   ├── arizona-baby.jpg
│       │   │   │   ├── blond.jpg
│       │   │   │   ├── bubba.jpg
│       │   │   │   ├── channel-orange.jpg
│       │   │   │   ├── chromakopia.png
│       │   │   │   ├── circles.png
│       │   │   │   ├── college-dropout.jpg
│       │   │   │   ├── currents.jpg
│       │   │   │   ├── discovery.png
│       │   │   │   ├── for-your-eyez-only.jpg
│       │   │   │   ├── go-farther-in-lightness.jpg
│       │   │   │   ├── good-kid-maad-city.jpg
│       │   │   │   ├── grace.jpg
│       │   │   │   ├── hugo.jpg
│       │   │   │   ├── in-rainbows.jpg
│       │   │   │   ├── kid-a.jpg
│       │   │   │   ├── madvillainy.png
│       │   │   │   ├── miseducation-of-lauryn-hill.jpg
│       │   │   │   ├── mm-food.jpg
│       │   │   │   ├── mr-morale-and-the-big-steppers.png
│       │   │   │   ├── purple-rain.jpg
│       │   │   │   ├── random-access-memories.png
│       │   │   │   ├── songs-in-the-key-of-life.jpg
│       │   │   │   ├── the-forever-story.png
│       │   │   │   ├── thriller.jpg
│       │   │   │   ├── to-pimp-a-butterfly.png
│       │   │   │   └── whats-going-on.jpg
│       │   │   ├── css
│       │   │   │   ├── ContentBackground.css
│       │   │   │   ├── Login.css
│       │   │   │   ├── Navbar.css
│       │   │   │   ├── Profile.css
│       │   │   │   ├── SignUp.css
│       │   │   │   ├── ThreeDText.css
│       │   │   │   └── TrackSearchResult.css
│       │   │   └── useAuth.js
│       │   ├── countdown
│       │   │   ├── AddPlayerModal.js
│       │   │   ├── Hottest100Countdown.js
│       │   │   ├── ImportPlaylistModal.js
│       │   │   ├── PlayedTrackCard.js
│       │   │   ├── PlayerCard.js
│       │   │   ├── PlayerForm.js
│       │   │   ├── PlayerStatusCard.js
│       │   │   ├── PlayingTrackCard.js
│       │   │   ├── PlaylistCard.js
│       │   │   ├── PlaylistForm.js
│       │   │   ├── SongCountdown.js
│       │   │   └── css
│       │   │       ├── Hottest100Countdown.css
│       │   │       ├── PlayedTrackCard.css
│       │   │       ├── PlayerCard.css
│       │   │       ├── PlayerForm.css
│       │   │       ├── PlayerStatusCard.css
│       │   │       ├── PlayingTrackCard.css
│       │   │       ├── PlaylistCard.css
│       │   │       ├── PlaylistForm.css
│       │   │       └── SongCountdown.css
│       │   ├── dashboard
│       │   │   ├── Dashboard.js
│       │   │   ├── assets
│       │   │   └── css
│       │   │       └── dashboard.css
│       │   ├── songGuesser
│       │   │   ├── GameCard.js
│       │   │   ├── GameHistoryCard.js
│       │   │   ├── SongGuesser.js
│       │   │   ├── assets
│       │   │   └── css
│       │   │       ├── GameCard.css
│       │   │       ├── GameHistoryCard.css
│       │   │       └── SongGuesser.css
│       │   ├── statistics
│       │   │   ├── TopArtistCard.js
│       │   │   ├── TopTrackCard.js
│       │   │   ├── assets
│       │   │   │   └── play-button.png
│       │   │   ├── css
│       │   │   │   ├── TopArtistCard.css
│       │   │   │   ├── TopTrackCard.css
│       │   │   │   └── statisticsDashboard.css
│       │   │   └── statisticsDashboard.js
│       │   └── test.js
│       ├── context
│       │   └── UserContext.js
│       ├── global.css
│       ├── index.js
│       └── routes
│           └── Routes.js
├── pipeline
│   ├── config
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-311.pyc
│   │   │   └── config.cpython-311.pyc
│   │   └── config.py
│   ├── extract
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-311.pyc
│   │   │   ├── extract_albums.cpython-311.pyc
│   │   │   ├── extract_artists.cpython-311.pyc
│   │   │   └── extract_tracks.cpython-311.pyc
│   │   ├── extract_albums.py
│   │   ├── extract_artists.py
│   │   └── extract_tracks.py
│   ├── load
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-311.pyc
│   │   │   ├── load_albums.cpython-311.pyc
│   │   │   ├── load_artists.cpython-311.pyc
│   │   │   └── load_tracks.cpython-311.pyc
│   │   ├── load_albums.py
│   │   ├── load_artists.py
│   │   └── load_tracks.py
│   ├── logs
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-311.pyc
│   │   │   ├── dump_df.cpython-311.pyc
│   │   │   ├── dump_json.cpython-311.pyc
│   │   │   ├── json_writer.cpython-311.pyc
│   │   │   ├── pipeline_logger.cpython-311.pyc
│   │   │   └── pipieline_logger.cpython-311.pyc
│   │   ├── dump_df.py
│   │   ├── dump_json.py
│   │   ├── etl_pipeline.log
│   │   ├── pipeline_logger.py
│   │   └── test_files
│   │       ├── albums.df
│   │       ├── albums.json
│   │       ├── artists.df
│   │       ├── artists.json
│   │       ├── tracks.df
│   │       ├── tracks.json
│   │       └── tracks_preload.df
│   ├── main.py
│   └── transform
│       ├── __init__.py
│       ├── __pycache__
│       │   ├── __init__.cpython-311.pyc
│       │   ├── transform_albums.cpython-311.pyc
│       │   ├── transform_artists.cpython-311.pyc
│       │   └── transform_tracks.cpython-311.pyc
│       ├── transform_albums.py
│       ├── transform_artists.py
│       └── transform_tracks.py
└── server
    ├── config
    │   └── db_config.js
    ├── db.js
    ├── migrations
    │   ├── 20241115221707-create-users-table.js
    │   ├── 20241118130328-create-users-table.js
    │   ├── 20241118220732-add-role-status-to-user.js
    │   ├── 20241210084038-create-artists-tracks-albums-reviews-tables.js
    │   └── 20250102013425-rebuild-tables.js
    ├── models
    │   ├── Album.js
    │   ├── Artist.js
    │   ├── Review.js
    │   ├── Track.js
    │   ├── User.js
    │   └── index.js
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── seeders
    ├── server.js
    ├── test.js
    └── uploads
        ├── 4c8838831d26a52e6a6937443d180c53
        └── c2cc049c9d51de6df14ad851b35422e7
```

