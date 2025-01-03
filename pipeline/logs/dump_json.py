from config import LOG_DIR
import json
import os

def dump_json(data, filename):
    """
    Writes JSON data to a specified file. Creates the 'json' directory if it does not exist.

    Parameters:
    data (dict): The JSON data to write.
    filename (str): The name of the file to write the data to.
    """
    if not data:
        return None 

    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

    file_path = f"{LOG_DIR}/{filename}.json"
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)

    print(f"JSON data written to {file_path}")