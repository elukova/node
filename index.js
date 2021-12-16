const fs = require("fs");
const ACCESS_LOG = "./accessMini.log";

const readStream = fs.createReadStream(ACCESS_LOG, {
  encoding: "utf-8",
  highWaterMark: 128,
});
const writeStream1 = fs.createWriteStream("./89.123.1.41_requests.log");
const writeStream2 = fs.createWriteStream("./34.48.240.111_requests.log");

let prevChunkTail = "";

readStream.on("data", (chunk) => {
  checkLine = prevChunkTail + chunk.toString();

  if (checkLine.includes("89.123.1.41")) {
    writeStream1.write(checkLine + "\n");
  }
  if (checkLine.includes("34.48.240.111")) {
    writeStream2.write(checkLine + "\n");
  }
  prevChunkTail = chunk.toString().slice(-12);
});
