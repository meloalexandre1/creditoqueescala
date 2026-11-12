-- Checklist de execução não contém dados pessoais. Compartilhado com a equipe via link.
CREATE TABLE IF NOT EXISTS cqe_task_progress (
 slug TEXT PRIMARY KEY,
 done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0,1)),
 updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
