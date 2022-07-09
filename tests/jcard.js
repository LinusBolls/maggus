const fs = require("fs");
const assert = require("assert");

const Maggus = require("..").default;

const readTestFile = (name) => fs.readFileSync(__dirname + `/data/${name}.vcf`);

suite("vCard", function () {
  suite("JSON / jCard", function () {
    test("toJSON", function () {
      const data = require("./data/jcard");

      const card = Maggus.parse(data, { format: "jcard" });

      const result = Maggus.unparse(card.data);

      assert.deepEqual(result, data);
    });

    test("toJCard", function () {
      const data = require("./data/jcard");

      const card = Maggus.parse(data, { format: "jcard" });

      const result = Maggus.unparse(card, { format: "jcard" });

      assert.deepEqual(result, data);
    });
  });
});
