export class CreateOrderDto {
    readonly id: number;
    readonly userid: number;
    readonly productsids: number[];
    readonly date: Date;
}