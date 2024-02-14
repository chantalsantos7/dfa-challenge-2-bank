import * as fs from 'node:fs';

import Account from "./account.js";
export default class AccountFileHelpers {

    static defaultAccountData = [new Account("Indigo Blue", 3400)];

    static saveAccountData(account) {
        try {
            let accountToStore = this.#createAccountToStore(account);
            this.#writeAccountToFile(accountToStore.id, JSON.stringify(accountToStore));
            console.info(`Account data successfully saved.`);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    static getAccountFromFile(accountId) {

        const accountFilePath = `./data/Account${accountId ? accountId : "X"}.json`;
        if (!fs.existsSync(accountFilePath)) throw new Error("No account file found");
    }

    static #writeAccountToFile(accountId, accountJSON) {
        const path = `./data`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        fs.writeFileSync(`./data/account${accountId}.json`, accountJSON);
    }

    static #createAccountToStore(account) {
        
        let accountToStore = account.getAccountDetailsAsObject();
        return accountToStore;
    }

}