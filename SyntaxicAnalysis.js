import { Lexer } from './Lexer.js';
import { Errorcalm } from './Errorcalm.js';
import { Assembler } from './Assembler.js';


export class SyntaxicAnalysis {
    Syntaxiclist = []
    constructor(input) { 
        let lexicalList = input.map((t)=> {return new Lexer(t).LexicalList} )
        //console.log(lexicalList)
        
        for(let i = 0; i < lexicalList.length; i++){
            // here operation with each line of code
            // we must check if it is a label or an instruction
            // if it is a label we have to check that the next element is a number and it has to be < from a number we fix
              let firstword = lexicalList[i][0]
              let firstwordtype = firstword.type
              switch (firstwordtype) {
                  case 'LABEL':
                    function isValidString(str) {
                        // Check if the string contains any special characters
                        if (/[^a-zA-Z0-9_]/.test(str)) {
                          return false;
                        }
                        
                        // Check if the string begins with a number
                        if (/^\d/.test(str)) {
                          return false;
                        }
                        
                        // Check if the string is in the excluded list
                        if (Assembler.excludedStrings.includes(str)) {
                          return false;
                        }
                        
                        // If none of the above conditions are met, the string is valid
                        return true;
                      }

                    const functLABEL = ()=> {
                        if (lexicalList[i].length == 3) {
                            if (lexicalList[i][2].type == 'NUMBER') {
                            if( lexicalList[i][2].value < Assembler.MAXNUM){
                                if(lexicalList[i][1].type == 'TEXT'){
                                    if(isValidString(lexicalList[i][1].value)){
                                    this.Syntaxiclist.push(lexicalList[i]);
                                    Assembler.Labellist.push({ name: lexicalList[i][1].value, address: lexicalList[i][2].value })
                                    // other filters for text standards
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

                            }else{
                            switch(firstparam.type){
                            case 'NUMBER' :
                                if (lexicalList[i].length == 2) {
                                    if (firstparam.value < Assembler.MAXNUM) {
                                        this.Syntaxiclist.push(lexicalList[i]);
                                    }else{
                                        this.Syntaxiclist.push(new Errorcalm("Number size is bigger then MAXNUM",null,i))
                                    }
                                    
                                }else{
                                    if (lexicalList[i].length == 5) {
                                        if (firstparam.value < Assembler.MAXNUM) {
                                            console.log(lexicalList[i][2])
                                            if (lexicalList[i][2].type === 'SPECIAL CHARACTER' && lexicalList[i][2].value === '*' && lexicalList[i][3].value === '+') {                                                {
                                                if (lexicalList[i][4].type == 'NUMBER') {
                                                    if (lexicalList[i][4].value < Assembler.MAXNUM) {
                                                        this.Syntaxiclist.push(lexicalList[i]);
                                                    }else{
                                                        this.Syntaxiclist.push(new Errorcalm("Number size is bigger then MAXNUM",null,i))
                                                    }
                                                }else{
                                                    this.Syntaxiclist.push(new Errorcalm("Third operand must be a number",null,i))
                                                }
                                            }}else{
                                                this.Syntaxiclist.push(new Errorcalm("Second operand must be a special char +",null,i))
                                            }
                                        }else{
                                            this.Syntaxiclist.push(new Errorcalm("Number size is bigger then MAXNUM",null,i))
                                    }
                                    //deplacement

                                }else{
                                    this.Syntaxiclist.push(new Errorcalm("Wrong expression",null,i))
                                }}

                            break;

                            case 'REGISTER' :
                                // define addressing mode
                                // or deplacement
                                // controle possible errors

                            }}
                            
                            
                            //+ ajouter opp avec labels
                    

                            
                        }

                      functINST1();
                      break ;
                      
                      case 'INST2':
                        
                      break ;
                          
             
                  
            }
           
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

