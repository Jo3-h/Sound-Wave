from config import LOG_DIR
import pandas as pd

def dump_df(df: pd.DataFrame, name: str):
    with open(f'{LOG_DIR}/{name}.txt', 'w') as file:
        file.write(df.to_string(index=False, col_space=20, justify='left'))
    return