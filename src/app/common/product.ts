export class Product {

    constructor(

    public id: number,
    public name: string,
    public title: string,
    public description: string,
    public unitPrice: number,
    public imageUrl: string,
    public active: boolean,
    public units_stock: number,
    public date_created: Date ,
    public last_updated: Date
    ){
       
    }

    
}
