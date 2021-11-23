import { MatierePremiere } from "./matiere-premiere";

export class Denrees {
    public titre : String;
    public mp : MatierePremiere[];

    public constructor(titre : String, mp : MatierePremiere[]){
        this.titre = titre;
        this.mp = mp;
    }
}
