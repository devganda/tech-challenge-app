"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Email_1 = require("@domain/value-objects/Email");
const Name_1 = require("@domain/value-objects/Name");
const CreatedAt_1 = require("@domain/value-objects/CreatedAt");
class User {
    constructor(props) {
        this.props = props;
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    static create(id, name, email) {
        return new User({
            id,
            name: new Name_1.Name(name),
            email: new Email_1.Email(email),
            createdAt: CreatedAt_1.CreatedAt.now()
        });
    }
    static update(id, name, email) {
        return new User({
            id,
            name: new Name_1.Name(name),
            email: new Email_1.Email(email),
            createdAt: CreatedAt_1.CreatedAt.now()
        });
    }
}
exports.User = User;
;
