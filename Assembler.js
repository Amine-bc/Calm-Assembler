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
        //console.log(labelobj)
        if (labelobj == false)
        {
            //error
            Errorcalm.set_syntaxicError(new Errorcalm("Label not found",null,linenumber));
            return {type: 'ERROR', value: null};
        }else{
            //return the address
            return {type: 'NUMBER', value: labelobj.address} 
    }},
    


    confirmationfunction : (input) => {
        var errormsg = []
        var err = false ;
        //console.log(input)
        // check Errorcalm.SyntaxicError first else do the thing you where doing
        if (Errorcalm.SyntaxicError.length > 0) {
            Errorcalm.printError();
            }
        else{
        for (let index = 0; index < input.length; index++) {
            if (input[index] instanceof Errorcalm) {
                errormsg.push({line: input[index].linenum, message:input[index].message})
                err = true
            }
        }}
        Errorcalm.addtoSyntaxicError(errormsg);
        return {errors: errormsg, status: !err};
    
    },


    addrmod : (listofpar,line) => {

        console.log(listofpar);
    // go through the list of instructions if listofpar[index].value is different then , then add this element.value to the list 1
    // go throught an if there is an element.type='TEXT' you use Labeltonum to make it a number
    listofpar.forEach((element,index) => {
        if (element.type === 'TEXT') {
            listofpar[index] = FuncInterface.Label_To_Num(element.value, line);
        }
    });
    
    console.log(listofpar);
    var list1 = [];
    var list2 = [];
    var lastindex ;
    
    var index = 0;
    
    while (index < listofpar.length && listofpar[index].value !== ',') {
        list1.push(listofpar[index]);
        lastindex = index;
        index++;   
    }
    
    for (let index = lastindex+2; index < listofpar.length; index++) {
        list2[index-lastindex-2] = listofpar[index];
    }
    //console.log("list1---------------------------------",list1);
    //console.log("list2---------------------------------",list2);

    return {list1,list2};
    
    }



 ,defadrmod : (listofparam,i) => {

    switch (listofparam.length) {
        case 1:
            //immediat
            return {type:listofparam[0].type,value:listofparam[0].value,mode:0} 
            
            break;
        
        case 2:
            //direct
            if (listofparam[1].value === '*' ) {
                return {type:listofparam[0].type,value:listofparam[0].value,mode:1} 
            }else{
                Errorcalm.SyntaxicError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                return {type:'ERROR',value:'Wrong parameters'}
            }
            break;
        
        case 3:
            //indirect
            if (listofparam[1].value === '*' && listofparam[2].value === '*' ) {
                return {type:listofparam[0].type,value:listofparam[0].value,mode:2} 
            }   else{
                Errorcalm.SyntaxicError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                return {type:'ERROR',value:'Wrong parameters'}

            }
            break;
        case 4:
            //dep
            if (listofparam[1].value === '*' && listofparam[2].value === '+' && listofparam[3].type === 'NUMBER'  ) {
                if (listofparam[3].value < Assembler.MAXNUM)
                {
                return {type:listofparam[0].type,value:listofparam[0].value,mode:3,depl:listofparam[3].value}
            }else{
                Errorcalm.SyntaxicError.push(new Errorcalm("Number size is bigger then MAXNUM",null,i));
                return {type:'ERROR',value:'Number size is bigger then MAXNUM'}
            
        }}else{
                Errorcalm.SyntaxicError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                return {type:'ERROR',value:'Wrong parameters'}
        }
            break;

        default:
            Errorcalm.SyntaxicError.push(new Errorcalm("Wrong parameters",null,i));
            return {type:'ERROR',value:'Wrong number or type of parameters'}
    }



    }
}


export class Assembler{

    static MAXNUM = 6000;
    static Labellist = []
    // List of strings to exclude
    static excludedStrings = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~','RET', 'PUSHA', 'POPA', 'NEG', 'NOT', 'SHL', 'SHR', 'READ', 'WRITE', 'PUSH', 'POP', 'ROR', 'ROL', 'CALL', 'BE', 'BNE', 'BS', 'BI', 'BIE', 'BSE', 'BR', 'NAND', 'CMP', 'MOV', 'ADD', 'SUB', 'MUL', 'DIV', 'AND', 'OR', 'XOR', 'NOR', 'R1', 'R2', 'R3', 'R4', 'ACC', 'BR', 'IR', 'SR', 'R1R', 'R2R', 'R3R', 'ACCR', 'R1L', 'R2L', 'R3L', 'ACCL'];
                      

    constructor(input){
        let lexicalList = input.map((t,index)=> {return new Lexer(t,index).LexicalList} )
        if (Errorcalm.LexicalError.length > 0) {
            Errorcalm.printError();
        }else{
        this.input = lexicalList;
        console.log("\nLexicalList:\n",lexicalList)
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





var input = ["LABEL le 1437","LABEL labe 4532", "NOT R1*+le", "ROL labe**","SUB labe*,R1*+10","MOV R1,R1+7","PUSHA"]

let output = new Assembler(input) ;






console.log("\nLabel list: \n",Assembler.Labellist)

//console.log("\nSyntaxic list: \n", output?.toAssemble?.Syntaxiclist ?? "Syntaxiclist is undefined");
console.log("\nSyntaxic list: \n", (output && output.toAssemble && output.toAssemble.Syntaxiclist) ? output.toAssemble.Syntaxiclist : "Syntaxiclist is undefined");


//console.log has to be deleted 




