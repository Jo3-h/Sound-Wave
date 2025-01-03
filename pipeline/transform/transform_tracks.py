import pandas as pd

def transform(track: dict):
    return {
        "id": track["id"],
        "title": track["title"],
        "duration_s": track["length"],
        "genre": "",
        "album_id": track["album_id"],
    }

def transform_tracks(tracks_data: list):

    transformed_tracks = [transform(track) for track in tracks_data]

    return pd.DataFrame(transformed_tracks)