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
       | Lam AST
       | Var AST
       | App AST AST
*/

function goodPush(x,a) {
    var newArr = [x];
    a.forEach(function(e) {newArr.push(e);});
    return newArr;
}

console.log(goodPush(1,[]));

function eval(term,env) {
    switch (term.constructor) {
	case 'Plus' : 
	    return ( eval(term.args[0],env) + eval(term.args[1],env));
	case 'Minus' : 
            return ( eval(term.args[0],env) - eval(term.args[1],env));
        case 'If' : 
	    if (eval(term.args[0],env)) {
		return eval(term.args[1],env);
	    }
	    else {
		return eval(term.args[2],env);
	    }
        case 'Zero' : 
	     return 0;
        case 'Suc' : 
	     return 1 + (eval(term.args[0],env));
        case 'True' : return 1;
        case 'False' : return 0;
        case 'Le' : 
	     if (eval(term.args[0],env) <= eval(term.args[1],env)) {
		 return 1;
	     }
             else return 0;
        case 'IsZero' : return (0 == eval(term.args[0],env));
        case 'Var' : return env[eval(term.args[0],env)];
        case 'Lam' : return (function (x) {
	    eval(term.args[0],goodPush(x,env));
	});
	case 'App' : return (eval(term.args[0],env)(eval(term.args[1],env)));
    }
}

var zeroAST = {constructor : "Zero", args : []};
var oneAST = {constructor : "Suc", args : [zeroAST]};
var plusAST = {constructor : "Plus", args : [oneAST,oneAST]};
var var0 = {constructor : "Var", args : [zeroAST]};
var idAST = {constructor : "Lam", args : [var0]};
var appAST = {constructor : "App", args : [idAST,oneAST]};

console.log(eval(idAST,[]));
console.log(eval(idAST,[])(2));
console.log(eval(var0,[0]));
console.log(eval(appAST,[]));

