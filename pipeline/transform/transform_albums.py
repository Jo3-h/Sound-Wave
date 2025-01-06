import pandas as pd
from logs import dump_df    

def transform(album: dict):

    return {
        "id": album["id"] or "",
        "title": album["title"] or "",
        "release_date": album["first-release-date"] or "",
        "image": album["image"] or "",
        "artist_id": album["artist_id"] or "",
    }

def transform_albums(albums_data: list):

    transformed_albums = [transform(album) for album in albums_data]

    return pd.DataFrame(transformed_albums)