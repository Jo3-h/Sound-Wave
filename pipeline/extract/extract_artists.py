from logs import log_process
from config import LOG_FILE
import pandas as pd

def extract_artists():

    # log the start of the extraction process
    log_process("Extracting artists from the Spotify API...", "INFO", LOG_FILE)

    df = pd.DataFrame()

    return