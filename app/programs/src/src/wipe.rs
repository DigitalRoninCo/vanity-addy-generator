use anchor_lang::prelude::*;
use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Clone)]
pub struct WipeProof {
    /// Wipe method used: 0 = NIST clear, 1 = crypto shred
    pub method: u8,
    /// Unix timestamp when the wipe occurred
    pub timestamp: i64,
    /// Accounts that were wiped
    pub accounts: Vec<Pubkey>,
}

#[derive(Accounts)]
pub struct WipeAccount<'info> {
    /// Target account whose data is being wiped
    #[account(mut)]
    pub target: AccountInfo<'info>,
}

/// Stores a serialized [`WipeProof`] at the beginning of the target account
/// data. An error is returned if the account is too small to hold the proof.
pub fn store_wipe_proof(ctx: Context<WipeAccount>, method: u8) -> Result<()> {
    let proof = WipeProof {
        method,
        timestamp: Clock::get()?.unix_timestamp,
        accounts: vec![ctx.accounts.target.key()],
    };

    let mut data = ctx.accounts.target.try_borrow_mut_data()?;
    let encoded = proof.try_to_vec()?;
    require!(data.len() >= encoded.len(), ErrorCode::AccountTooSmall);

    data[..encoded.len()].copy_from_slice(&encoded);
    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Target account does not have enough space to store the wipe proof.")]
    AccountTooSmall,
}
