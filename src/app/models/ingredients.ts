export class Ingredients {
    public code : number;
    public libelle : String;
    public categorie : String;
    public coutUnitaire : number;
    public unite : String;

    public constructor(code : number, libelle: String, categorie: String, coutUnitaire : number, unite : String){
        this.code = code;
        this.libelle = libelle;
        this.categorie = categorie;
        this.coutUnitaire = coutUnitaire;
        this.unite = unite;
    }
}
