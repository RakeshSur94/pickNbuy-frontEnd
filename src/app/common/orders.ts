import { OrderItems } from "./orderItems";

export class Order {
  constructor(

    public orderId: number,
    public orderTrackingNum: number,
    public totalQuantity: number,
    public totalPrice: number,
    public orderStatus: string,
    public dateCreated: Date,
    public lastUpdated: Date,
    public razorPayPaymentId: string,
    public ordersItems: OrderItems[]
  ){}
 
}