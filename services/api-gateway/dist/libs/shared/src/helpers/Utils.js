"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const client_1 = require("@prisma/client");
class Utils {
    static exclude(user, ...keys) {
        for (const key of keys) {
            delete user[key];
        }
        return user;
    }
    static prismaExclude(type, omit) {
        const result = {};
        for (const key in client_1.Prisma[`${type}ScalarFieldEnum`]) {
            if (!omit.includes(key)) {
                result[key] = true;
            }
        }
        return result;
    }
    static generateRandomCode(length, uppercase = true, lowercase = true, numerical = true) {
        let result = '';
        const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
        const upperCaseAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numericalLetters = '0123456789';
        let characters = '';
        if (uppercase) {
            characters += upperCaseAlphabets;
        }
        if (lowercase) {
            characters += lowerCaseAlphabets;
        }
        if (numerical) {
            characters += numericalLetters;
        }
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static randomAlpha() {
        const string = Math.random().toString(36).substring(2, 15);
        return String(string);
    }
    static randomNumber() {
        const number = Math.random().toString().substring(2, 15);
        return Number(number);
    }
    static otpCode() {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        return randomNumber;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map