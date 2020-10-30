import chalk from 'chalk';
import http from 'http';

const port = process.env.JEST_PA11Y_SERVER_PORT || 4444;

const server = http.createServer((_, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.end(
    `
      <html>
        <head></head>
        <body></body>
      </html>
    `.trim()
  );
});

export const startServer = () => {
  server.listen(port)
  chalk.gray(`Pa11y server at port ${port} is running...`);
};

export const stopServer = () => {
  server.close();
};
