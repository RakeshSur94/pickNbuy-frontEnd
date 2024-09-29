export class Product {

    constructor(

    public id: number,
    public name: string,
    public title: string,
    public description: string,
    public unitPrice: number,
    public imageUrl: string,
    public active: boolean,
    public unitsInStock: number,
    public dateCreated: Date ,
    public lastUpdated: Date
    ){
        // Convert date strings to Date objects
        this.dateCreated = new Date(dateCreated);
        this.lastUpdated = new Date(lastUpdated);
    }

    
}
