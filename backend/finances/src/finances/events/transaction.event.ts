export class TransactionEvent {
    index: string;
    amount: number;
    constructor(index: string, amount: number) {
        this.index = index;
        this.amount = amount;
    }
}