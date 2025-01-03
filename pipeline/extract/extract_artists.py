from logs import log_process
from config import LOG_FILE, MUSICBRAINZ_API_URL, MUSICBRAINZ_USER_AGENT
from config import KWORB_URL
import pandas as pd
import requests
from bs4 import BeautifulSoup
import json

def extract_top_artists(num_artists=50):

    # log the start of the extraction process
    log_process("Extracting top artists from the KWORB website...", "INFO", LOG_FILE)
    
    response = requests.get(KWORB_URL)
    if (response.status_code != 200):
        log_process(f"Failed to extract data from KWORB website - status_code: {response.status_code}", "ERROR", LOG_FILE)
        return []

    soup = BeautifulSoup(response.content, "html.parser")
    table = soup.find_all("tbody")
    rows = table[0].find_all("tr")
    artists = []
    for row in rows:
        if len(artists) > num_artists:
            break
        artist = row.find("td", class_="text").find("a").get_text(strip=True)
        artists.append(artist)

    # log the end of the extraction process
    log_process("Top artists extracted from the KWORB website", "INFO", LOG_FILE)

    return artists

def request_artist_data(artist_name: str):

    # log the start of the extraction process
    log_process(f"Extracting data for artist: {artist_name} from the MusicBrainz API...", "INFO", LOG_FILE)

    # create the URL for the MusicBrainz API request
    url = f"{MUSICBRAINZ_API_URL}artist?query=artist:{artist_name}&fmt=json"
    headers = {"User-Agent": MUSICBRAINZ_USER_AGENT}

    # make the request to the MusicBrainz API
    response = requests.get(url, headers=headers)
    if (response.status_code != 200):
        log_process(f"Failed to extract data from MusicBrainz API - status_code: {response.status_code}", "ERROR", LOG_FILE)
        return None

    # extract the artist data from the response
    artist_data = response.json()
    
    # log the end of the extraction process
    log_process(f"Data extracted for artist: {artist_name} from the MusicBrainz API", "INFO", LOG_FILE)

    if "artists" in artist_data and len(artist_data["artists"]) > 0:
        return  artist_data["artists"][0]
    else: 
        log_process(f"No data found for artist: {artist_name} in the MusicBrainz API response", "WARNING", LOG_FILE)
        return None

def extract_artists(test=False):

    # log the start of the extraction process
    log_process("Extracting artists from the MusicBrainz API...", "INFO", LOG_FILE)

    if test:
        artists = ["Frank Ocean"]
    else:
        artists = extract_top_artists(num_artists=20) 
    
    artists_data = []
    for artist in artists:
        artist_data = request_artist_data(artist)
        if artist_data:
            artists_data.append(artist_data)

    # log the end of the extraction process
    log_process("Artists extracted from the MusicBrainz API", "INFO", LOG_FILE)

    return artists_data

if __name__ == "__main__":
    extract_artists()