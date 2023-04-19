import { Assembler, FuncInterface } from "./Assembler.js";
import { Errorcalm } from "./Errorcalm.js";


const addrmod = (listofpar,line) => {

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

return {list1,list2}

}

const defadrmod = (listofparam,i) => {

    switch (listofparam.length) {
        case 1:
            //immediat
            return {type:listofparam[0].type,value:listofparam[0].value,mode:0} 
            
            break;
        
        case 2:
            //direct
            if (listofparam[1].value === '*' ) {
                return {type:listofparam[0].type,value:listofparam[0].value,mode:1} 
            }        else{
                Errorcalm.SyntaxicError.push(new Errorcalm("Wrong parameters",null,i));
                return {type:'ERROR',value:'Wrong parameters',mode:1}
            }    
            break;
        
        case 3:
            //indirect
            if (listofparam[1].value === '*' && listofparam[2].value === '*' ) {
                return {type:listofparam[0].type,value:listofparam[0].value,mode:2} 
            }else{
                Errorcalm.SyntaxicError.push(new Errorcalm("Wrong parameters",null,i));
                return {type:'ERROR',value:'Wrong parameters',mode:2}
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
                return {type:'ERROR',value:'Number size is bigger then MAXNUM',mode:3,depl:listofparam[3].value}
                break ;
        }}else{
            Errorcalm.SyntaxicError.push(new Errorcalm("Wrong parameters",null,i));
            return {type:'ERROR',value:'Wrong parameters',mode:3,depl:listofparam[3].value}}
            break;

        default:
            Errorcalm.SyntaxicError.push(new Errorcalm("Wrong parameters",null,i));
            return {type:'ERROR',value:'Wrong parameters',mode:3,depl:listofparam[3].value}
            break;
    }




    }

// to test the function

let lista =[
    { type: 'NUMBER', value: '76' },
    { type: 'SPECIAL CHARACTER', value: '*' },
    { type: 'SPECIAL CHARACTER', value: ',' },
    { type: 'NUMBER', value: 'R1' },
    { type: 'SPECIAL CHARACTER', value: '+' },
    { type: 'SPECIAL CHARACTER', value: '10' }
  ];


    let list1 = addrmod(lista,1).list1;
    let list2 = addrmod(lista,1).list2;

    console.log("list1",list1);

    console.log(defadrmod(list1));
    console.log("list2",list2);

    console.log(defadrmod(list2));