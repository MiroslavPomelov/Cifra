export class CreateBasketDto {
    readonly id: number;
    readonly userId: number;
    readonly name: string;
    readonly price: number;
    readonly productsIds: number[];
    readonly description: string;
}