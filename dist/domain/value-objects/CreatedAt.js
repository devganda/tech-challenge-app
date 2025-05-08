"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedAt = void 0;
class CreatedAt {
    constructor(date) {
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date for CreatedAt.');
        }
        this.value = date;
        Object.freeze(this); //reforça a imutabilidade
    }
    static now() {
        return new CreatedAt(new Date());
    }
    static from(dateInput) {
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        return new CreatedAt(date);
    }
    getValue() {
        return this.value;
    }
    toISOString() {
        return this.value.toISOString();
    }
    equals(other) {
        return this.value.getTime() === other.value.getTime();
    }
}
exports.CreatedAt = CreatedAt;
