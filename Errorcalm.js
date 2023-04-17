
export class Errorcalm{


    static LexicalError = [];
    static SyntaxicError = [];

    constructor(message,type,linenum){
        this.message = message;
        this.type = type;
        this.linenum = linenum+1;
    }

    static set_LexicalError(lexerror){
        Errorcalm.LexicalError = lexerror;
    }

    static set_syntaxicError(synerror){
        Errorcalm.SyntaxicError = synerror;
    }
    static printError(){

        console.log("\nThere are errors in your code cannot assemble:\n");
        Errorcalm.LexicalError.length == 0 ? console.log("Syntaxic Errors:\n",Errorcalm.SyntaxicError) : console.log("Lexical Errors \n",Errorcalm.LexicalError);




    }

}   



