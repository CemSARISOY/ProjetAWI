import { Optional } from "@angular/core";

export class Ingredients {
    public id : string;
    public CODE : number;
    public LIBELLE : string;
    public CATEGORIE : string;
    public PRIX_UNITAIRE : number;
    public UNITE : string;

    public constructor(code : number, libelle: string, categorie: string, prix_unitaire : number, unite : string,@Optional() id?: string){
        this.CODE = code;
        this.LIBELLE = libelle;
        this.CATEGORIE = categorie;
        this.PRIX_UNITAIRE = prix_unitaire;
        this.UNITE = unite;
        this.id = id
    }
}
