import { Etape } from "./etape";

export class FicheTechnique {

    public id : string;
    public intitule : string;
    public responsable : string;
    public nbCouvert : number;
    public progression : any[];
    public categorie : string;

    public constructor(intitule : string, responsable : string, nbCouvert : number, progression : any[], categorie : string, id? : string){
        this.intitule = intitule;
        this.responsable = responsable;
        this.nbCouvert = nbCouvert;
        this.progression = progression;
        this.categorie = categorie;
        if(id) this.id=id;
    }
}
