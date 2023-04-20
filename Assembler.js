import { Lexer } from './Lexer.js';
import {Errorcalm} from './Errorcalm.js'
import {SyntaxicAnalysis} from './SyntaxicAnalysis.js'
export const FuncInterface ={


    binaryToHexoneByte : (decimalString)=>{
        // Convert decimal to hexadecimal string
        let hexString = parseInt(decimalString, 2).toString(16);
        
        // Pad the hexadecimal string with leading zeros to 4 bytes (8 characters)
        while (hexString.length < 2) {
          hexString = '0' + hexString;
        }
        
        // Return the padded hexadecimal string
        return hexString;
      },

    decimalToHex2Bytes : (decimalString)=>{
        // Convert decimal to hexadecimal string
        let hexString = parseInt(decimalString, 10).toString(16);
        
        // Pad the hexadecimal string with leading zeros to 4 bytes (8 characters)
        while (hexString.length < 4) {
          hexString = '0' + hexString;
        }
        
        // Return the padded hexadecimal string
        return hexString;
      },

      binaryToHex2Bytes: (binaryString)=>{
        // Convert decimal to hexadecimal string
        let hexString = parseInt(binaryString, 2).toString(16);
        
        // Pad the hexadecimal string with leading zeros to 4 bytes (8 characters)
        while (hexString.length < 4) {
          hexString = '0' + hexString;
        }
        
        // Return the padded hexadecimal string
        return hexString;
      },

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
    
    //console.log(listofpar);
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
    var sizeofpar;
    if (listofparam[0].value > 255 || Assembler.reg1.includes(listofparam[0].value))
        {
            sizeofpar='1'
        }else{
            sizeofpar='0'
        }
    switch (listofparam.length) {
        
        case 1:
            //immediat
            //set the size used---------------------------------------------------------------------------!!!!!!!
            return {type:listofparam[0].type,value:listofparam[0].value,adrmode:0,size:sizeofpar} 

            break;
        
        case 2:
            //direct
            if (listofparam[1].value === '*' ) {
                return {type:listofparam[0].type,value:listofparam[0].value,adrmode:1,size:sizeofpar} 
            }else{
                Errorcalm.SyntaxicError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                return {type:'ERROR',value:'Wrong parameters'}
            }
            break;
        
        case 3:
            //indirect
            if (listofparam[1].value === '*' && listofparam[2].value === '*' ) {
                return {type:listofparam[0].type,value:listofparam[0].value,adrmode:2,size:sizeofpar} 
            }   else{
                Errorcalm.SyntaxicError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                return {type:'ERROR',value:'Wrong parameters'}
            }
            break;
        case 4:
            //dep
            
                    if (listofparam[1].value === '*' && listofparam[2].value === '+' ) {

                        switch (listofparam[3].type) {
                            case 'NUMBER':
                                if (listofparam[3].value < Assembler.MAXNUM)
                                {
                                return {type:listofparam[0].type,value:listofparam[0].value,mode:3,depl:listofparam[3].value,size:sizeofpar}
                                }else{
                                Errorcalm.SyntaxicError.push(new Errorcalm("Number size is bigger then MAXNUM",null,i));
                                return {type:'ERROR',value:'Number size is bigger then MAXNUM'}

                                }
                                break;
                            case 'REGISTER':
                                if (listofparam[3].value === 'BR' && listofparam[0].value !=='BR')
                                {
                                        return {type:listofparam[0].type,value:listofparam[0].value,adrmode:5,size:sizeofpar}
                                }else{
                                    if (listofparam[3].value === 'IR' && listofparam[0].value !=='IR')
                                    {
                                        return {type:listofparam[0].type,value:listofparam[0].value,adrmode:4,size:sizeofpar}
                                    }else{
                                        Errorcalm.SyntaxicError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                                        return {type:'ERROR',value:'Wrong number or type of parameters'}
                                    }

                                }
                                
                        }          
                    
                    }else{
                        Errorcalm.SyntaxicError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                        return {type:'ERROR',value:'Wrong number or type of parameters'}              
                    }
                        
                break;
            
            
    
            break;
        
            case 6:
                // based indexed
                if ( listofparam[0].type ==='REGISTER' && listofparam[0].value !=='IR' && listofparam[0].value !=='BR' && listofparam[1].value === '*' && listofparam[2].value === '+' && listofparam[3].value === 'BR' && listofparam[4].value === '+' && listofparam[5].value === 'IR') {
                    return {type:listofparam[0].type,value:listofparam[0].value,adrmode:6,size:sizeofpar}
                }else{                
                    if ( listofparam[0].type ==='REGISTER' && listofparam[0].value !=='IR' && listofparam[0].value !=='BR' && listofparam[1].value === '*' && listofparam[2].value === '+' && listofparam[3].value === 'IR' && listofparam[4].value === '+' && listofparam[5].value === 'BR' ) {
                        return {type:listofparam[0].type,value:listofparam[0].value,adrmode:6,size:sizeofpar}
                }else{
                    Errorcalm.SyntaxicError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                }
            }
            break;

        default:
            Errorcalm.SyntaxicError.push(new Errorcalm("Wrong parameters",null,i));
            return {type:'ERROR',value:'Wrong number or type of parameters'}
    }



    }
}


export class Assembler{

    static MAXNUM = 65535;
    static Labellist = []
    // List of strings to exclude


    static reg1=['R1', 'R2', 'R3', 'R4', 'ACC', 'BR', 'IR', 'SR',]
    static reg2=['R1R', 'R2R', 'R3R', 'ACCR', 'R1L', 'R2L', 'R3L', 'ACCL']

    static excludedStrings = ['!', '"','\,', '#', '$', '%', '&', "'", '(', ')', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~','RET', 'PUSHA', 'POPA', 'NEG', 'NOT', 'SHL', 'SHR', 'READ', 'WRITE', 'PUSH', 'POP', 'ROR', 'ROL', 'CALL', 'BE', 'BNE', 'BS', 'BI', 'BIE', 'BSE', 'BR', 'NAND', 'CMP', 'MOV', 'ADD', 'SUB', 'MUL', 'DIV', 'AND', 'OR', 'XOR', 'NOR', 'R1', 'R2', 'R3', 'R4', 'ACC', 'BR', 'IR', 'SR', 'R1R', 'R2R', 'R3R', 'ACCR', 'R1L', 'R2L', 'R3L', 'ACCL'];
                      

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

    static assemble(input){
        //turn instruction object to 8 octet hexa represented as a string
        // input is one line of code
        var index = 0; 
            const element = input[index];
            switch(element.type){

                case 'INST2':
                    var opcode ;
                    var size = element.size ;
                    var ind ;
                    var regmod1 ;
                    var regmod2 ;
                    var op1;
                    var op2;
                    var dep1;
                    var dep2;


                    

                    switch(element.value){
                        case 'ADD':
                            opcode = FuncInterface.decimalToHex2Bytes(`0${size}`);
                            break;
                        case 'SUB':
                            opcode = FuncInterface.decimalToHex2Bytes(`1${size}`);
                            break;
                        case 'MUL':
                            opcode = FuncInterface.decimalToHex2Bytes(`10${size}`);
                            break;
                        case 'DIV':
                            opcode = FuncInterface.decimalToHex2Bytes(`11${size}`);
                            break;
                        case 'AND':
                            opcode = FuncInterface.decimalToHex2Bytes(`100${size}`);
                            break;
                        case 'OR':
                            opcode = FuncInterface.decimalToHex2Bytes(`101${size}`);
                            break;
                        case 'XOR':
                            opcode = FuncInterface.decimalToHex2Bytes(`110${size}`);
                            break;
                        case 'NOR':
                            opcode = FuncInterface.decimalToHex2Bytes(`111${size}`);
                            break;
                        case 'NAND':
                            opcode = FuncInterface.decimalToHex2Bytes(`1000${size}`);
                            break;
                        case 'CMP':
                            opcode = FuncInterface.decimalToHex2Bytes(`1001${size}`);
                            break;
                        case 'MOV':
                            opcode = FuncInterface.decimalToHex2Bytes(`1100${size}`);
                            break;
                        default:
                            opcode = 'error';
                            break;
                    }

                    switch(input[1].adrmode){
                        case 0:






                    }









                    break;
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
                    if (['NEG', 'NOT', 'SHL', 'SHR', 'READ', 'WRITE', 'PUSH', 'POP', 'ROR', 'ROL'].includes(element.value)) {
                        var reg ;
                        var size  ;
                        var oppcode;
                        //console.log(element);
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
                            default:
                                break;
                        }

                        if (element.adrmode === 0 && input[1].type === 'REGISTER') {
                            switch(input[1].value){
                                case 'R1':
                                    reg = '000';
                                    size = '1';
                                    break;
                                case 'R2':
                                    reg = '001';
                                    size = '1';
                                    break;
                                case 'R3':
                                    reg = '010';
                                    size = '1';
                                    break;
                                case 'R4':
                                    reg = '011';
                                    size = '1';
                                    break;
                                case 'ACC':
                                    reg = '100';
                                    size = '1';
                                    break;
                                case 'BR':
                                    reg = '101';
                                    size = '1';
                                    break;
                                case 'IR':
                                    reg = '110';
                                    size = '1';
                                    break;
                                case 'SR':
                                    reg = '111';
                                    size = '1';
                                    break;
                                case 'R1R':
                                    reg = '000';
                                    size = '0';
                                    break;
                                case 'R2R':
                                    reg = '001';
                                    size = '0';
                                    break;
                                case 'R3R':
                                    reg = '010';
                                    size = '0';
                                    break;
                                case 'ACCR':
                                    reg = '011';
                                    size = '0';
                                    break;
                                case 'R1L':
                                    reg = '100';
                                    size = '0';
                                    break;
                                case 'R2L':
                                    reg = '101';
                                    size = '0';
                                    break;
                                case 'R3L':
                                    reg = '110';
                                    size = '0';
                                    break;
                                case 'ACCL':
                                    reg = '111';
                                    size = '0';
                                    break;
                                
                                default:
                                    break;
                            }
                            
                            let instcode=oppcode+reg+size;
                            return FuncInterface.binaryToHexoneByte(instcode) ;
                        }


                    }else{
                    var oppcode = "";
                    var adr= FuncInterface.decimalToHex2Bytes(input[1].value);
                    switch(element.value){
                        case 'CALL':
                            oppcode = '33';
                            break;
                        case 'BE':
                            oppcode = '25';
                            break;
                        case 'BNE':
                            oppcode = '27';
                            break;
                        case 'BS':
                            oppcode = '29';
                            break;
                        case 'BI':
                            oppcode = '2B';
                            break;
                        case 'BIE':
                            oppcode = '2D';
                            break;
                        case 'BSE':
                            oppcode = '2F';
                            break;
                        case 'BR':
                            oppcode = '31';
                            break;

                        default:
                            break;
                    }
                    let instcode=oppcode+adr;
                    return instcode;
                    /*
                    switch(element.adrmode){
                        case 0:
                            reg_mod = '000';
                            break;
                        case 1:
                            reg_mod = '001';
                            break;
                        case 2:
                            reg_mod = '010';
                            break;
                        case 3:
                            if (input[4].value<=255) {
                                reg_mod = '110';
                            }else{
                                reg_mod = '111';

                            }

                        //or
                        break;

                        case 4:
                        //ir
                        reg_mod = '100';
                        break;
                
                        case 5:
                            //br
                            reg_mod = '011';
                            break;
                        case 6:
                            //ir + br
                            reg_mod = '101';
                            break;
                            //addressing modes
                    }
                    
                    //size
                    if ( input[1].value < 255 ){
                        //size 
                        size = '0';
                        // add operand
                    }else{
                        
                        if (input[1].value < 65535){
                            //size 
                            size = '1';
                        
                            
                        }else{
                            if (input[1].type==='REGISTER' ){
                                //size 
                                ind = '0'
                                if ([ 'R1', 'R2', 'R3', 'R4', 'ACC', 'BR', 'IR', 'SR'].includes(input[1].value))
                                {
                                    size = '1';
                                }else{
                                    if (['R1R', 'R2R', 'R3R', 'ACCR', 'R1L', 'R2L', 'R3L', 'ACCL'].includes(input[1].value)){
                                        size = '0';
                                    }else{
                                        size = 'error';
                                    }
                                }
                                     
                            }else{
                                size = 'error';
                            }    
                                
                        }
                    }
                        */
                }

            }
        

      }   
  }





var input = ["LABEL le 1437","LABEL labe 4532", "NOT R1", "CALL labe","SUB labe*,R1*+10","MOV R1*,R1",'ADD R1*+IR,IR',"PUSHA"]

let output = new Assembler(input) ;






console.log("\nLabel list: \n",Assembler.Labellist)

//console.log("\nSyntaxic list: \n", output?.toAssemble?.Syntaxiclist ?? "Syntaxiclist is undefined");
console.log("\nSyntaxic list: \n", (output && output.toAssemble && output.toAssemble.Syntaxiclist) ? output.toAssemble.Syntaxiclist : "Syntaxiclist is undefined");


//console.log has to be deleted 


console.log("code:",
Assembler.assemble( [
    { type: 'INST1', value: 'BI', adrmode: 0 },
    { type: 'NUMBER', value: '22' }
  ])
)
