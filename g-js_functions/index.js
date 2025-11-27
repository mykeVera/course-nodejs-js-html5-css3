function sumar(a, b, cb) {
    const r = a + b;
    cb(r);
}

function callback(result) {
    console.log('Resultado:', result);
}

sumar(5, 3, callback);


// Fat arrow function
const miFatArrow = (a,b) => a + b;
const r = miFatArrow(4, 7);
console.log('Resultado fat arrow:', r);