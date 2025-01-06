"""
Configuration file for the data integration pipeline
"""
from dotenv import load_dotenv
import os

load_dotenv()

VERBOSE = True
LOG_FILE = "logs/etl_pipeline.log"
LOG_DIR = "logs/test_files"

# configuration details for MusicBrainz API calls
MUSICBRAINZ_API_URL = "https://musicbrainz.org/ws/2/"
MUSICBRAINZ_USER_AGENT = 'SoundWave/1.0.0 ( joe.hosking1@gmail.com )'

# configuration details for ChartMaster API calls
KWORB_URL = "https://kworb.net/spotify/listeners.html"

# configuration details for the database connection
DB_HOSTNAME = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')