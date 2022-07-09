const fs = require("fs");
const assert = require("assert");

const Maggus = require("..").default;

const readTestFile = (name) => fs.readFileSync(__dirname + `/data/${name}.vcf`);

suite("vCard", function () {
  suite("Real World Anomalies", function () {
    test("should parse a vCard with empty lines (android)", function () {
      const data = readTestFile("empty-lines");

      const card = Maggus.parse(data);

      assert.ok(card.data.rev);
      assert.ok(card.data.photo);
      assert.strictEqual(card.data.tel.length, 2);
    });

    test("should parse a vCard with folded line beginning with space", function () {
      const data = readTestFile("vcard-4.0");

      const card = Maggus.parse(data);

      assert.strictEqual(card.data.adr.length, 2);
      assert.strictEqual(
        card.data.adr[1].props.label.join(","),
        '"42 Plantation St.\\nBaytown, LA 30314\\nUnited States of America"'
      );
    });
  });

  suite("Bugs", function () {
    test("should strip quotes from lists (issue #23)", function () {
      const data = readTestFile("quoted-list");

      const card = Maggus.parse(data);

      assert.deepEqual(card.data.tel[0].props.type, ["voice", "home"]);
    });

    test("should parse vCard property values containing isolated \\n without delimiting, e.g. used in quoted-printable encoding (issue #31)", function () {
      const data = require("./data/vcard-withQuotedPrintableEncoding");

      const card = Maggus.parse(data);

      assert.strictEqual(
        card.data.note.valueOf(),
        "foobar foobar foobar foobar fo=\nobar foobar foobar foobar foobar=0Afoobar foobar foobar foobar foobar fooba=\nr=0Afoobar foobar foobar foobar foobar foobar=0Afoobar foobar foobar foobar=\n foobar foobar foobar foobar foobar"
      );
    });
  });
});
