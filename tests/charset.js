const fs = require("fs");
const assert = require("assert");

const Maggus = require("..").default;

const readTestFile = (name) => fs.readFileSync(__dirname + `/data/${name}.vcf`);

suite("vCard", function () {
  suite("Character Sets", function () {
    test("charset should not be part of value", function () {
      const data = readTestFile("xing");
      const card = Maggus.parse(data);

      assert.equal(card.data.fn[0].value, "Hans-Peter Mustermann");
      assert.strictEqual(card.data.fn[0].props.charset[0], "iso-8859-1");
    });
  });
});
