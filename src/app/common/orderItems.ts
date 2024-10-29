export class OrderItems {
  constructor(

    public orderItemId: number,
    public productId: number,
    public quantity: number,
    public imageUrl:string,
    public unitPrice: number
  ){

  }
}