/* 
   So now we'll just go ahead and write a little language like

   AST = Plus AST AST { constructor : String, Args : Array AST }
       | Minus AST AST
       | If AST AST AST
       | Zero
       | Suc AST
       | True
       | False
       | Le AST AST
       | IsZero AST
*/

function eval(term) {
    switch (term.constructor) {
	case 'Plus' : 
	    return ( eval(term.args[0]) + eval(term.args[1]));
	case 'Minus' : 
            return ( eval(term.args[0]) - eval(term.args[1]));
        case 'If' : 
	    if (eval(term.args[0])) {
		return eval(term.args[1]);
	    }
	    else {
		return eval(term.args[2]);
	    }
        case 'Zero' : 
	     return 0;
        case 'Suc' : 
	     return 1 + (eval(term.args[0]));
        case 'True' : return 1;
        case 'False' : return 0;
        case 'Le' : 
	     if (eval(term.args[0]) <= eval(term.args[1])) {
		 return 1;
	     }
             else return 0;
        case 'IsZero' : return (0 == eval(term.args[0]));
    }
}

var zeroAST = {constructor : "Zero", args : []};
var oneAST = {constructor : "Suc", args : [zeroAST]};
var plusAST = {constructor : "Plus", args : [oneAST,oneAST]};
var ifAST = {constructor : "If", args : [oneAST,plusAST,zeroAST]};

console.log(eval(ifAST));
