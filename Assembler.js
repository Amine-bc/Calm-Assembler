import { Lexer } from './Lexer.js';
import {Errorcalm} from './Errorcalm.js'
import {SyntaxicAnalysis} from './SyntaxicAnalysis.js'
export const FuncInterface ={

    Label_To_Num : (labelname,linenumber)=>{
        var labelobj = false ;
        Assembler.Labellist.forEach(element => { 
            if(element.name === labelname){
                labelobj = element
            }
        });
    
        console.log(labelobj)
        if (labelobj == false)
        {
            //error
            Errorcalm.set_syntaxicError(new Errorcalm("Label not found",null,linenumber));
            return {type: 'ERROR', value: 'Label not found'};
        }else{
            //return the address
            return {type: 'NUMBER', value: labelobj.address} 
    }},
    


    confirmationfunction : (input) => {
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
        
    
    },


}


export class Assembler{

    static MAXNUM = 6000;
    static Labellist = []
    // List of strings to exclude
    static excludedStrings = ['RET', 'PUSHA', 'POPA', 'NEG', 'NOT', 'SHL', 'SHR', 'READ', 'WRITE', 'PUSH', 'POP', 'ROR', 'ROL', 'CALL', 'BE', 'BNE', 'BS', 'BI', 'BIE', 'BSE', 'BR', 'NAND', 'CMP', 'MOV', 'ADD', 'SUB', 'MUL', 'DIV', 'AND', 'OR', 'XOR', 'NOR', 'R1', 'R2', 'R3', 'R4', 'ACC', 'BR', 'IR', 'SR', 'R1R', 'R2R', 'R3R', 'ACCR', 'R1L', 'R2L', 'R3L', 'ACCL'];
                      

    constructor(input){
        let lexicalList = input.map((t,index)=> {return new Lexer(t,index).LexicalList} )
        if (Lexer.Errors.length > 0) {
            Errorcalm.printError();
        }else{
        

        this.input = lexicalList;
        //console.log(lexicalList)
        this.toAssemble = new SyntaxicAnalysis(this.input);
        let ret = FuncInterface.confirmationfunction(this.toAssemble.Syntaxiclist);
        if (!ret.status) {
            console.log("\nThere are errors in your code cannot assemble:\n");
            console.log(ret.errors);
        }}
    }

    assemble(input){
        //turn instruction object to 8 octet hexa represented as a string
        // input is one line of code
        for (let index = 0; index < input.length; index++) {
            const element = input[index];
            switch(element.type){
                case 'INST0':
                    switch(element.value){
                        case 'RET':
                            return '0035';
                        case 'PUSHA':
                            return '0021';
                        case 'POPA':
                            return '0023';
                    
                    }
                case 'INST1':
                    let oppcode = "";
                    let reg_mod = "" ;
                    let size = "";
                    let adr= "";
                    let operand="";
                    switch(element.value){
                        case 'NEG':
                            oppcode = '0100';
                            break;
                        case 'NOT':
                            oppcode = '0101';
                            break;
                        case 'SHL':
                            oppcode = '0110';
                            break;
                        case 'SHR':
                            oppcode = '0111';
                            break;
                        case 'READ':
                            oppcode = '1000';
                            break;
                        case 'WRITE':
                            oppcode = '1001';
                            break;
                        case 'PUSH':
                            oppcode = '1010';
                            break;
                        case 'POP':
                            oppcode = '1011';
                            break;
                        case 'ROR':
                            oppcode = '1100';
                            break;
                        case 'ROL':
                            oppcode = '1101';
                            break;
                        case 'CALL':
                            oppcode = '0011001';
                            break;
                        case 'BE':
                            oppcode = '0010010';
                            break;
                        case 'BNE':
                            oppcode = '0010011';
                            break;
                        case 'BS':
                            oppcode = '0010100';
                            break;
                        case 'BI':
                            oppcode = '0010101';
                            break;
                        case 'BIE':
                            oppcode = '0010110';
                            break;
                        case 'BSE':
                            oppcode = '001111';
                            break;
                        case 'BR':
                            oppcode = '0011000';
                            break;

                    }
                    switch(element){
                    //addressing modes
                    }
                    if (condition){
                        //size
                        // add operand
                    }
                    if (condition){
                    //address if availble on 16 bits <=> 4 octects
                    }


            }
        }

      }   
  }





var input = ["LABEL imo 1437","LABEL rani 4532", "NOT 16* + 88 ", "ROL imo","PUSHA"]

let output = new Assembler(input) ;






console.log("\nLabel list: \n",Assembler.Labellist)

//console.log("\nSyntaxic list: \n", output?.toAssemble?.Syntaxiclist ?? "Syntaxiclist is undefined");
console.log("\nSyntaxic list: \n", (output && output.toAssemble && output.toAssemble.Syntaxiclist) ? output.toAssemble.Syntaxiclist : "Syntaxiclist is undefined");







