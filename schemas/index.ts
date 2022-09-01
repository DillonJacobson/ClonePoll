import { Schema } from "./base";

export class AnswerSchema extends Schema{
    constructor(){
        super("Answer")
    }
}

export class UserSchema extends Schema {
    constructor() {
        super("User");
    }
}

export class PollSchema extends Schema {
    constructor() {
        super("Poll");
    }
}