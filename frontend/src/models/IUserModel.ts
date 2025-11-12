export interface IUserModel {
    code:    number;
    status:  boolean;
    message: string;
    data:    Data;
}

export interface Data {
    _id:   string;
    name:  string;
    email: string;
    roles: string[];
    date:  Date;
    __v:   number;
    jwt:   string;
}
