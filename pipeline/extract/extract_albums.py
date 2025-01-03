from logs import log_process 
from config import LOG_FILE, MUSICBRAINZ_API_URL, MUSICBRAINZ_USER_AGENT
import json
import requests

def request_albums_data(artist_id: str):
    
    if not artist_id:
        log_process("No artist ID provided for album extraction", "WARNING", LOG_FILE)
        return None
    
    # log the start of the extraction process
    log_process(f"Extracting albums for artist ID: {artist_id} from the Music Brainz API...", "INFO", LOG_FILE)

    url = f"{MUSICBRAINZ_API_URL}release-group?artist={artist_id}&type=album&fmt=json"
    headers = {"User-Agent": MUSICBRAINZ_USER_AGENT}

    response = requests.get(url, headers=headers)
    if (response.status_code != 200):
        log_process(f"Failed to extract album data from MusicBrainz API - status_code: {response.status_code}", "ERROR", LOG_FILE)
        return None
    
    album_data = response.json()
    for album in album_data["release-groups"]:
        album["artist_id"] = artist_id

    log_process(f"Album data extracted for artist ID: {artist_id} from the MusicBrainz API", "INFO", LOG_FILE)

    return album_data["release-groups"]


def extract_albums(artists: list):

    # check for empty input
    if not artists or len(artists) == 0:
        log_process("No artists provided for album extraction", "WARNING", LOG_FILE)
        return []

    # log the start of the extraction process
    log_process("Extracting albums from the Music Brainz API...", "INFO", LOG_FILE)

    # extract albums for each artist
    albums = []
    for artist in artists:
        artist_albums = request_albums_data(artist["id"])
        albums.extend(artist_albums)

    # log the end of the extraction process
    log_process("Albums extracted from the Music Brainz API", "INFO", LOG_FILE)

    return albums