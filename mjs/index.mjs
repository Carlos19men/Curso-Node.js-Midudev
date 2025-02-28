//otra forma de hacer los comondJs es usando la extensión .mjs en el archivo donde queremos
//importar el modulo 

//.js -> Por defecto utiliza CommonJS
//.mjs -> Por defecto utiliza ES Modules (ECMAScript Modules)
//.cjs -> Utiliza CommonJS

import {suma, sub, mul} from './suma.mjs'

console.log(suma(1,2))
console.log(sub(1,2))
console.log(mul(1,2))