import TransactionDetailsPrinter from "./TransactionDetailsPrinter.js";
import Transaction from "./Transaction.js";
import DateHelper from "./DateHelper.js";
class Account {
    
    static nextId = 0;
    #id;
    #name;
    #balance;
    #transactions;

    constructor(name, balance = 0) {
        this.#id = Account.nextId++;
        this.#name = name;
        this.#balance = balance;
        this.#transactions = [];
    }

    getId() {
        return this.#id;
    }

    getAccountName() {
        return this.#name;
    }

    getBalance() {
        return this.#balance;
    }

    //Transactions are always linked to an account's activity, so you cannot avoid coupling the Account and Transaction classes
    //To maintain single responsibility, the only function that directly interacts with the Transaction class 
    #createTransaction(date, amount, type) {
        return new Transaction(date,amount, type, this.#balance);
    }

    addBalance(amount, date = undefined) {
        if (Number.isNaN(parseFloat(amount))) return "Can't parse value";
        if (amount < 0) return "You're not allowed to enter a negative value";
        this.#balance += amount;
        if (date === undefined)
        {
            date = DateHelper.getCurrentDate();
        }
        this.addTransaction(this.#createTransaction(date, amount, "credit"));
        return this.#balance;
    }

    makeWithdrawal(amount, date = undefined) {
        if (Number.isNaN(parseFloat(amount))) return "Can't parse value";
        if (amount < 0) return "You're not allowed to enter a negative value";
        if (this.#balance === 0 || amount > this.#balance) return `Your balance is £${this.getBalance()} - it is insufficient for this withdrawal`;
        this.#balance -= amount;
        
        if (date === undefined)
        {
            date = DateHelper.getCurrentDate();
        }
        this.addTransaction(this.#createTransaction(date, amount, "debit"));
        return this.#balance;
    }

    addTransaction(transaction) {
        return this.#transactions.push(transaction);
    }

    getTransactions() {
        return this.#transactions;
    }

    printStatement() {
        console.log("\ndate\t\t|| credit\t|| debit\t|| balance\t||");
        this.#transactions.reverse();
        this.#transactions.forEach((transaction) => TransactionDetailsPrinter.printTransactionDetails(transaction));
    }

    getAccountDetailsAsObject()
    {
        return {
            id: this.#id,
            name: this.#name,
            balance: this.#balance,
            transactions: this.getTransactionsAsObjects()
        };
    }

    getTransactionsAsObjects() {
        let transactionObjects = [];
        this.#transactions.forEach((transaction) => transactionObjects.push(transaction.getTransactionObject()));
        return transactionObjects;
    }

} export default Account;