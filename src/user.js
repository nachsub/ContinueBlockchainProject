class User {
  constructor(name, email, balance = 0) {
    this.name = name;
    this.email = email;
    this.balance = balance;
  }

  createUser(name, email, balance) {
    return new User(name, email, balance);
  }

  updateBalance(amount) {
    this.balance += amount;
  }

  getBalance() {
    return this.balance;
  }

  getInfo() {
    return {
      name: this.name,
      email: this.email,
      balance: this.balance
    };
  }
}
module.exports = User;