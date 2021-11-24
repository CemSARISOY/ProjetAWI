import { Optional } from "@angular/core";

export class Ingredients {
    public id : string;
    public CODE : number;
    public LIBELLE : String;
    public CATEGORIE : String;
    public PRIX_UNITAIRE : number;
    public UNITE : String;

    public constructor(code : number, libelle: String, categorie: String, prix_unitaire : number, unite : String,@Optional() id?: string){
        this.CODE = code;
        this.LIBELLE = libelle;
        this.CATEGORIE = categorie;
        this.PRIX_UNITAIRE = prix_unitaire;
        this.UNITE = unite;
        this.id = id
    }
}
