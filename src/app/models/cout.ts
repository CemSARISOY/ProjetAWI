export class Cout {
  public useCharge:boolean;
  public usePerc:boolean;
  public coutProdPerc:number;
  public coutProdFixe:number;
  public tauxPers:number;
  public tauxForf:number;

    public constructor(useCharge:boolean,usePerc:boolean,coutProdPerc:number,coutProdFixe:number,tauxPers:number,tauxForf:number){
        this.useCharge=useCharge
        this.usePerc=usePerc
        this.coutProdPerc=coutProdPerc
        this.coutProdFixe=coutProdFixe
        this.tauxPers=tauxPers
        this.tauxForf= tauxForf
    }
}
