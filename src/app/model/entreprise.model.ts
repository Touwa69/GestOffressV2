import { User } from "./user.model";

export class Entreprise {
    id!: number;
    nom!: string;
    adresse!: string;
    secteuractivite! : string;
    Matricule! :string;
    ville!: string;
    users!: User[];
}