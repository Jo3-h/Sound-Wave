from logs import log_process
from config import DB_HOSTNAME, DB_NAME, DB_USER, DB_PASSWORD, LOG_FILE
import mysql.connector
import pandas as pd

def load_albums(albums_df: pd.DataFrame, truncate: bool = False):

    # create a connection to the database
    db_config = {
        'host': DB_HOSTNAME,
        'user': DB_USER,
        'password': DB_PASSWORD,
        'database': DB_NAME
    }

    # log the start of the load process
    log_process("Loading albums into the database...", "INFO", LOG_FILE)

    connection = None
    cursor = None

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Load the albums data into the database
        for _, row in albums_df.iterrows():
            cursor.execute(
                "INSERT INTO Albums (id, title, release_date, image, artist_id) VALUES (%s, %s, %s, %s, %s)",
                (row['id'], row['title'], row['release_date'], row['image'], row['artist_id'])
            )

        connection.commit()

    except mysql.connector.Error as err:
        log_process(f"Error: {err}", "ERROR", LOG_FILE)
        if connection:
            connection.rollback()
    
    finally:

        if cursor:
            cursor.close()
        if connection:
            connection.close()

    log_process("Albums loaded into the database", "INFO", LOG_FILE)

    return