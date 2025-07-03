-- programs/revenue-split/migrations/20250630030745_add_wipe_compliance.sql
BEGIN;

-- Add wipe proof column to transactions
ALTER TABLE transactions 
ADD COLUMN wipe_proof BYTEA;

-- Create audit log table
CREATE TABLE wipe_audit_logs (
    id SERIAL PRIMARY KEY,
    tx_id VARCHAR(128) NOT NULL,
    method VARCHAR(32) NOT NULL CHECK (method IN ('nist80088_clear', 'crypto_shred')),
    status VARCHAR(16) NOT NULL,
    proof_hash BYTEA UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_transaction 
      FOREIGN KEY(tx_id) REFERENCES transactions(tx_hash)
);

-- Add index for faster status checks
CREATE INDEX idx_wipe_status ON wipe_audit_logs(status);

COMMIT;