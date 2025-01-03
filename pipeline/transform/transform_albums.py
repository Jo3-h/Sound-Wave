import pandas as pd

def transform(album: dict):

    return {
        "id": album["id"] or "",
        "title": album["title"] or "",
        "release_date": album["first-release-date"] or "",
        "image": "",
        "artist_id": album["artist_id"] or "",
        "track_id": "",
    }

def transform_albums(albums_data: list):

    transformed_albums = [transform(album) for album in albums_data]

    return pd.DataFrame(transformed_albums)