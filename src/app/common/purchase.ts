export class OrderItemDto {
  constructor(
    public productId: number,
   public quantity: number,
   public  unitPrice: number
  ){}
 
}

export class OrderDto {
  constructor(
    public orderTrackingNum: number,
    public totalQuantity: number,
    public totalPrice: number,
    public orderStatus: string,
    public dateCreated: Date,
    public lastUpdated: Date,
  ){}
  
}

export class ShippingAddressDto {
  constructor(
   public houseNumber: number,
   public street: string,
   public city: string,
   public state: string,
   public zipcode: number,
   public country: string
  ){}
  
}

export class CustomerDto {
  constructor(
    public customerName: string,
    public email: string,
    public phoneNumber: string,
   public password: string
  ){}
  
}

export class PurchaseDto {
  constructor(

   public customerDto: CustomerDto,
  public ordersItemsDto: OrderItemDto[],
  public orderDto: OrderDto,
  public addressDto: ShippingAddressDto
  ){}
  
}
