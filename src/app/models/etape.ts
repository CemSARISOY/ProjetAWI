
export class Etape {

    public titre : String;
    public titreMp : String;
    public mp : any[];
    public description : String;
    public duree : number;

    public constructor(titre : String, titreMp : String, description : String, duree : number, mp : any[]){
        this.titre = titre;
        this.titreMp = titreMp;
        this.description = description;
        this.duree = duree;
        this.mp = mp;
    }
}
