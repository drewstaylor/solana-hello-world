import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { getKeypairFromFile } from "@solana-developers/helpers";
  
const programId = new PublicKey("CufLvnMDuAqjtFq4e2k5LbyerKJ9CmMmHGoC8buao8Nn");

// Connect to Solana cluster
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  
// We load the keypair that we created in a previous step
const keyPair = await getKeypairFromFile("~/.config/solana/id.json");
  
// Every transaction requires a blockhash
const blockhashInfo = await connection.getLatestBlockhash();
  
// Create a new transaction
const tx = new Transaction({
  ...blockhashInfo,
});
  
// Add our Hello World instruction
tx.add(
  new TransactionInstruction({
    programId: programId,
    keys: [],
    data: Buffer.from([]),
  }),
);
  
// Sign the transaction with your previously created keypair
tx.sign(keyPair);
  
// Send the transaction to the Solana network
const txHash = await connection.sendRawTransaction(tx.serialize());
  
console.log("Transaction sent with hash:", txHash);
  
await connection.confirmTransaction({
  blockhash: blockhashInfo.blockhash,
  lastValidBlockHeight: blockhashInfo.lastValidBlockHeight,
  signature: txHash,
});
  
console.log(
  `Congratulations! Look at your ‘Hello World' transaction in the Solana Explorer:
  https://explorer.solana.com/tx/${txHash}?cluster=custom`,
);