
CREATE TABLE auth_user (
    id CHAR(42) PRIMARY KEY CHECK (id ~ '^0x[a-fA-F0-9]{40}$')
);

CREATE TABLE auth_session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id CHAR(42) NOT NULL REFERENCES auth_user(id)
);
