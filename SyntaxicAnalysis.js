import { Lexer } from './Lexer.js';
import { Errorcalm } from './Errorcalm.js';
import { Assembler,FuncInterface } from "./Assembler.js";


export class SyntaxicAnalysis {
    Syntaxiclist = []
    
    constructor(input) { 

        let lexicalList = input;
        for(let i = 0; i < lexicalList.length; i++){
            // here operation with each line of code
            // we must check if it is a label or an instruction
            // if it is a label we have to check that the next element is a number and it has to be < from a number we fix
            
              let firstword = lexicalList[i][0]
              let firstwordtype = firstword.type
              
              
              switch (firstwordtype) {
                    
                  case 'LABEL':
                    const functLABEL = ()=> {
                        if (lexicalList[i].length == 3) {
                            if (lexicalList[i][2].type == 'NUMBER') {
                            if( lexicalList[i][2].value < Assembler.MAXNUM){
                                if(lexicalList[i][1].type == 'TEXT'){
                                    if(Lexer.isValidString(lexicalList[i][1].value)){
                                        //  filters for text standards and validity of the text
                                        // check if label already existing 
                                            var found = false ;
                                            var labelname = firstword.value ;
                                            Assembler.Labellist.forEach(element => { 
                                                if(element.name === labelname){
                                                    found = true
                                                }
                                            });
                                        if (!found) {    
                                        //this.Syntaxiclist.push(lexicalList[i]); 
                                        //stop pushing here because we don't need it
                                        Assembler.Labellist.push({ name: lexicalList[i][1].value, address: lexicalList[i][2].value, linedeclared:i })
                                    }else{
                                        this.Syntaxiclist.push(new Errorcalm("LABEL already declared",null,i))
                                    }
                                }else{ this.Syntaxiclist.push(new Errorcalm("LABEL name is not valid",null,i)) }
                                }else{
                                    this.Syntaxiclist.push(new Errorcalm("LABEL name not defined",null,i))
                              }
                            }else{
                                 this.Syntaxiclist.push(new Errorcalm("Number size is bigger then MAXNUM",null,i))
                            }}else{ 
                                 this.Syntaxiclist.push(new Errorcalm("LABEL must be a number",null,i))
                            }
                          }else{
                              this.Syntaxiclist.push(new Errorcalm("LABEL must have only two operands",null,i))
                            }
                      }
                      
                      functLABEL();
                      break;
                      
                      case 'INST0': 
                          // No params instructions: INST0 ::=    RET, PUSHA, POPA
                          // We must have no op after it 

                            const functINST0 = ()=> { 

                                if (lexicalList[i].length == 1) {
                                    this.Syntaxiclist.push(lexicalList[i]);
                                }else{
                                    this.Syntaxiclist.push(new Errorcalm("INST0 must have no operands",null,i))
                            }}
                        

                      functINST0();
                      break ;



                      case 'INST1':
                        // ONE params instructions: INST1 ::=  NEG, NOT, SHL, SHR, READ, WRITE, PUSH, POP, ROR, ROL, CALL, BE, BNE, BS, BI, BIE, BSE, BR
                        //|                                                                                         |
                        //|        Must have only one other param: it must be valid                                 |
                        //|        or one param and other special chars: they must be valid  also                   |
                        //|        That other special char is used for addressing modes mainly                      |
                        //|------------------------------------------------------------------------------------------
                        const functINST1 = ()=> {
                            var firstparam = lexicalList[i][1]
                            if (lexicalList[i][0].value == 'WRITE' || lexicalList[i][0].value == 'READ') {
                                //read or write from or to register only
                                // Labels 

                            }else{
                            // use it as function
                            // funcnum(lexicalList[i],i)
                            // add in the body firstparam definition
                            // var firstparam = lexicalList[i][1]

                            switch(firstparam.type){
                            case 'NUMBER' :
                                    //check addressing
                                    if (firstparam.value < Assembler.MAXNUM) {
                                    
                                    switch (lexicalList[i].length) {
                                        case 2:
                                            this.Syntaxiclist.push([{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:0 },lexicalList[i][1]]);
                                            
                                            break;
                                        case 3:
                                            // direct
                                            // correct here add the operand type and value then put the adr mode with the instruction
                                            if (lexicalList[i][2].value == '*') {
                                                this.Syntaxiclist.push([{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:1 },lexicalList[i][1]]);
                                                
                                            }else{
                                                this.Syntaxiclist.push(new Errorcalm("Wrong character",null,i))
                                            }
                                            
                                        break;

                                        case 4:
                                            // indirect
                                            if (lexicalList[i][2].value == '*' && lexicalList[i][3].value == '*') {
                                                this.Syntaxiclist.push([{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:2 },lexicalList[i][1]]);
                                            }else{
                                                this.Syntaxiclist.push(new Errorcalm("Wrong character",null,i))
                                            }
                                        
                                        break;
                                    
                                        default:
                                            this.Syntaxiclist.push(new Errorcalm("Wrong number of operands",null,i))
                                            break;
                                    }    }else{
                                        this.Syntaxiclist.push(new Errorcalm("Number size is bigger then MAXNUM",null,i))
                                    }                               
                                
                            break;

                            case 'REGISTER' :


                                
                                // define addressing mode
                                // or deplacement
                                //console.log("lexicalList[i][1].lenght ",lexicalList[i].length)
                                switch (lexicalList[i].length) {
                                    case 2:
                                        this.Syntaxiclist.push([{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:0 },lexicalList[i][1]]);
                                        
                                        break;
                                    case 3:
                                        // direct
                                        // correct here add the operand type and value then put the adr mode with the instruction
                                        if (lexicalList[i][2].value == '*') {
                                            this.Syntaxiclist.push([{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:1 },lexicalList[i][1]]);
                                            
                                        }else{
                                            this.Syntaxiclist.push(new Errorcalm("Wrong character",null,i))
                                        }
                                        
                                    break;

                                    case 4:
                                        // indirect
                                        if (lexicalList[i][2].value == '*' && lexicalList[i][3].value == '*') {
                                            this.Syntaxiclist.push([{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:2 },lexicalList[i][1]]);
                                        }else{
                                            this.Syntaxiclist.push(new Errorcalm("Wrong character",null,i))
                                        }
                                    
                                    break;

                                    case 5: 
                                        //deplacement 
                                        
                                       
                                        if (lexicalList[i][2].value === '*' && lexicalList[i][3].value === '+' ) {
                                            switch (lexicalList[i][4].type) 
                                        {
                                            case 'NUMBER':
                                            this.Syntaxiclist.push([{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:3 },lexicalList[i][1],lexicalList[i][4]]);
                                            break;
                                            case 'TEXT':
                                            this.Syntaxiclist.push([{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:3 },lexicalList[i][1],FuncInterface.Label_To_Num(lexicalList[i][4].value,i)]);
                                            break;
                                       
                                        }}
                                        break;
                                    default:
                                        this.Syntaxiclist.push(new Errorcalm("Wrong number of operands",null,i))
                                        break;
                                }    
                            
                            break;
                            case 'TEXT' :
                                    //+ ajouter opp avec labels,  I guess DONE
                                    // Do the needed operations after transformations and ADD TESTs it's not safe here !
                                    // add addressing modes direct and indirect for labels

                                    //check if it's present in label list
                                    
                                    switch (lexicalList[i].length) {
                                        case 2:
                                            this.Syntaxiclist.push([{type:lexicalList[i][0].type, value:lexicalList[i][0].value, adrmode:0 },{type:FuncInterface.Label_To_Num(firstparam.value,i).type, value:FuncInterface.Label_To_Num(firstparam.value,i).value}]);
                                            
                                            break;
                                        case 3:
                                            // direct
                                            if (lexicalList[i][2].value == '*') {
                                                this.Syntaxiclist.push([{type:lexicalList[i][0].type, value:lexicalList[i][0].value, adrmode:1 },{type:FuncInterface.Label_To_Num(firstparam.value,i).type, value:FuncInterface.Label_To_Num(firstparam.value,i).value}]);
                                                
                                            }else{
                                                this.Syntaxiclist.push(new Errorcalm("Wrong character",null,i))
                                            }
                                            
                                        break;
                                    
                                        case 4:
                                            // indirect
                                            if (lexicalList[i][2].value == '*' && lexicalList[i][3].value == '*') {
                                                this.Syntaxiclist.push([{type:lexicalList[i][0].type, value:lexicalList[i][0].value, adrmode:2 },{type:FuncInterface.Label_To_Num(firstparam.value,i).type, value:FuncInterface.Label_To_Num(firstparam.value,i).value}]);
                                            }else{
                                                this.Syntaxiclist.push(new Errorcalm("Wrong character",null,i))
                                            }
                                        
                                        break;
                                    
                                        default:
                                            this.Syntaxiclist.push(new Errorcalm("Wrong number of operands",null,i))
                                            break;
                                    }

                                    
                                    

                                    

                            }
                        
                        }
                                                

                            
                        }

                      functINST1();
                      break ;
                      
                      case 'INST2':
                        //check if there is a comma if not throw error which is comma missing
                        var nocomma = true ;
                        lexicalList[i].forEach(element => {
                            if (element.value == ',') {
                                nocomma = false ;
                            }});

                        if (nocomma)  
                        {
                            this.Syntaxiclist.push(new Errorcalm("Comma missing",null,i))
                        }
                        else{


                            switch (lexicalList[i][1].type) {
                                case 'REGISTER':
                                //check for addressing modes for the two operands treat each one as one operand 
                                //check for deplacement

                                break;
                                case 'TEXT':
                                //check if it's present in label list
                                //then it would be same treatment as a number
                                break;
                                case 'NUMBER':
                                    if (lexicalList[i][0].value == 'MOV') {
                                        this.Syntaxiclist.push(new Errorcalm("Number can't be first operand",null,i))
                                    }else{
                                        //check for addressing modes for the two operands treat each one as one operand 
                                        switch (lexicalList[i].length) {
                                            case 4:
                                                

                                    }
                        }
                    }}

                      break ;

                      default:
                        //error
                            break;
                          
             
                  
            }
            //console.log(this.Syntaxiclist)

           
          
        }
         
    }







    //estandards for each instruction 

    // for label we only have to check that the next element is a number and it has to be < from a number we fix 
    
    
    // No params instructions: INST0 ::= RET, PUSHA, POPA
    // We must have no op after it 
    


    // ONE params instructions: INST1 ::=  NEG, NOT, SHL, SHR, READ, WRITE, PUSH, POP, ROR, ROL, CALL, BE, BNE, BS, BI, BIE, BSE, BR
    //|                                                                                         |
    //|        Must have only one other param: it must be valid                                 |
    //|        or one param and other special chars: they must be valid  also                   |
    //|        That other special char is used for addressing modes mainly                      |
    //|------------------------------------------------------------------------------------------

    
    // TWO params instructions: NAND, CMP, MOV, ADD, SUB, MUL, DIV, AND, OR, XOR, NOR
    // they may be only two operands or two operands with special chars
    // check for the problem of first operand is a number
    // define addressing mode
    // some special errors for special instructions

    

    // Label instformat LABEL num check this num if it is valid

}


/*
const MAXNUM =6000 // max adress for label



var input = ["LABEL imo 145537", "MOV R1, 14", " ADD R1,R2**","PUSHA 55"]

//console.log(new Lexer(input[0]).LexicalList)

var output = new syntaxicAnalysis(["LABEL 145537"])

console.log(output.Syntaxiclist)*/

