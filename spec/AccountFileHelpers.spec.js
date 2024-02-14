import fs from "fs";
import AccountFileHelpers from "../src/AccountFileHelpers.js";

describe("AccountFileHelpers\n", () => {

    describe("getAccountFromFile", () => {

        beforeEach(() => {
            spyOn(fs, "existsSync");
            spyOn(fs, "readFileSync");
        });

        it("should throw an error if the file doesn't exist", () => {
            fs.existsSync.and.returnValue(false);
            expect(() => {
                AccountFileHelpers.getAccountFromFile("none");
            }).toThrowError("No account file found");
        });
    });


    describe("saveAccountToFile", () => {

        it("confirms that the account info has been saved", () => {
            let account = jasmine.createSpyObj('Account', ['getAccountDetailsAsObject']);
            account.getAccountDetailsAsObject.and.returnValue(
                {
                    id: 1001,
                    name: "Test",
                    balance: 250,
                    transactions: [{
                        date: "01/01/2024",
                        amount: 50,
                        type: "credit",
                        balance: 250
                    }]
                }
            );

            const logSpy = spyOn(console, "info");
            AccountFileHelpers.saveAccountData(account);
            expect(logSpy).toHaveBeenCalledWith(`Account data successfully saved.`);
        });
    });

    // describe("Reading Account file tests\n", () => {

    // });
});