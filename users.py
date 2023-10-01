
from database import get_db, close_db


class user:
    def __init__(self, user_id, password, character, max_score):
        self.user_id = user_id
        self.password = password
        self.character = character
        self.max_score = max_score

    def attributes(self):
        return vars(self)

    def update_user(self):
        db = get_db()
        db.execute("""UPDATE users
        SET max_score = ?
        WHERE user_id=?;
        """, (self.max_score, self.user_id))
        db.commit()
        close_db()


    def delete_user(self):
        db = get_db()
        db.execute("""DELETE FROM users
        WHERE user_id=?;""", (self.user_id,))
        db.commit()
        close_db()

    def add_user(self):
        db = get_db()
        db.execute("""INSERT INTO users (user_id, password,character, max_score)
        VALUES (?, ?, ?, ?);""", (self.user_id, self.password, self.character,self.max_score))
        db.commit()
        close_db()

    def get_char_name(self):
        db = get_db()
        char_name = db.execute("""SELECT name FROM characters
        WHERE char_id=?;""", (self.character,)).fetchone()
        close_db()
        return char_name
    