const fs = require("fs");

const Maggus = require("./lib");

const data = fs.readFileSync(__dirname + "/tests/data/xing.vcf");

console.log(data.toString());

const sache = Maggus.default.parse(data);

console.log(JSON.stringify(sache, null, 2));

// const result = Maggus.default.parse(sache.data, { toFormat: "vcard" });

// console.log(result);

// const jcard = fs.readFileSync(__dirname + "/tests/data/jcard.json");

// const ding = JSON.stringify(Maggus.default.parse(jcard), null, 2);
// console.log(ding);
