CREATE TABLE users (
                       id            INT AUTO_INCREMENT PRIMARY KEY,
                       email         TEXT UNIQUE NOT NULL,
                       username      TEXT NOT NULL,
                       password_hash TEXT NOT NULL,  -- bcrypt / PBKDF2‑SHA‑256
                       created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
                       last_login_at TIMESTAMP
);

CREATE TABLE notes (
                       id          INT AUTO_INCREMENT PRIMARY KEY,
                       owner_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                       title       TEXT,
                       content     TEXT,
                       is_public   BOOLEAN NOT NULL DEFAULT FALSE,
                       public_slug TEXT UNIQUE,  -- случайно UUID/Hash
                       created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
                       updated_at  TIMESTAMP NOT NULL DEFAULT NOW(),
                       deleted_at  TIMESTAMP
);

CREATE TABLE note_shares (
                             id             INT AUTO_INCREMENT PRIMARY KEY,
                             note_id        INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
                             shared_with_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                             perm           TEXT NOT NULL CHECK (perm IN ('read','edit')),
                             created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
                             UNIQUE (note_id, shared_with_id)
);

CREATE TABLE todo_items (
                            id         INT AUTO_INCREMENT PRIMARY KEY,
                            creator_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                            text       TEXT NOT NULL,
                            is_done    BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE reminders (
                           id           INT AUTO_INCREMENT PRIMARY KEY,
                           todo_id      INT NOT NULL REFERENCES todo_items(id) ON DELETE CASCADE,
                           creator_id   INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                           remind_at    TIMESTAMP NOT NULL,
                           is_sent      BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE notifications (
                               id           INT AUTO_INCREMENT PRIMARY KEY,
                               user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                               reminder_id  INTEGER NOT NULL REFERENCES reminders(id) ON DELETE CASCADE,
                               channel      TEXT NOT NULL CHECK (channel IN ('email','in-app')),
                               sent_at      TIMESTAMP NOT NULL
);


CREATE INDEX idx_users_username ON users (username);

CREATE INDEX idx_notes_owner_id ON notes (owner_id);
CREATE INDEX idx_notes_public_slug ON notes (public_slug);
CREATE INDEX idx_notes_deleted_at ON notes (deleted_at);

CREATE INDEX idx_note_shares_shared_with_id ON note_shares (shared_with_id);

CREATE INDEX idx_todo_creator_id ON todo_items (creator_id);
CREATE INDEX idx_todo_due_date ON todo_items (due_date);

CREATE INDEX idx_reminders_todo_id ON reminders (todo_id);
CREATE INDEX idx_reminders_remind_at ON reminders (remind_at);
CREATE INDEX idx_reminders_is_sent ON reminders (is_sent);

CREATE INDEX idx_notifications_user_id ON notifications (user_id);
CREATE INDEX idx_notifications_sent_at ON notifications (sent_at);