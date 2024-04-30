class Blockchain {
  constructor() {
    this.chain = [];
    this.users = [];
    this.validators = [];
    this.pendingTransactions = [];
    this.difficulty = 4; // Adjust difficulty as needed
  }

  // Method to create the genesis block
  createGenesisBlock() {
    const genesisBlock = {
        index: 0,
        timestamp: Date.now(),
        transactions: [],
        nonce: 0,
        hash: this.calculateHash(0, Date.now(), [], 0, '0'),
        previousBlockHash: '0',
    };

    this.chain.push(genesisBlock);
  }

  // Method to create a new block
  createBlock(nonce, previousBlockHash, hash) {
    const block = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce,
      hash,
      previousBlockHash,
    };

    this.pendingTransactions = [];
    this.chain.push(block);

    return block;
  }

  // Method to get the last block in the chain
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  //Method to get the last pending transaction
  getLastPendingTransaction() {
    return this.chain.pendingTransactions[this.chain.pendingTransactions.length - 1];
  }

  // Method to add a new transaction
  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  // Method to validate a block
  validateBlock(block) {
    const { index, timestamp, transactions, nonce, hash, previousBlockHash } = block;

    // Check if the block index is correct
    if (index !== this.chain.length) {
      return false;
    }

    // Check if the previous block hash is correct
    if (previousBlockHash !== this.getLastBlock().hash) {
      return false;
    }

    // Check if the block hash is correct
    const calculatedHash = this.calculateHash(index, timestamp, transactions, nonce, previousBlockHash);
    if (calculatedHash !== hash) {
      return false;
    }

    // Check if the block meets the difficulty requirement
    if (!this.validateDifficulty(hash, this.difficulty)) {
      return false;
    }

    return true;
  }

  // Method to calculate the hash of a block
  calculateHash(index, timestamp, transactions, nonce, previousBlockHash) {
    return require('crypto')
      .createHash('sha256')
      .update(`${index}${timestamp}${transactions.join('')}${nonce}${previousBlockHash}`)
      .digest('hex');
  }

  // Method to validate the difficulty of a block
  validateDifficulty(hash, difficulty) {
    const requiredPrefix = '0'.repeat(difficulty);
    return hash.startsWith(requiredPrefix);
  }

  // Method to mine a new block
  mineBlock(previousBlockHash) {
    let nonce = 0;
    let hash;

    do {
      nonce++;
      hash = this.calculateHash(this.chain.length, Date.now(), this.pendingTransactions, nonce, previousBlockHash);
    } while (!this.validateDifficulty(hash, this.difficulty));

    const newBlock = this.createBlock(nonce, previousBlockHash, hash);
    this.rewardValidators(); // Reward validators after successful mining

    return newBlock;
  }

  // Method to reward validators
  rewardValidators() {
    const validatorModule = require('./validator');

    for (const validator of this.validators) {
      validatorModule.rewardValidator(validator);
    }
  }

  // Method to punish validators
  punishValidators() {
    const validatorModule = require('./validator');

    for (const validator of this.validators) {
      validatorModule.punishValidator(validator);
    }
  }

  // Method to register a new user
  registerUser(user) {
    this.users.push(user);
  }

  // Method to register a new validator
  registerValidator(validator) {
    this.validators.push(validator);
  }
}
module.exports = Blockchain;