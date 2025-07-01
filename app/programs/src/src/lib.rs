use anchor_lang::prelude::*;

pub mod wipe;

pub use wipe::*;

#[program]
pub mod vanity_addy {
    use super::*;

    pub fn store_wipe_proof(ctx: Context<WipeAccount>, method: u8) -> Result<()> {
        wipe::store_wipe_proof(ctx, method)
    }
}
