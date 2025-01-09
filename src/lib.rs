use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
};

// declare and export the program's entrypoint
entrypoint!(process_instruction);
 
// program entrypoint's implementation
pub fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8]
) -> ProgramResult {
    // log a message to the blockchain
    msg!("Hello, world!");
 
    // gracefully exit the program
    Ok(())
}

#[cfg(test)]
mod test {
    use super::*;
    use solana_program_test::*;
    use solana_sdk::{signature::Signer, transaction::Transaction};
 
    #[tokio::test]
    async fn test_hello_world() {
        let program_id = Pubkey::new_unique();
        let (banks_client, payer, recent_blockhash) =
            ProgramTest::new("hello_world", program_id, processor!(process_instruction))
                .start()
                .await;
 
        // Create the instruction to invoke the program
        let instruction =
            solana_program::instruction::Instruction::new_with_borsh(program_id, &(), vec![]);
 
        // Add the instruction to a new transaction
        let mut transaction = Transaction::new_with_payer(&[instruction], Some(&payer.pubkey()));
        transaction.sign(&[&payer], recent_blockhash);
 
        // Process the transaction
        let transaction_result = banks_client.process_transaction(transaction).await;
        assert!(transaction_result.is_ok());
    }
}