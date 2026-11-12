-- Evolução aditiva: preservar todos os leads existentes.
ALTER TABLE cqe_leads ADD COLUMN segmento TEXT;
ALTER TABLE cqe_leads ADD COLUMN recebiveis TEXT;
ALTER TABLE cqe_leads ADD COLUMN consentimento_marketing INTEGER NOT NULL DEFAULT 0;
ALTER TABLE cqe_leads ADD COLUMN referrer TEXT;
ALTER TABLE cqe_leads ADD COLUMN notas_comerciais TEXT NOT NULL DEFAULT '';
ALTER TABLE cqe_leads ADD COLUMN proximo_contato TEXT;
ALTER TABLE cqe_leads ADD COLUMN atualizado_em TEXT;
CREATE INDEX IF NOT EXISTS idx_cqe_leads_status ON cqe_leads(status, criado_em DESC);
CREATE TABLE IF NOT EXISTS cqe_lead_atividades (
 id TEXT PRIMARY KEY,
 lead_id TEXT NOT NULL REFERENCES cqe_leads(id),
 tipo TEXT NOT NULL,
 descricao TEXT NOT NULL,
 criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_cqe_atividades_lead ON cqe_lead_atividades(lead_id,criado_em DESC);

-- Contadores mínimos de interações; nenhuma informação pessoal ou IP.
CREATE TABLE IF NOT EXISTS cqe_funnel_events (
 id TEXT PRIMARY KEY,
 event_name TEXT NOT NULL,
 utm_source TEXT,
 utm_medium TEXT,
 utm_campaign TEXT,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_cqe_event_dates ON cqe_funnel_events(event_name,created_at DESC);
