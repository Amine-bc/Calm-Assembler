import { Assembler,FuncInterface } from "./Assembler.js";
import { SyntaxicAnalysis } from "./SyntaxicAnalysis.js";
import { Errorcalm } from "./Errorcalm.js";
import { Lexer } from "./Lexer.js";

//  { name: 'imo', address: '1437' }




/*

A function to convert a label object to a normal operand with direct addressing mode object

This will help you treat labels as normal addresses in memory


- Write a function that takes lexicallist as param and then returns addressing moder and errorcalm object


- Write a function that takes a label object and returns a normal operand object
*/










//---------------YOU---CAN--USE---THOSE---IN---YOUR---CODE------DEPLACEMENT------IN----REGISTERS-----//



if (lexicalList[i].length == 5) {
    if (firstparam.value < Assembler.MAXNUM) {
        if (lexicalList[i][2].type === 'SPECIAL CHARACTER' && lexicalList[i][2].value === '*' && lexicalList[i][3].value === '+') {                                                {
            if (lexicalList[i][4].type == 'NUMBER') {
                if (lexicalList[i][4].value < Assembler.MAXNUM) {
                    this.Syntaxiclist.push(lexicalList[i]);
                    // addressing mode deplassement add it to the element in the list here up
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111
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
// add case of when there is an indirect addressing mode
this.Syntaxiclist.push(new Errorcalm("Wrong expression",null,i))
}