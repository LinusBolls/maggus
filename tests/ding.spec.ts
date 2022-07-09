import fs from "fs";

import "mocha";
import { expect } from "chai";

import Maggus from "../src";

const readTestFile = (name: string) =>
  fs.readFileSync(__dirname + `/data${name}`);

const compareParse = (
  inputFile: string,
  outputFile: string,
  options: any = {},
  onlyData: boolean = false
) => {
  const input = readTestFile(inputFile);
  const output = readTestFile(outputFile);

  const result = Maggus.parse(input, options);

  const sache = onlyData ? result.data : result;

  const ding =
    typeof sache === "object" ? JSON.stringify(sache, null, 2) : sache;

  const lul = Array.isArray(output)
    ? ["vcard", output[1].sort((a, b) => a[0].localeCompare(b[0]))]
    : output;

  expect(ding).to.equal(lul.toString());
};

describe("version and format interoperability", () => {
  const sache = ["2.1", "3.0", "4.0"].flatMap((version) =>
    ["maggus", "vcard", "jcard"].map((format) => ({ version, format }))
  );

  for (const [input, output] of sache.flatMap((i) =>
    sache.map((j) => [i, j])
  )) {
    it(`[valid] shoud parse from ${input.format} ${input.version} to ${output.format} ${output.version}`, () => {
      const result = Maggus.parse(
        readTestFile(`/valid/${input.format}-${input.version}.standart`),
        {
          toFormat: output.format,
          toVersion: output.version,
        }
      ).data;

      fs.writeFileSync(
        __dirname +
          `/data/out/${input.format}-${input.version}_to_${output.format}-${output.version}`,
        typeof result === "object" ? JSON.stringify(result, null, 2) : result
      );

      compareParse(
        `/valid/${input.format}-${input.version}.standart`,
        `/valid/${output.format}-${output.version}.standart`,
        { toFormat: output.format, toVersion: output.version },
        true
      );
    });
  }
});

describe("vCard formats", () => {
  it("[valid] should parse from vCard 2.1 to maggus", () => {
    // compareParse("2.1/data.vcf", "2.1/data.maggus");
  });
  it("[valid] should parse from vCard 3.0 to maggus", () => {
    // compareParse("3.0/data.vcf", "3.0/data.maggus");
  });
  it("[valid] should parse from vCard 4.0 to maggus", () => {
    // compareParse("4.0/data.vcf", "4.0/data.maggus");
  });

  it("[valid] should parse from jCard 2.1 to maggus", () => {});
  it("[valid] should parse from jCard 3.0 to maggus", () => {});
  it("[valid] should parse from jCard 4.0 to maggus", () => {});

  it("[valid] should parse from maggus to vCard 2.1", () => {});
  it("[valid] should parse from maggus to vCard 3.0", () => {});
  it("[valid] should parse from maggus to vCard 4.0", () => {});

  it("[valid] should parse from maggus to jCard 2.1", () => {
    // console.log(Maggus.parse(readTestFile))
    // fs.writeFileSync(
    //   __dirname + "/data/valid/maggus-2.1.standart",
    //   JSON.stringify(
    //     Maggus.parse(readTestFile("/valid/vcard-2.1.standart")).data,
    //     null,
    //     2
    //   )
    // );
    // console.log(sache);
    // console.log(
    //   JSON.stringify(
    //     Maggus.parseMultiple(readTestFile("/multiple.vcf").toString()),
    //     null,
    //     2
    //   )
    // );
  });
  it("[valid] should parse from maggus to jCard 3.0", () => {});
  it("[valid] should parse from maggus to jCard 4.0", () => {});

  it("[valid] should parse from maggus to maggus", () => {});

  it("[nonfatal] should notice malformed if version not right after begin and version !== 2.1", () => {
    // compareParse("4.0/data.vcf", "4.0/data.maggus");
  });
  it("[fatal] should fail if begin, end or version missing", () => {});

  it("[fatal] should fail if begin or end misplaced", () => {});

  it("[fatal] should fail if version not one of 2.1, 3.0, 4.0", () => {});

  it("[fatal] should fail if called with invalid options", () => {
    // expect(
    //   Maggus.parse("BEGIN:VCARD\nVERSION:4.0\nEND:VCARD", {
    //     toFormat: "invalidFormat",
    //   } as any).meta.status
    // ).to.equal("invalid");
  });
});

// "[nonfatal] should notice malformed if version not right after begin and version !== 2.1"
// "[fatal] should fail if begin, end or version missing"
// "[fatal] should fail if begin or end misplaced"
// "[fatal] should fail if version not one of 2.1, 3.0, 4.0"
// "[fatal] should fail if called with invalid options"
// "should parse a vCard with empty lines (android)
// "should parse a vCard with folded line beginning with space"
// "should strip quotes from lists (issue #23)"
// "should parse vCard property values containing isolated \\n without delimiting, e.g. used in quoted-printable encoding (issue #31)"
// "charset should not be part of value"
// "URL parameters should not become object properties"
// "should be able to read base64 encoded photo"
// "toString version 4.0 should contain type with lowercase values"
// "toString version 3.0 should contain type with uppercase values"
// "toString version 2.1 should contain values with uppercase but no type string"

// need 4 more tests
