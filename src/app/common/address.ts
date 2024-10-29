import { Customer } from "./customer";
import { OrderItems } from "./orderItems";

export class ShippingAddress{
  constructor(

    public addressId: number,
    public houseNumber: number,
    public street: string,
    public city: string,
    public state: string,
    public zipcode: number,
    public country: string,
    public orders: OrderItems[],
    customer: Customer

  ){}
}