import { Lexer } from './Lexer.js';
import {Errorcalm} from './Errorcalm.js'
import {SyntaxicAnalysis} from './SyntaxicAnalysis.js'

export class Assembler{

    static MAXNUM = 6000;
    static Labellist = []
    // List of strings to exclude
    static excludedStrings = ['RET', 'PUSHA', 'POPA', 'NEG', 'NOT', 'SHL', 'SHR', 'READ', 'WRITE', 'PUSH', 'POP', 'ROR', 'ROL', 'CALL', 'BE', 'BNE', 'BS', 'BI', 'BIE', 'BSE', 'BR', 'NAND', 'CMP', 'MOV', 'ADD', 'SUB', 'MUL', 'DIV', 'AND', 'OR', 'XOR', 'NOR', 'R1', 'R2', 'R3', 'R4', 'ACC', 'BR', 'IR', 'SR', 'R1R', 'R2R', 'R3R', 'ACCR', 'R1L', 'R2L', 'R3L', 'ACCL'];
                      


    constructor(input){
        this.input = input;
        this.toAssemble = new SyntaxicAnalysis(this.input);
        let ret = confirmationfunction(this.toAssemble.Syntaxiclist);
        if (ret.status==false) {
            console.log("\nThere are errors in your code cannot assemble\n");
            console.log(ret.errors);
        }

    function assemble(input){
        //turn instruction object to 8 octet hexa represented as a string
        // input is one line of code

        
        

    }

            
    }
}


const confirmationfunction = (input) => {
    var errormsg = []
    var err = false ;
    console.log(input)
    for (let index = 0; index < input.length; index++) {
        if (input[index] instanceof Errorcalm) {
            errormsg.push({line: input[index].linenum, message:input[index].message})
            err = true
        }
    }
    return {errors: errormsg, status: !err}
    

}

var input = ["LABEL imo 1437","LABEL rani 4532", "NOT 16* + 88 ", "ROL 4","PUSHA"]

let output = new Assembler(input)






console.log("\nLabel list: \n",Assembler.Labellist)

console.log("\nSyntaxic list: \n",output.toAssemble.Syntaxiclist)







