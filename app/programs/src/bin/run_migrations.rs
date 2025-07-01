// programs/revenue-split/src/bin/run_migrations.rs
use diesel_migrations::{embed_migrations, MigrationHarness};
use vanity_addy::establish_connection;
use std::error::Error;

pub fn run() -> Result<(), Box<dyn Error>> {
    let connection = &mut establish_connection();
    embed_migrations!("migrations");
    connection.run_pending_migrations(MIGRATIONS)?;
    Ok(())
}
