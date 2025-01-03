from logs import log_process, dump_json
from config import LOG_FILE, MUSICBRAINZ_API_URL, MUSICBRAINZ_USER_AGENT
import requests
import json

def request_tracks_data(album_id: str):

    if not album_id:
        log_process("No album ID provided for track extraction", "WARNING", LOG_FILE)
        return []
    
    # log the start of the extraction process
    log_process(f"Extracting tracks for album ID: {album_id} from the Music Brainz API...", "INFO", LOG_FILE)

    url = f"{MUSICBRAINZ_API_URL}release-group/{album_id}?inc=releases&fmt=json"
    headers = {"User-Agent": MUSICBRAINZ_USER_AGENT}

    response = requests.get(url, headers=headers)
    if (response.status_code != 200):
        log_process(f"Failed to extract track data from MusicBrainz API - status_code: {response.status_code}", "ERROR", LOG_FILE)
        print(response.text)
        return []
    
    track_data = response.json()
    releases = track_data["releases"]

    track_data = []
    for release in releases:    
        url = f"{MUSICBRAINZ_API_URL}release/{release['id']}?inc=recordings&fmt=json"
        response = requests.get(url, headers=headers)
        if (response.status_code != 200):
            continue
        track_data.extend(response.json()["media"][0]["tracks"])

    
    result = []
    track_data = response.json()

    # Use a set to track titles
    track_titles = set()
    track_ids = set()
    if "media" in track_data and "tracks" in track_data["media"][0]:
        for track in track_data["media"][0]["tracks"]:
            if track["title"] not in track_titles and track["id"] not in track_ids:
                track["album_id"] = album_id
                result.append(track)
                track_titles.add(track["title"])
                track_ids.add(track["id"])
    
    log_process(f"Track data extracted for album ID: {album_id} from the Music Brainz API", "INFO", LOG_FILE)

    return result

def extract_tracks(album_data: list):

    log_process("Extracting tracks from the Spotify API...", "INFO", LOG_FILE)

    # Extract tracks data from the Spotify API
    if not album_data or len(album_data) == 0:
        log_process("No albums provided for track extraction", "WARNING", LOG_FILE)
        return []
    
    tracks = []
    for album in album_data:
        album_tracks = request_tracks_data(album["id"])
        tracks.extend(album_tracks)

    log_process("Tracks extracted from the Music Brainz API", "INFO", LOG_FILE)

    return tracks