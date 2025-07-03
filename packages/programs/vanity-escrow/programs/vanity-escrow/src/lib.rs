use anchor_lang::prelude::*;

declare_id!("Escrow11111111111111111111111111111111");

#[program]
pub mod vanity_escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, amount: u64) -> Result<()> {
        ctx.accounts.escrow.amount = amount;
        Ok(())
    }
}