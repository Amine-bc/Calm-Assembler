export class Lexer {
    constructor(code) {
        console.log(code.match(/([a-zA-Z0-9]+\d*(?:[a-zA-Z09]+)?|\*|,|\+)/g))
      this.LexicalList = code.match(/([a-zA-Z0-9]+\d*(?:[a-zA-Z0-9]+)?|\*|,|\+)/g).filter(function (t) {
        return t.length > 0;
      }).map(function (t) {
        if (isNaN(t)) {
          switch (t) {
            case 'R1':
            case 'R2':
            case 'R3':
            case 'R4':
            case 'ACC':
            case 'BR':
            case 'IR':
            case 'SR':
            case 'R1R':
            case 'R2R':
            case 'R3R':
            case 'ACCR':
            case 'R1L':
            case 'R2L':
            case 'R3L':
            case 'ACCL':
              return {
                type: 'REGISTER',
                value: t
              };
              case 'RET':
              case 'PUSHA':
              case 'POPA':
              return{
                    type: 'INST0',
                    value: t
                    };
            case 'NEG':
            case 'NOT':
            case 'SHL':
            case 'SHR':
            case 'READ':
            case 'WRITE':
            case 'PUSH':
            case 'POP':
            case 'ROR':
            case 'ROL':
            case 'CALL':
            case 'BE':
            case 'BNE':
            case 'BS':
            case 'BI':
            case 'BIE':
            case 'BSE':
            case 'BR':
              return {
                type: 'INST1',
                value: t
              };
            case 'NAND':
            case 'CMP':
            case 'MOV':
            case 'ADD':
            case 'SUB':
            case 'MUL':
            case 'DIV':
            case 'AND':
            case 'OR':
            case 'XOR':
            case 'NOR':
              return{ 
                type: 'INST2',
                value: t
              };
            case '*':
            case ',':
            case '+':
              return {
                type: 'SPECIAL CHARACTER',
                value: t
              };
            case 'LABEL':
              return {
                type: 'LABEL'
              };
              break;
            default:
              return {
                type: 'TEXT',
                value: t
              };
          }
        } else {
          return {
            type: 'NUMBER',
            value: t
          };
        }
      });
    }
  }