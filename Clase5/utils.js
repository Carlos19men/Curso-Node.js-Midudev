import { createRequire } from 'node:module'
export const require = createRequire(import.meta.url) 

export const readJSON = (path) => require(path) 
//puse un comentario KKAKAKAKAKAKAKAKA
