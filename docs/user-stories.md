# User Stories

Given that I am a client of this bank and have downloaded this application, when I start this console application I want to instantly access my account without entering a username and password.

As a customer, I want to be able to add money to my account, so I can keep my money safe.

As a customer, I want to be able to remove money from my account, so I can purchase something.

As a customer, I want to be warned if I do not have sufficient funds to withdraw an amount from my account, so I don't attempt to take out more money than I have.

Given that a client makes a deposit of 500.00 on 13-01-24, when they print their bank statement they should see that reflected in the output like so
```ascii
date       || credit  || debit  || balance
13/01/2024 || 500.00  ||        || 500.00
```


Given that a client makes a withdrawal of 500.00 on 13-01-24, when they print their bank statement they should see that reflected in the output like so
```ascii
date       || credit  || debit  || balance
13/01/2024 ||         || 500.00 || 200.00
```

