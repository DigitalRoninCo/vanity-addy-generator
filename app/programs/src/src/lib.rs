use anchor_lang::prelude::*;

// Unique program identifier required by Anchor
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkgE9DuAyY29S");

pub mod wipe;
pub mod db;

pub use db::establish_connection;

pub use wipe::*;

#[program]
pub mod vanity_addy {
    use super::*;

    pub fn store_wipe_proof(ctx: Context<WipeAccount>, method: u8) -> Result<()> {
        wipe::store_wipe_proof(ctx, method)
    }
}
