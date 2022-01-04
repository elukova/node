const http = require(`http`);
const fs = require(`fs`);
const path = require(`path`);

// const numCPUs = os.cpus().length;

async () => {
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
        linksList = urlParams.length ? (
          <li>
            <a href="/${prevUrl}">..</a>
          </li>
        ) : (
          <li>
            <a href="/">..</a>
          </li>
        );
      }

      console.log(`Метод запроса: ${request.method}`);
      console.log(`Заголовки запроса: \n${JSON.stringify(request.headers)}\n`);

      response.end(`Hello, world!`);
    })
    .listen(3000, `localhost`);
};
