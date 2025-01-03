import pandas as pd

def transform(artist: dict):
    return {
        "id": artist["id"],
        "name": artist["name"],
        "bio": "",
        "image": "",
    }

def transform_artists(artists: list):

    # transform the artists data
    transformed_artists = [transform(artist) for artist in artists]

    return pd.DataFrame(transformed_artists)