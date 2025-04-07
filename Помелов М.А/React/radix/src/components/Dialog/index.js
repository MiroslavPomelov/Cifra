function foo(anyFunc) {
    let num = 1;
    let str = 'abc';
    let bool = false;
    let key = {
        x: 33,
        y: 20
    }

    anyFunc(num,str,bool,key)
};


foo(() =>(console.log('0')));
foo((num) =>(num));
foo((bool) =>(bool));
foo((key) =>(key));


