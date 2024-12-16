from logs import log_process 
from config import LOG_FILE

def extract_albums():
    log_process("Extracting albums from the Spotify API...", "INFO", LOG_FILE)
    return