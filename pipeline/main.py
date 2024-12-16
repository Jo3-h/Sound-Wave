"""
This script handles the ETL (Extract, Transform, Load) data integration pipeline
from the Spotify database to the project's own database. It extracts data from
Spotify, transforms it as needed, and loads it into the project's database for
further use and analysis.
"""

# Import necessary libraries and modules
from logs.pipieline_logger import log_process 

# Define constants
LOG_FILE = "logs/etl_pipeline.log"

def main():

    # Set the log file path
    log_process("Starting the ETL pipeline", "INFO", LOG_FILE)

    return

if __name__ == "__main__":
    main()