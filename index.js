const colors = require("colors/safe");

let [, , rangeStart, rangeEnd] = process.argv;

if (rangeStart != +rangeStart || rangeEnd != +rangeEnd) {
  console.log(colors.inverse.red("Not a number"));
} else {
  let primeNumbers = [];

  search: for (let i = +rangeStart; i <= rangeEnd; i++) {
    if (i == 1) continue search;
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue search;
    }
    primeNumbers.push(i);
  }

  if (primeNumbers.length == 0) {
    console.log(colors.brightMagenta("There are no prime numbers here"));
  } else {
    for (let i = 0; i < primeNumbers.length; i += 3) {
      console.log(colors.green(primeNumbers[i]));
      if (primeNumbers[i + 1] != undefined) {
        console.log(colors.yellow(primeNumbers[i + 1]));
      }
      if (primeNumbers[i + 2] != undefined) {
        console.log(colors.red(primeNumbers[i + 2]));
      }
    }
  }
}
