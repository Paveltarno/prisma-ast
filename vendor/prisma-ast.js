// Generated by PEG.js v0.11.0-master.b7b87ea, https://pegjs.org/

"use strict";

function peg$subclass(child, parent) {
  function C() { this.constructor = child; }
  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message = message;
  this.expected = expected;
  this.found = found;
  this.location = location;
  this.name = "SyntaxError";

  // istanbul ignore next
  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found, location) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },

    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part)
          ? classEscape(part[0]) + "-" + classEscape(part[1])
          : classEscape(part);
      });

      return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
    },

    any: function() {
      return "any character";
    },

    end: function() {
      return "end of input";
    },

    other: function(expectation) {
      return expectation.description;
    },

    not: function(expectation) {
      return "not " + describeExpectation(expectation.expected);
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/"/g,  "\\\"")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\]/g, "\\]")
      .replace(/\^/g, "\\^")
      .replace(/-/g,  "\\-")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== undefined ? options : {};

  var peg$FAILED = {};

  var peg$startRuleFunctions = { buildTree: peg$parsebuildTree };
  var peg$startRuleFunction = peg$parsebuildTree;

  var peg$c0 = "{";
  var peg$c1 = "}";
  var peg$c2 = "@";
  var peg$c3 = "?";
  var peg$c4 = "[]";
  var peg$c5 = "Int";
  var peg$c6 = "String";
  var peg$c7 = "Boolean";
  var peg$c8 = "model";

  var peg$r0 = /^[a-zA-Z0-9]/;
  var peg$r1 = /^[ \t\r\n\f]/;
  var peg$r2 = /^[ \t\r\f]/;
  var peg$r3 = /^[\n]/;

  var peg$e0 = peg$literalExpectation("{", false);
  var peg$e1 = peg$literalExpectation("}", false);
  var peg$e2 = peg$otherExpectation("modelFieldName");
  var peg$e3 = peg$otherExpectation("modelFieldAttributeValue");
  var peg$e4 = peg$literalExpectation("?", false);
  var peg$e5 = peg$literalExpectation("Int", false);
  var peg$e6 = peg$literalExpectation("String", false);
  var peg$e7 = peg$literalExpectation("Boolean", false);
  var peg$e8 = peg$otherExpectation("relationFieldName");
  var peg$e9 = peg$literalExpectation("model", false);
  var peg$e10 = peg$otherExpectation("modelName");
  var peg$e11 = peg$otherExpectation("whitespace/EOL");
  var peg$e12 = peg$otherExpectation("whitespace");
  var peg$e13 = peg$classExpectation(["\n"], false, false);

  var peg$f0 = function(nodes) { return({ type: 'ast', nodes }) };
  var peg$f1 = function(fields) { return(fields) };
  var peg$f2 = function(name, modelFieldType) { return({name, ...modelFieldType}) };
  var peg$f3 = function(modelFieldType, isOptional, attributes) { 
        return({
          ...modelFieldType, 
          isOptional: Boolean(isOptional), 
          attributes}) 
      };
  var peg$f4 = function(value) { return({type: 'attribute', value} ) };
  var peg$f5 = function(fieldType) { return({type: 'modeFieldPrimitive', fieldType}) };
  var peg$f6 = function(fieldType, hasMany) { return({type: 'modelFieldRelation', fieldType, hasMany: Boolean(hasMany)}) };
  var peg$f7 = function(modelName, fields) { return({type: 'model', name: modelName, fields }) };

  var peg$currPos = 0;
  var peg$savedPos = 0;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$expected = [];
  var peg$silentFails = 0;

  var peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return [peg$savedPos, peg$currPos];
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  var peg$VALIDFILENAME = typeof options.filename === "string" && options.filename.length > 0;
  function peg$computeLocation(startPos, endPos) {
    var loc = {};

    if ( peg$VALIDFILENAME ) loc.filename = options.filename;

    var startPosDetails = peg$computePosDetails(startPos);
    loc.start = {
      offset: startPos,
      line: startPosDetails.line,
      column: startPosDetails.column
    };

    var endPosDetails = peg$computePosDetails(endPos);
    loc.end = {
      offset: endPos,
      line: endPosDetails.line,
      column: endPosDetails.column
    };

    return loc;
  }

  function peg$begin() {
    peg$expected.push({ pos: peg$currPos, variants: [] });
  }

  function peg$expect(expected) {
    var top = peg$expected[peg$expected.length - 1];

    if (peg$currPos < top.pos) { return; }

    if (peg$currPos > top.pos) {
      top.pos = peg$currPos;
      top.variants = [];
    }

    top.variants.push(expected);
  }

  function peg$end(invert) {
    var expected = peg$expected.pop();
    var top = peg$expected[peg$expected.length - 1];
    var variants = expected.variants;

    if (top.pos !== expected.pos) { return; }

    if (invert) {
      variants = variants.map(function(e) {
        return e.type === "not" ? e.expected : { type: "not", expected: e };
      });
    }

    Array.prototype.push.apply(top.variants, variants);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found, location),
      expected,
      found,
      location
    );
  }

  function peg$buildError() {
    var expected = peg$expected[0];
    var failPos = expected.pos;

    return peg$buildStructuredError(
      expected.variants,
      failPos < input.length ? input.charAt(failPos) : null,
      failPos < input.length
        ? peg$computeLocation(failPos, failPos + 1)
        : peg$computeLocation(failPos, failPos)
    );
  }

  function peg$parsebuildTree() {
    var s0, s1, s2;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsemodelDef();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsemodelDef();
    }
    peg$savedPos = s0;
    s1 = peg$f0(s1);
    s0 = s1;

    return s0;
  }

  function peg$parseblockStart() {
    var s0, s1, s2, s3, s4;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parses();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parses();
    }
    rule$expects(peg$e0);
    if (input.charCodeAt(peg$currPos) === 123) {
      s2 = peg$c0;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$parses();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parses();
      }
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseblockEnd() {
    var s0, s1, s2, s3, s4;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parses();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parses();
    }
    rule$expects(peg$e1);
    if (input.charCodeAt(peg$currPos) === 125) {
      s2 = peg$c1;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$parses();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parses();
      }
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemodelFieldsBlock() {
    var s0, s1, s2, s3;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = peg$currPos;
    s1 = peg$parseblockStart();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsemodelFieldRow();
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsemodelFieldRow();
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseblockEnd();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f1(s2);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemodelFieldRow() {
    var s0, s1, s2, s3, s4, s5;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parses();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parses();
    }
    s2 = peg$parsemodelFieldName();
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$parsews();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parsews();
      }
      s4 = peg$parsemodelFieldType();
      if (s4 !== peg$FAILED) {
        s5 = peg$parseeol();
        if (s5 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f2(s2, s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemodelFieldName() {
    var s0;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    rule$expects(peg$e2);
    peg$silentFails++;
    s0 = peg$parsestring();
    peg$silentFails--;

    return s0;
  }

  function peg$parsemodelFieldType() {
    var s0, s1, s2, s3, s4;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = peg$currPos;
    s1 = peg$parsemodelFieldTypePrimitive();
    if (s1 === peg$FAILED) {
      s1 = peg$parsemodelFieldTypeRelation();
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsemodelFieldOptional();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = [];
      s4 = peg$parsemodelFieldAttribute();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parsemodelFieldAttribute();
      }
      peg$savedPos = s0;
      s0 = peg$f3(s1, s2, s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemodelFieldAttribute() {
    var s0, s1, s2, s3;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    rule$expects(peg$e3);
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parsews();
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 64) {
        s2 = peg$c2;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsestring();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f4(s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;

    return s0;
  }

  function peg$parsemodelFieldOptional() {
    var s0;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    rule$expects(peg$e4);
    if (input.charCodeAt(peg$currPos) === 63) {
      s0 = peg$c3;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemodelFieldHasMany() {
    var s0;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    if (input.substr(peg$currPos, 2) === peg$c4) {
      s0 = peg$c4;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemodelFieldTypePrimitive() {
    var s0, s1;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = peg$currPos;
    rule$expects(peg$e5);
    if (input.substr(peg$currPos, 3) === peg$c5) {
      s1 = peg$c5;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      rule$expects(peg$e6);
      if (input.substr(peg$currPos, 6) === peg$c6) {
        s1 = peg$c6;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        rule$expects(peg$e7);
        if (input.substr(peg$currPos, 7) === peg$c7) {
          s1 = peg$c7;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f5(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsemodelFieldTypeRelation() {
    var s0, s1, s2;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    rule$expects(peg$e8);
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parsemodelFieldRelationName();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsemodelFieldHasMany();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      peg$savedPos = s0;
      s0 = peg$f6(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;

    return s0;
  }

  function peg$parsemodelFieldRelationName() {
    var s0;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = peg$parsestring();

    return s0;
  }

  function peg$parsemodelDef() {
    var s0, s1, s2, s3, s4;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = peg$currPos;
    rule$expects(peg$e9);
    if (input.substr(peg$currPos, 5) === peg$c8) {
      s1 = peg$c8;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parses();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsemodelName();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsemodelFieldsBlock();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f7(s3, s4);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemodelName() {
    var s0;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    rule$expects(peg$e10);
    peg$silentFails++;
    s0 = peg$parsestring();
    peg$silentFails--;

    return s0;
  }

  function peg$parsestring() {
    var s0, s1, s2;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = peg$currPos;
    s1 = [];
    if (peg$r0.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$r0.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parses() {
    var s0, s1;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    rule$expects(peg$e11);
    peg$silentFails++;
    s0 = [];
    if (peg$r1.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$r1.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
        }
      }
    } else {
      s0 = peg$FAILED;
    }
    peg$silentFails--;

    return s0;
  }

  function peg$parsews() {
    var s0, s1;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    rule$expects(peg$e12);
    peg$silentFails++;
    s0 = [];
    if (peg$r2.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$r2.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
        }
      }
    } else {
      s0 = peg$FAILED;
    }
    peg$silentFails--;

    return s0;
  }

  function peg$parseeol() {
    var s0, s1;

    var rule$expects = function (expected) {
      if (peg$silentFails === 0) peg$expect(expected);
    }

    s0 = [];
    rule$expects(peg$e13);
    if (peg$r3.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        rule$expects(peg$e13);
        if (peg$r3.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  peg$begin();
  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$expect(peg$endExpectation());
    }

    throw peg$buildError();
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};