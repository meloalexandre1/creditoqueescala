-- Ativação segura e única da conta administrativa, sem senha em código-fonte.
CREATE TABLE IF NOT EXISTS cqe_admin_credentials (
 id INTEGER PRIMARY KEY CHECK(id=1),
 salt TEXT NOT NULL,
 password_hash TEXT NOT NULL,
 iterations INTEGER NOT NULL,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS cqe_admin_sessions (
 token_hash TEXT PRIMARY KEY,
 expires_at TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_cqe_admin_sessions_expiration ON cqe_admin_sessions(expires_at);
CREATE TABLE IF NOT EXISTS cqe_admin_bootstrap (
 id INTEGER PRIMARY KEY CHECK(id=1),
 code_hash TEXT NOT NULL,
 expires_at TEXT NOT NULL,
 used_at TEXT
);
INSERT OR IGNORE INTO cqe_admin_bootstrap(id,code_hash,expires_at)
VALUES (1, 'ccca6b8431c926c29ceee7167f6c5952a092efdeb95befdfe3334069efb74ad3', datetime('now','+30 days'));
