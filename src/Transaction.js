import DateHelper from "./DateHelper.js";
export default class Transaction {
    #date;
    #amount;
    #type;
    #balance;

    constructor(date, amount, type, balance) {
        this.#date = DateHelper.FormatDate(date);
        this.#amount = amount;
        this.#type = type;
        this.#balance = balance;
    }

    getDate() {
        return this.#date;
    }

    getAmount() {
        return this.#amount;
    }

    getType() {
        return this.#type;
    }

    getBalance() {
        return this.#balance;
    }

    //used for saving Transaction data to a file (as part of an Account object)
    getTransactionObject() {
        return {
            date: this.#date,
            amount: this.#amount,
            type: this.#type,
            balance: this.#balance
        };
    }

   
}