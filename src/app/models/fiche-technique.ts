import { Etape } from "./etape";

export class FicheTechnique {

    public intitule : String;
    public responsable : String;
    public nbCouvert : number;
    public progression : (FicheTechnique | Etape)[];
    public categorie : String;

    public constructor(intitule : String, responsable : String, nbCouvert : number, progression : (FicheTechnique | Etape)[], categorie : String){
        this.intitule = intitule;
        this.responsable = responsable;
        this.nbCouvert = nbCouvert;
        this.progression = progression;
        this.categorie = categorie;
    }
}
