export class InsertTransactionEvent {
    index: string;
    amount: number;
    reason: string;
    constructor(index, amount, reason) {
        this.index = index;
        this.amount = amount;
        this.reason = reason;
    }
}