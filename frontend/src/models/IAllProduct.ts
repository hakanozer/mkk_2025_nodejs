export interface IAllProduct {
    code:    number;
    status:  boolean;
    message: string;
    data:    Data;
}

export interface Data {
    products: Product[];
    total:    number;
    page:     number;
    pages:    number;
}

export interface Product {
    _id:         string;
    name:        string;
    description: string;
    price:       number;
    inStock:     boolean;
    categories:  string[];
    authorId:    string;
    dateAdded:   Date;
    __v:         number;
}
