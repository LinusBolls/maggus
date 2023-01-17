import { readFileSync } from "fs"

const file0 = __dirname + "/tests/data/out/maggus-2.1_to_vcard-3.0"
const file1 = __dirname + "/tests/data/valid/vcard-3.0.standart"

const ding0 = encodeURIComponent(readFileSync(file0, {encoding:"utf8"}).toString())
const ding1 = encodeURIComponent(readFileSync(file1, {encoding:"utf8"}).toString())

console.log(ding0)
console.log(ding1)
console.log(ding0 === ding1)