"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor(value) {
        this.value = value;
        this.validate();
    }
    validate() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            throw new Error('Invalid email format');
        }
    }
    getValue() {
        return this.value;
    }
}
exports.Email = Email;
