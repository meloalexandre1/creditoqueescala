-- Armazenamento privado de manifestações de interesse do Crédito que Escala.
-- Sem rota pública de consulta e sem exibir PII nos resultados.
CREATE TABLE IF NOT EXISTS cqe_leads (
 id TEXT PRIMARY KEY,
 nome TEXT NOT NULL,
 telefone TEXT NOT NULL,
 email TEXT NOT NULL,
 cnpj TEXT NOT NULL,
 instagram TEXT,
 faturamento TEXT NOT NULL,
 resposta_1 TEXT NOT NULL,
 resposta_2 TEXT NOT NULL,
 resposta_3 TEXT NOT NULL,
 resposta_4 TEXT NOT NULL,
 consentimento_em TEXT NOT NULL DEFAULT (datetime('now')),
 criado_em TEXT NOT NULL DEFAULT (datetime('now')),
 utm_source TEXT,
 utm_medium TEXT,
 utm_campaign TEXT,
 utm_content TEXT,
 utm_term TEXT,
 status TEXT NOT NULL DEFAULT 'novo'
);
CREATE INDEX IF NOT EXISTS idx_cqe_leads_date ON cqe_leads(criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_cqe_leads_email ON cqe_leads(email);
