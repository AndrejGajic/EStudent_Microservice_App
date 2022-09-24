export class SetDebtEvent {
    index: string;
    price: number;
    constructor(index: string, price: number) {
        this.index = index;
        this.price = price;
    }
}