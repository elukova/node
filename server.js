const http = require(`http`);
const fs = require(`fs`);
const path = require(`path`);

// const numCPUs = os.cpus().length;

(async () => {
  const isFile = (path) => fs.lstatSync(path).isFile();

  http
    .createServer((request, response) => {
      const fullPath = path.join(process.cwd(), request.url);
      console.log(fullPath);

      if (!fs.existsSync(fullPath))
        return response.end(`File or directory not found`);

      if (isFile(fullPath)) return fs.createReadStream(fullPath).pipe(response);

      let linksList = ``;

      const urlParams = request.url.match(/[\d\w\.]+/gi);

      if (urlParams) {
        urlParams.pop();
        const prevUrl = urlParams.join(`/`);
        linksList = urlParams.length
          ? `<li>
              <a href="/${prevUrl}">..</a>
            </li>`
          : `<li>
              <a href="/">..</a>
            </li>`;
      }

      fs.readdirSync(fullPath).forEach((fileName) => {
        const filePath = path.join(request.url, fileName);
        linksList += `<li>
            <a href="${filePath}">${fileName}</a>
          </li>`;
      });

      const HTML = fs
        .readFileSync(path.join(__dirname, `index.html`), "utf-8")
        .replace(`##links`, linksList);

      response.writeHead(200, { "Content-Type": "text/html" });

      return response.end(HTML);
    })
    .listen(5555, `localhost`);
})();
