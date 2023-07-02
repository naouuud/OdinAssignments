test("first character is capitalized", () => {
  const capitalize = (str) => {
    if (typeof str !== "string") return "Please provide a string.";
    return str.substring(0, 1).toUpperCase().concat(str.substring(1));
  };
  expect(capitalize("mario")).toBe("Mario");
  expect(capitalize("bowser")).toBe("Bowser");
  expect(capitalize("toad")).toBe("Toad");
  expect(capitalize("7up")).toBe("7up");
  expect(capitalize(2)).toBe("Please provide a string.");
  expect(capitalize("2")).toBe("2");
});

test("string is reversed", () => {
  const reverse = (str) => {
    let newString = "";
    for (let i = 0; i < str.length; i++) {
      newString = newString.concat("", str[str.length - 1 - i]);
    }
    return newString;
  };
  expect(reverse("mario")).toBe("oiram");
});

const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

test("calculator adds integers correctly", () => {
  expect(calculator.add(5, 4)).toBe(9);
});

test("calculator adds floats correctly", () => {
  expect(calculator.add(0.5, 0.4)).toBe(0.9);
});

test("calculator subtracts integers correctly", () => {
  expect(calculator.subtract(5, 4)).toBe(1);
});

test("calculator subtracts floats correctly", () => {
  expect(calculator.subtract(0.5, 0.4)).toBeCloseTo(0.1);
});

test("calculator multiplies integers correctly", () => {
  expect(calculator.multiply(5, 4)).toBe(20);
});

test("calculator multiplies floats correctly", () => {
  expect(calculator.multiply(0.5, 0.4)).toBe(0.2);
});

test("calculator divides integers correctly", () => {
  expect(calculator.divide(5, 4)).toBe(1.25);
});

test("calculator divides floats correctly", () => {
  expect(calculator.divide(0.5, 0.4)).toBe(1.25);
});

function caesarCipher(string, shift) {
  const isUpperCase = [];
  for (i = 0; i < string.length; i++) {
    isUpperCase[i] =
      string.charCodeAt(i) >= 65 && string.charCodeAt(i) <= 90 ? true : false;
  }
  const unciphered = string.toLowerCase();
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let ciphered = "";
  for (i = 0; i < string.length; i++) {
    const index = alphabet.indexOf(unciphered[i]);
    if (index === -1) ciphered += unciphered[i];
    else {
      let newIndex = index + shift;
      if (newIndex > 25) newIndex -= 26;
      ciphered += alphabet[newIndex];
    }
  }
  let cipheredWithCase = "";
  for (i = 0; i < ciphered.length; i++) {
    if (isUpperCase[i])
      cipheredWithCase += String.fromCharCode(ciphered.charCodeAt(i) - 32);
    else cipheredWithCase += ciphered[i];
  }
  return cipheredWithCase;
}

test("caesar cipher handles letters", () => {
  expect(caesarCipher("attackatdawn", 5)).toBe("fyyfhpfyifbs");
});

test("caesar cipher handles spaces", () => {
  expect(caesarCipher("defend the east wall of the castle", 1)).toBe(
    "efgfoe uif fbtu xbmm pg uif dbtumf"
  );
});

test("caeser cipher handles numbers, symbols and punctuation", () => {
  expect(caesarCipher("will you be my #1 valentine, baby?", 13)).toBe(
    "jvyy lbh or zl #1 inyragvar, onol?"
  );
});

test("caeser cipher preserves letter case", () => {
  expect(caesarCipher("I want you to know that I LOVE YOU", 6)).toBe(
    "O cgtz eua zu qtuc zngz O RUBK EUA"
  );
});

test("caeser cipher handles complicated example", () => {
  expect(caesarCipher("th!s Is 79*!&@ 1 fInal...TEsT!!", 17)).toBe(
    "ky!j Zj 79*!&@ 1 wZerc...KVjK!!"
  );
});

const analyzeArray = (array) => {
  const length = array.length;
  let min = array[0];
  let max = array[0];
  for (i = 1; i < length; i++) {
    min = array[i] < min ? array[i] : min;
    max = array[i] > max ? array[i] : max;
  }
  const average = array.reduce((sum, current) => sum + current, 0) / length;
  return { average, min, max, length };
};

test("analyze array returns correct object", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    length: 6,
    min: 1,
    max: 8,
    average: 4,
  });
});
