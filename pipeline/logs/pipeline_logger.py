"""
This script handles the logging for the ETL (Extract, Transform, Load) data integration pipeline
"""

# Import necessary libraries and modules
import os
from datetime import datetime
import socket
import getpass

def log_process(message: str, level: str, log_file: str):

    # check if the log file exists
    if not os.path.exists(log_file):
        with open(log_file, "w") as file:
            file.write("")

    # get the current timestamp / IP of running machine / username of current user
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        ip_address = socket.gethostbyname(socket.gethostname())
    except:
        ip_address = "Unknown IP address"
    try:
        username = getpass.getuser()
    except:
        username = "Unknown username"

    # write the log message to the log file
    with open(log_file, "a") as file:
        file.write(f'[{level.upper()}] [{current_time}] [{ip_address}] [{username}] ')
        file.write(" -> " + message + "\n")

    
    return