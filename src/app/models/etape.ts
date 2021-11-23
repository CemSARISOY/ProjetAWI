import { Denrees } from "./denrees";

export class Etape {

    public titre : String;
    public denrees : Denrees;
    public description : String;
    public duree : number;

    public constructor(titre : String, denrees : Denrees, description : String, duree : number){
        this.titre = titre;
        this.denrees = denrees;
        this.description = description;
        this.duree = duree;
    }
}
