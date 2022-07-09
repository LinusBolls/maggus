const fs = require("fs");
const assert = require("assert");

const Maggus = require("..").default;

const readTestFile = (name) => fs.readFileSync(__dirname + `/data/${name}.vcf`);

suite("vCard", function () {
  suite("Collection", function () {
    test("Parses multiple vCards from one file", function () {
      const data = readTestFile(multiple);

      const cards = Maggus.parse(data, { isMultiple: true });

      assert.equal(cards.data.length, 3);
    });
  });
});
