import TransactionDetailsPrinter from "../src/TransactionDetailsPrinter.js";

describe("TransactionDetailsPrinter", () => {
    it("should call console.log once", () => {
        const logSpy = spyOn(console, `log`);
        const testTransaction = jasmine.createSpyObj("transaction", [
            'getDate',
            'getAmount',
            'getType',
            'getBalance'
        ]);
        testTransaction.getType.and.returnValue("credit");
        testTransaction.getDate.and.returnValue("23/01/2024");
        testTransaction.getBalance.and.returnValue(4534);
        testTransaction.getAmount.and.returnValue(354);

        TransactionDetailsPrinter.printTransactionDetails(testTransaction);
        expect(logSpy).toHaveBeenCalled();
    });
});