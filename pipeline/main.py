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
from logs import log_process 
from extract import extract_albums, extract_artists, extract_tracks
from config import LOG_FILE
import pandas as pd

def main():

    # log the start of the ETL pipeline
    log_process("Starting the ETL pipeline", "INFO", LOG_FILE)

    # extract data from the Spotify API
    log_process("Extracting data from the Spotify API...", "INFO", LOG_FILE)

    artists_df = extract_artists()
    albums_df = extract_albums()
    tracks_df = extract_tracks()


    # log the end of the ETL pipeline
    log_process("ETL pipeline complete\n", "INFO", LOG_FILE)
    return

if __name__ == "__main__":
    main()