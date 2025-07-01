use std::time::{SystemTime, UNIX_EPOCH};
use std::error::Error;

#[derive(Clone, Debug)]
pub struct Pubkey(pub [u8; 32]);

pub struct TargetAccount {
    pub key: Pubkey,
    pub data: Vec<u8>,
}

impl TargetAccount {
    pub fn key(&self) -> Pubkey {
        self.key.clone()
    }

    pub fn try_borrow_mut_data(&mut self) -> Result<&mut Vec<u8>, Box<dyn Error>> {
        Ok(&mut self.data)
    }
}

pub struct WipeAccount<'a> {
    pub target: &'a mut TargetAccount,
}

pub struct Context<T> {
    pub accounts: T,
}

pub type ProgramResult = Result<(), Box<dyn Error>>;

pub struct Clock(i64);

impl Clock {
    pub fn get() -> Result<Self, Box<dyn Error>> {
        let ts = SystemTime::now()
            .duration_since(UNIX_EPOCH)?
            .as_secs() as i64;
        Ok(Self(ts))
    }

    pub fn unix_timestamp(&self) -> i64 {
        self.0
    }
}

pub struct WipeProof {
    pub method: u8, // 0=NIST, 1=Crypto
    pub timestamp: i64,
    pub accounts: Vec<Pubkey>,
}

impl WipeProof {
    pub fn try_to_vec(&self) -> Result<Vec<u8>, Box<dyn Error>> {
        Ok(format!("{}:{}:{}", self.method, self.timestamp, self.accounts.len()).into_bytes())
    }
}

pub fn store_wipe_proof(
    ctx: Context<WipeAccount>,
    method: u8,
) -> ProgramResult {
    let proof = WipeProof {
        method,
        timestamp: Clock::get()?.unix_timestamp(),
        accounts: vec![ctx.accounts.target.key()],
    };

    let mut account_data = ctx.accounts.target.try_borrow_mut_data()?;
    let proof_bytes = proof.try_to_vec()?;

    if account_data.len() < proof_bytes.len() {
        account_data.resize(proof_bytes.len(), 0);
    }
    account_data[..proof_bytes.len()].copy_from_slice(&proof_bytes);

    Ok(())
}
