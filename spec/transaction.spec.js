import Transaction from "../src/Transaction.js";

describe("Transaction tests", () => {
    describe('getTransactionObject', () => {     
        it("should return an object representation of Transaction data", () => {
            const transaction = new Transaction(new Date("11/12/2023"), 500, "credit", 1000);
            const expectedValue = {
                date: "12/11/2023",
                amount: 500,
                type: "credit",
                balance: 1000
            };

            expect(transaction.getTransactionObject()).toEqual(expectedValue);
        });

     });
});