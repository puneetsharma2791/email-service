export class Mail{
    public id:string;
    constructor(
        
    public from?:string,
    public to?:string[],
    public cc?:string[],
    public date?:Date,
    public subject?:string,
    public message?:string){
        this.id = Math.random()+""
    }
}
export class User{
    constructor(
    public firstName?:string,
    public lastName?:string,
    public userId?:string,
    public password?:string,
    public sent?:Mail[],
    public inbox?:Mail[]){}
}