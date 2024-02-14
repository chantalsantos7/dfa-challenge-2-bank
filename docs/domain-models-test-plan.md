# Domain Models and Test Plan

As a customer I want my account data to be persistent across sessions, so I can accurately make transactions 

| Objects  | Properties                        | Messages | Outputs |
| -------- | --------------------------------- | -------- | ------- |
| Customer           | account@Account         |                             |         |
| Account            |                         | getAccountDetails()         |         |
| AccountFileHelpers | accountData             | saveAccountData() <br> loadAccountFromFile() |         |

## Tests

- Test that the customer can access their account
- Test that the customer/account data is persistent between sessions

---

As a customer, I want to be able to add money to my account, so I can keep my money safe.

| Objects | Properties     | Messages            | Outputs |
| ------- | -------------- | ------------------- | ------- |
| Account | balance@double | addBalance(@double) | @Void   |

## Tests

- The account balance should increase when money is added
- Total balance should be correct after adding money to an existing balance
- Balance should not be negative if a negative number is passed as input
- Balance shouldn't be increased if a non-number value is entered as input

---

As a customer, I want to be able to remove money from my account, so I can purchase something.

| Objects | Properties     | Messages                | Outputs |
| ------- | -------------- | ----------------------- | ------- |
| Account | balance@double | makeWithdrawal(@double) | @Void   |

## Tests

- Test that the account balance decreases when money is withdrawn
- Test that a supplied amount can't be removed if the balance isn't sufficient
- Balance shouldn't decrease if a non-number value is entered as an input

Additional Tests suggested by Copilot

- Test that negative amounts throw an error
- Test that withdrawal of zero does not decrease balance
- Test for withdrawal amount equal to balance

---

As a customer, I want to be warned if I do not have sufficient funds to withdraw an amount from my account, so I don't attempt to take out more money than I have.

As a customer, I want to be warned if I accidentally enter a negative number to the Add Balance prompt, so I don't make an invalid transaction.

| Objects | Properties | Messages              | Outputs |
| ------- | ---------- | --------------------- | ------- |
| Account |            | printMessage(@String) | @String |

## Tests

- Test that a message to the user appears in the console when their balance isn't sufficient for a withdrawal
- Test a message to the user appears in the console when they enter a negative number to add to their balance

---

As a customer, I want to see the details of an individual transaction when I print my account statement

| Objects     | Properties                      | Messages            | Outputs  |
| ----------- | ---------------------------------------------------------------------- | ------------------- | ------------ |
| Account     | transactions@Array[Transaction]                                        | createTransaction() <br> addTransaction() | @Transaction |
| Transaction | date@String <br> type@String <br> amount@float <br> totalBalance@float |  | |
|          |  | | |

---

Given that a client makes a deposit of 500.00 on 13-01-24 and a withdrawal of 200.00 on 16-01-24, when they print their bank statement they should see that reflected in the output like so

```ascii
date       || credit  || debit  || balance
14/01/2024 ||         || 200.00 || 300.00
13/01/2024 || 500.00  ||        || 500.00
```

| Objects     | Properties                      | Messages         | Outputs  |
| ----------- | ------------------------------- | ---------------- | -------- |
| Account     | transactions@Array[Transaction] | printStatement() | @String |
| Transaction | |  | |
|             |  | | |

## Tests

- Test that the correct output reflecting the account data has been printed out
