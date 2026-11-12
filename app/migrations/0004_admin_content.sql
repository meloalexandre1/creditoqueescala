-- Etapas de conteúdo para sincronização entre sessões autenticadas.
CREATE TABLE IF NOT EXISTS cqe_content_progress (
 slug TEXT PRIMARY KEY,
 produced INTEGER NOT NULL DEFAULT 0 CHECK (produced IN (0,1)),
 published INTEGER NOT NULL DEFAULT 0 CHECK (published IN (0,1)),
 updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
-- Somente identificador derivado por HMAC do endereço de origem; nenhum IP em claro.
CREATE TABLE IF NOT EXISTS cqe_admin_attempts (
 identifier TEXT PRIMARY KEY,
 attempts INTEGER NOT NULL DEFAULT 0,
 updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
