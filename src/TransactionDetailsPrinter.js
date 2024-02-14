export default class TransactionDetailsPrinter {
    //a helper function to control how a transaction is displayed to the user
    static printTransactionDetails(transaction) {
        switch (transaction.getType()) {
            case "credit":
                console.log(`${transaction.getDate()}\t||` + ` ${transaction.getAmount()}`.padEnd(14) + `|| `.padEnd(16) + `|| ${transaction.getBalance()}`.padEnd(16) + "||");
                break;
            case "debit":
                console.log(`${transaction.getDate()}\t||` + `|| `.padStart(17) + ` ${transaction.getAmount()}`.padEnd(13) + `|| ${transaction.getBalance()}`.padEnd(16) + "||");
                break;
        }

    }
}