import DateHelper from "../src/DateHelper.js";

describe("DateHelper Tests", () => {
    describe("FormatDate", () => {
        it("should return a date formatted as dd/mm/yy", () => {
            let expectedValue = "02/12/2023";
            let inputDate = new Date(2023, 11, 2);
            expect(DateHelper.FormatDate(inputDate)).toEqual(expectedValue);
        });
    });

    describe("getCurrentDate", () => {
        it("should return a date object that matches the current date regardless of when the program is run", () => {
            let expectedValue = new Date();
            expect(DateHelper.getCurrentDate()).toEqual(expectedValue);
        })
    })
});