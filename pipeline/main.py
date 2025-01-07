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
from logs import log_process, dump_json, dump_df, dump_dict
from extract import extract_albums, extract_artists, extract_tracks
from transform import transform_albums, transform_artists, transform_tracks
from load import load_albums, load_artists, load_tracks
from config import LOG_FILE, VERBOSE, DB_HOSTNAME, DB_NAME, DB_USER, DB_PASSWORD
import mysql.connector
import argparse as ap

def main():

    # Parse command-line arguments
    parser = ap.ArgumentParser(description="Run the data integration pipeline or describe the database.")
    parser.add_argument('--action', type=str, choices=['pipeline', 'describe'], required=True,
                        help="Specify 'pipeline' to run the full pipeline or 'describe' to display/export database structure.")
    args = parser.parse_args()

    if args.action == 'pipeline':
        run_pipeline() # run the ETL pipeline
    
    elif args.action == 'describe':
        describe_database() # describe the database structure

    return

def run_pipeline():

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
    load_artists(artists_df, delete=True)
    load_albums(albums_df, delete=True)
    load_tracks(tracks_df, delete=True)

    # log the end of the ETL pipeline
    log_process("ETL pipeline complete\n", "INFO", LOG_FILE)

    return

def describe_database():

    # create a connection to the database
    connection = mysql.connector.connect(
        host=DB_HOSTNAME,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )

    # Fetch all tables in the database
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SHOW TABLES")
    tables = [row[f"Tables_in_{connection.database}"].decode('utf-8') if isinstance(row[f"Tables_in_{connection.database}"], (bytes, bytearray)) else row[f"Tables_in_{connection.database}"] for row in cursor.fetchall()]

    db_description = {}
    for table in tables:
        db_description[table] = {"columns": [], "foreign_keys": []}

        # Fetch columns and their attributes
        cursor.execute(f"""
        SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY, EXTRA
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = '{connection.database}' AND TABLE_NAME = '{table}';
        """)
        db_description[table]["columns"] = cursor.fetchall()

        # Fetch foreign key constraints
        cursor.execute(f"""
        SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE TABLE_SCHEMA = '{connection.database}' AND TABLE_NAME = '{table}'
        AND REFERENCED_TABLE_NAME IS NOT NULL;
        """)
        db_description[table]["foreign_keys"] = cursor.fetchall()

    cursor.close()

    dump_dict(db_description, 'database_description')

    return 

if __name__ == "__main__":
    main()