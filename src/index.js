import Account from "./account.js";
import AccountFileHelpers from "./AccountFileHelpers.js";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

//basic requirements for the challenge

//An account can be made with a name and initial balance 
const accountTest = new Account("Test", 1000);

//Accounts can also be made with an initial balance of 0
const displayAccount = new Account("Demonstration");

//Users can add to their balance
displayAccount.addBalance(1000, new Date("January 10 2012"));
displayAccount.addBalance(2000, new Date("January 13 2012"));

//Users can make a withdrawal from their available balance
displayAccount.makeWithdrawal(500, new Date("January 14 2012"));

//This function will print a formatted display of the transaction history to the console
displayAccount.printStatement();

console.log("".padEnd(25,"--"));

//Users can be warned if they are inputting invalid data to a function
console.log(displayAccount.addBalance(-100));
console.log(displayAccount.makeWithdrawal(3000));

//Accounts can be saved as JSON files, and will be found in the /data folder
AccountFileHelpers.saveAccountData(displayAccount);