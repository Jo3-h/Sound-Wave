from config import LOG_DIR, VERBOSE
import json
import os

def serialize_bytes(obj):
    """
    Custom serializer for JSON to handle bytes objects.
    Converts bytes to string using UTF-8 decoding.
    """
    if isinstance(obj, (bytes, bytearray)):
        return obj.decode("utf-8")
    raise TypeError(f"Object of type {type(obj).__name__} is not JSON serializable")

def dump_dict(data: dict, name: str):
    """
    Writes a dictionary to a specified file in the 'logs' directory, handling bytes serialization.
    """
    if not data:
        return None

    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

    with open(f'{LOG_DIR}/{name}.dict', 'w') as file:
        json.dump(data, file, indent=4, default=serialize_bytes)

    if VERBOSE:
        print(f"Dictionary written to {LOG_DIR}/{name}.dict")

    return
