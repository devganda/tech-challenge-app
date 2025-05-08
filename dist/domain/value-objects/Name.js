"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
class Name {
    constructor(value) {
        this.value = value;
        this.validate();
    }
    validate() {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(this.value)) {
            throw new Error('Invalid name format');
        }
        // Deixar sempre a primeira letra Maiuscula e o resto minusculo
        this.value.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    getValue() {
        return this.value;
    }
}
exports.Name = Name;
