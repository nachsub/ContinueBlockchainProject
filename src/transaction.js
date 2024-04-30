class Transaction {
  constructor(sender, recipient, amount) {
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
    this.timestamp = new Date();
  }

  static createTransaction(sender, recipient, amount) {
    // Validate transaction inputs
    if (!sender || !recipient || amount <= 0) {
      throw new Error('Invalid transaction inputs');
    }

    // Check sender's balance
    if (sender.balance < amount) {
      throw new Error('Insufficient funds');
    }

    // Create a new transaction instance
    const transaction = new Transaction(sender, recipient, amount);

    // Update user balances
    sender.balance -= amount;
    recipient.balance += amount;

    return transaction;
  }

  static validateTransaction(transaction) {
    // Implement transaction validation logic
    // ...
  }
}
module.exports = Transaction;