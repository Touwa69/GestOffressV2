import { Role } from "./role.model";

export class User{
    id! : string;
    name!:string ;
    password !: string ;
    email ! : string;
    societe ! : string;
    roles!: Role[];
    creationDate? : Date;
    }