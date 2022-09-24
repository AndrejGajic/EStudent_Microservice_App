export class SetDebtEvent {
    index: string;
    price: number;
    constrcutor(index: string, price: number) {
        this.index = index;
        this.price = price;
    }
}