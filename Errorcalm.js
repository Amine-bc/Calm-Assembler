export class Errorcalm{
    constructor(message,type,linenum){
        this.message = message;
        this.type = type;
        this.linenum = linenum+1;
    }

}   