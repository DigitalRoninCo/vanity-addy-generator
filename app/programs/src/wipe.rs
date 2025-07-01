# Retention Policies
data_classes:
  wallet_keys:
    active_ttl: 30d
    cold_ttl: 180d
    wipe_method: nist80088_clear
  
  redis_cache:
    active_ttl: 7d
    wipe_method: crypto_shred

# Compliance Standards
standards:
  - gdpr_article17#[derive(BorshSerialize, BorshDeserialize)]
  pub struct WipeProof {
      pub method: u8,  // 0=NIST, 1=Crypto
      pub timestamp: i64,
      pub accounts: Vec<Pubkey>
  }
  
  pub fn store_wipe_proof(
      ctx: Context<WipeAccount>,
      method: u8
  ) -> ProgramResult {
      let proof = WipeProof {
          method,
          timestamp: Clock::get()?.unix_timestamp,
          accounts: vec![ctx.accounts.target.key()]
      };
      
      // Store in transaction metadata
      let mut account_data = ctx.accounts.target.try_borrow_mut_data()?;
      let proof_bytes = proof.try_to_vec()?;
      account_data[..proof_bytes.len()].copy_from_slice(&proof_bytes);
      
      Ok(())
  }
  - ccpa
  - sox_404
