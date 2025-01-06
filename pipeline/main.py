"""
This script handles the ETL (Extract, Transform, Load) data integration pipeline
from the Spotify database to the project's own database. It extracts data from
Spotify, transforms it as needed, and loads it into the project's database for
further use and analysis.
"""

# Import necessary libraries and modules
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from logs import log_process, dump_json, dump_df
from extract import extract_albums, extract_artists, extract_tracks
from transform import transform_albums, transform_artists, transform_tracks
from load import load_albums, load_artists, load_tracks
from config import LOG_FILE, VERBOSE
import pandas as pd
import json

def main():

    # log the start of the ETL pipeline
    log_process("Starting the ETL pipeline", "INFO", LOG_FILE)

    # extract data from the Spotify API
    log_process("Extracting data from the Spotify API...", "INFO", LOG_FILE)
    artists_data = extract_artists(test=True)
    albums_data = extract_albums(artists_data)
    tracks_data = extract_tracks(albums_data)

    if VERBOSE:
        dump_json(artists_data, 'artists')
        dump_json(albums_data, 'albums')
        dump_json(tracks_data, 'tracks')

    # transform the extracted data
    log_process("Transforming the extracted data...", "INFO", LOG_FILE)
    artists_df = transform_artists(artists_data)
    albums_df = transform_albums(albums_data)
    tracks_df = transform_tracks(tracks_data)

    if VERBOSE:
        dump_df(artists_df, 'artists')
        dump_df(albums_df, 'albums')
        dump_df(tracks_df, 'tracks')

    # load the transformed data into the project's database
    log_process("Loading the transformed data into the project's database...", "INFO", LOG_FILE)
    load_artists(artists_df, truncate=True)
    load_albums(albums_df, truncate=True)
    load_tracks(tracks_df, truncate=True)

    # log the end of the ETL pipeline
    log_process("ETL pipeline complete\n", "INFO", LOG_FILE)

    return

if __name__ == "__main__":
    main()