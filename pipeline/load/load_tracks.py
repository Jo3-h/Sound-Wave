from logs import log_process
from config import DB_HOSTNAME, DB_NAME, DB_USER, DB_PASSWORD, LOG_FILE
import mysql.connector
import pandas as pd

def load_tracks(tracks_df: pd.DataFrame, truncate: bool = False):

    # create a connection to the database
    db_config = {
        'host': DB_HOSTNAME,
        'user': DB_USER,
        'password': DB_PASSWORD,
        'database': DB_NAME
    }

    # log the start of the load process
    log_process("Loading tracks into the database...", "INFO", LOG_FILE)

    connection = None
    cursor = None

    try:

        # Create a connection to the database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Fill in missing values with empty strings or 0
        tracks_df = tracks_df.fillna({
            'id': '',
            'title': '',
            'duration_s': 0,
            'genre': '',
            'album_id': ''
        })

        # Load the tracks data into the database
        for _, row in tracks_df.iterrows():
            cursor.execute(
                "INSERT INTO Tracks (id, title, duration_s, genre, album_id) VALUES (%s, %s, %s, %s, %s)",
                (row['id'], row['title'], row['duration_s'], row['genre'], row['album_id'])
            )
    
    except mysql.connector.Error as err:
        log_process(f"Error: {err}", "ERROR", LOG_FILE)
        if connection:
            connection.rollback()

    finally:

        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

    log_process("Tracks loaded into the database", "INFO", LOG_FILE)

    return