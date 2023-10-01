DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id TEXT PRIMARY KEY NOT NULL,
    password TEXT NOT NULL,
    character TEXT NOT NULL,
    max_score DECIMAL
);

-- DROP TABLE IF EXISTS characters;

-- CREATE TABLE characters
-- (
--     char_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     name TEXT NOT NULL
-- );

-- INSERT INTO characters(name)
-- VALUES ('Gawain'),
--         ('Lancelot'),
--         ('Mordred'),
--         ('Percival');