from logs import log_process
from config import DB_HOSTNAME, DB_NAME, DB_USER, DB_PASSWORD, LOG_FILE
import mysql.connector
import pandas as pd

def load_artists(artists_df: pd.DataFrame, truncate: bool = False):

    # create a connection to the database
    db_config = {
        'host': DB_HOSTNAME,
        'user': DB_USER,
        'password': DB_PASSWORD,
        'database': DB_NAME
    }
    
    # log the start of the load process
    log_process("Loading artists into the database...", "INFO", LOG_FILE)
    
    connection = None
    cursor = None

    try:
        # Create a connection to the database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # if truncate is True, delete all records from the table
        if truncate:
            cursor.execute("TRUNCATE TABLE Artists")

        # Load the artists data into the database
        for _, row in artists_df.iterrows():
            cursor.execute(
                "INSERT INTO Artists (id, name, bio, image) VALUES (%s, %s, %s, %s)",
                (row['id'], row['name'], row['bio'], row['image'])
            )

        # Commit the transaction
        connection.commit()

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
    
    # log the end of the load process
    log_process("Artists loaded into the database", "INFO", LOG_FILE)
    
    return