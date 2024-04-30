const SHA256 = require('crypto-js/sha256');

// Import the Blockchain, User, Transaction, and Validator classes from the src directory
const Blockchain = require('./src/blockchain');
const User = require('./src/user');
const Transaction = require('./src/transaction');
const Utils = require('./src/utils');
const Validator = require('./src/validator');

// Helper function to compute hash
function computeHash(data, previousHash) {
  return SHA256(data + previousHash).toString();
}

// Function to process a transaction
function processTransaction(sender, recipient, amount) {
  const transaction = Transaction.createTransaction(sender, recipient, amount);
  if (transaction){
    blockchain.addTransaction(transaction);
    const block = blockchain.mineBlock(blockchain.getLastBlock().hash);
    blockchain.push(block);
  }
  return transaction;
}

// Function to manage validators
function manageValidators(action, validator) {
  if (action === 'add') {
    validators.push(validator);
  } else if (action === 'remove') {
    const index = validators.indexOf(validator);
    if (index !== -1) {
      validators.splice(index, 1);
    }
  }
}

// Define a function to select the validator for the next block
function selectValidator(validators) {
    if (validators.length == 0) {
        return;
    }

    const totalStake = Object.values(validators).reduce((total, stake) => total + stake, 0);
    let randomStake = Math.floor(Math.random() * totalStake);
    let cumulativeStake = 0;
  
    for (const node in validators) {
      if (node.blocksBanned > 0) {
        node.blocksBanned -= 1;
        continue;
      }
      cumulativeStake += stakes[node];
      if (cumulativeStake >= randomStake) {
        return node;
      }
    }
    return validators[0];
}

// Main application logic
/**
 * 1. Create blockchain instance from src/blockchain.js
 * 2. Create users Alice, Bob, and Charlie (0 starting balance)
 * 3. Create validators Alex and Albert with starting balances of 50 and 100
 * 4. Process transactions between Alice and Bob
 * 5. Log user and validator balances after each transaction
 * 6. If the validator has been punished 3 times, ban them from validation for 10 blocks
 */


// Initialize a new instance of the Blockchain class
const blockchain = new Blockchain();
blockchain.createGenesisBlock();
const aliceBalance = 50;
const bobBalance = 30;
const charlieBalance = 20;

const alice = new User('Alice', "alice@gmail.com", aliceBalance);
const bob = new User('Bob', "bob@gmail.com", bobBalance);
const charlie = new User('Charlie', "charlie@gmail.com", charlieBalance);

blockchain.registerUser(alice);
blockchain.registerUser(bob);
blockchain.registerUser(charlie);

const validators = [];
const alex = new Validator("Alex", 50);
validators.push(alex);
const albert = new Validator("Albert", 100);
validators.push(albert);

blockchain.registerValidator(alex);
blockchain.registerValidator(albert);

const sendAmt = 10;
transaction = processTransaction(alice, bob, sendAmt);

console.log('Blockchain:', blockchain);
console.log('Users:', users);
console.log('Validators:', validators);

currentValidator = selectValidator();
currentValidator.validateTransaction(transaction, aliceBalance, bobBalance, alice.balance, bob.balance, sendAmt);
aliceBalance = alice.balance;
bobBalance = bob.balance;
charlieBalance = charlie.balance;

transaction = processTransaction(bob, charlie, sendAmt);
currentValidator = selectValidator();
currentValidator.validateTransaction(transaction, aliceBalance, bobBalance, alice.balance, bob.balance, sendAmt);

// manageValidators('add', { name: 'Validator 1' });
// manageValidators('remove', { name: 'Validator 1' });

console.log('Blockchain:', blockchain);
console.log('Users:', users);
console.log('Validators:', validators);
