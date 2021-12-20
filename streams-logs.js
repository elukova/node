const fs = require("fs");
const ACCESS_LOG = "../accessGreat.log";

const [, , ...ips] = process.argv;
ips.push("89.123.1.41", "34.48.240.11222"); //examples for testing

const readStream = fs.createReadStream(ACCESS_LOG, {
  encoding: "utf-8",
});

let writeStreams = [];

ips.forEach((ip, i) => {
  writeStreams.push(fs.createWriteStream(`./${ip}_requests.log`));
});

//since a chunk can break a string, check the tail of the previous chunk
let prevChunkTail = "";
//calculate max length of ip string for required prevChunkTail length
let maxIpLength = 0;
for (ip of ips) {
  if (ip.length > maxIpLength) {
    maxIpLength = ip.length;
  }
}

readStream.on("data", (chunk) => {
  let checkLine = prevChunkTail + chunk.toString();
  let lines = checkLine.split(`\n`);
  lines.filter((line) => {
    ips.forEach((ip, ipInd) => {
      if (line.includes(ip)) {
        writeStreams[ipInd].write(line + `\n`);
      }
    });
  });

  prevChunkTail = chunk.toString().slice(-maxIpLength);
});
