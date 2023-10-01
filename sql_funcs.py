from database import get_db, close_db
from users import user

# Functions for sql queries


def get_user_dict(user_id):
    db = get_db()
    user_dict = db.execute("""SELECT * FROM users
    WHERE user_id = ?;""", (user_id,)).fetchone()
    close_db()
    return user_dict


def create_user(user_dict):
    user_obj = user(user_dict['user_id'], user_dict['password'], user_dict['character'], user_dict['max_score'])
    return user_obj

def get_leader_boards():
    db = get_db()
    players_sql = db.execute("""SELECT * FROM users WHERE max_score IS NOT NULL
    ORDER BY max_score;""").fetchall()
    close_db()
    players = [create_user(player_sql) for player_sql in players_sql]
    return players





