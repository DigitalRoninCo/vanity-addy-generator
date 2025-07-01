use anchor_lang::prelude::*;

#[derive(BorshSerialize, BorshDeserialize)]
pub struct WipeProof {
    pub method: u8, // 0 = NIST, 1 = Crypto
    pub timestamp: i64,
    pub accounts: Vec<Pubkey>,
}

#[derive(Accounts)]
pub struct WipeAccount<'info> {
    #[account(mut)]
    pub target: AccountInfo<'info>,
}

pub fn store_wipe_proof(ctx: Context<WipeAccount>, method: u8) -> ProgramResult {
    let proof = WipeProof {
        method,
        timestamp: Clock::get()?.unix_timestamp,
        accounts: vec![ctx.accounts.target.key()],
    };

    let proof_bytes = proof.try_to_vec()?;
    let mut data = ctx.accounts.target.try_borrow_mut_data()?;
    data[..proof_bytes.len()].copy_from_slice(&proof_bytes);
    Ok(())
}
