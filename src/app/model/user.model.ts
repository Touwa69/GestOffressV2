import { Role } from "./role.model";
import {Entreprise} from "./entreprise.model";

export class User{
    id! : string;
    name!:string ;
    password !: string ;
    email ! : string;
    lieunais! : string;
    datenais!: string;
    cin! : string;
    roles!: Role[];
    entreprises! :Entreprise[];
    creationDate? : Date;
    img? : File;
    }