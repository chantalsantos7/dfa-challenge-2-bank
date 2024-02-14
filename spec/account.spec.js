import TransactionDetailsPrinter from "../src/TransactionDetailsPrinter.js";
import DateHelper from "../src/DateHelper.js";
import Account from "../src/account.js";
describe("Account Tests\n", () => {

    describe('Function: addBalance', () => {
        let account;
        let negativeInputErrorMessage = "You're not allowed to enter a negative value";
        let invalidInputErrorMessage = "Can't parse value";

        describe(", with no initial balance, ", () => {
            let testAddBalance = 500;
            beforeEach(() => {
                account = new Account("Jane");
            })

            it("should have a balance of 0 when Account is created", () => {
                expect(account.getBalance()).toEqual(0);
            });

            it("should increase balance when money is added", () => {
                account.addBalance(testAddBalance);
                expect(account.getBalance()).toEqual(testAddBalance);
            });

            it("should add a Transaction object to the transactions list", () => {
                account.addBalance(testAddBalance);
                expect(account.getTransactions().length).toBe(1);
            });

            it("should not allow a non-number value to be passed as an argument", () => {
                expect(account.addBalance("erdf")).toEqual(invalidInputErrorMessage);
            });

            it("should call getCurrentDate(), if it hasn't been supplied with a date", () => {
                spyOn(DateHelper, 'getCurrentDate').and.callThrough();
                account.addBalance(500);
                expect(DateHelper.getCurrentDate).toHaveBeenCalled();

            });

            it("should use a supplied date to create a transaction", () => {
                let date = new Date("March 11 2023");
                spyOn(DateHelper, 'FormatDate').and.callThrough();
                account.addBalance(500, date);
                expect(DateHelper.FormatDate).toHaveBeenCalled();
            })

        });

        describe("Tests with an initial balance", () => {
            let testAddBalance, initialBalance;
            beforeEach(() => {
                testAddBalance = 500.00;
                initialBalance = 1500.00;
                account = new Account("Jane", initialBalance);

            });

            it("should show correct total balance when adding to an initial balance", () => {
                account.addBalance(testAddBalance);
                expect(account.getBalance()).toEqual(testAddBalance + initialBalance);
            });

            it("should return an error message if negative value is passed as an argument", () => {
                expect(account.addBalance(-1)).toEqual(negativeInputErrorMessage);
            });
        });
    });

    describe('Function: makeWithdrawal\n', () => {
        let account, initialBalance, testRemoveBalance;
        let negativeInputErrorMessage = "You're not allowed to enter a negative value";
        let invalidInputErrorMessage = "Can't parse value";
        let insufficientBalanceMessage;

        beforeEach(() => {
            testRemoveBalance = 100;
            initialBalance = 1500;
            account = new Account("Jane", initialBalance);
        });

        it("should decrease balance when a withdrawal is made", () => {
            account.makeWithdrawal(testRemoveBalance);
            expect(account.getBalance()).toEqual(initialBalance - testRemoveBalance);
        });

        it("should add a transaction object to the transactions list", () => {
            spyOn(account, 'addTransaction');
            account.makeWithdrawal(testRemoveBalance);
            expect(account.addTransaction).toHaveBeenCalled();
        });

        it("should not decrease balance if sufficient amount is not already in balance", () => {
            insufficientBalanceMessage = `Your balance is £${account.getBalance()} - it is insufficient for this withdrawal`;
            expect(account.makeWithdrawal(2000)).toEqual(insufficientBalanceMessage);
        });

        it("should return an error message if a non-numeric value is entered as input", () => {
            expect(account.makeWithdrawal("fiifd")).toEqual(invalidInputErrorMessage);
        });

        it("should return an error message if a negative value is input", () => {
            expect(account.makeWithdrawal(-1)).toEqual(negativeInputErrorMessage);
        });

        it("should allow a withdrawal that is equal to the whole balance", () => {
            account.makeWithdrawal(initialBalance);
            expect(account.getBalance()).toBe(0);
        });

        it("should not allow withdrawal if balance is 0", () => {
            account.makeWithdrawal(initialBalance);
            insufficientBalanceMessage = `Your balance is £${account.getBalance()} - it is insufficient for this withdrawal`;
            expect(account.makeWithdrawal(1)).toEqual(insufficientBalanceMessage);
        });

        it("should call getCurrentDate(), if it hasn't been supplied with a date", () => {
            spyOn(DateHelper, 'getCurrentDate').and.callThrough();
            account.makeWithdrawal(testRemoveBalance);
            expect(DateHelper.getCurrentDate).toHaveBeenCalled();

        });

        it("should use a supplied date for the transaction", () => {
            let date = new Date("March 11 2023");
            spyOn(DateHelper, 'FormatDate').and.callThrough();
            account.makeWithdrawal(testRemoveBalance, date);
            expect(DateHelper.FormatDate).toHaveBeenCalled();
        })
    });

    describe('Function: printStatement', () => {
        it("should call PrintTransactionDetails for each transaction in the account's history", () => {
            let account = new Account("test");
            account.addBalance(3000);
            account.makeWithdrawal(150);
            account.addBalance(200);
            const transactionDetailsPrinterSpy = spyOn(TransactionDetailsPrinter, 'printTransactionDetails');
            account.printStatement();
            expect(transactionDetailsPrinterSpy).toHaveBeenCalledTimes(3);
        })
    });

    describe('Function: getAccountDetailsAsObject', () => {
        it('should return an object representation of the account details, including transactions', () => {
            let accountTest = new Account("Test", 800);
            const expectedValue = {
                id: accountTest.getId(),
                name: "Test",
                balance: 1000,
                transactions: [{
                    date: "11/04/2023", 
                    amount: 200,
                    type: 'credit',
                    balance: 1000}]
            };

            accountTest.addBalance(200, new Date("04/11/2023"));
            expect(accountTest.getAccountDetailsAsObject()).toEqual(expectedValue);
        });
    });
});