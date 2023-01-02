import chalk from "chalk";

// logging about request
const myLogger = function (req, res, next) {
  const nowTime = new Date().toISOString();
  const URLaddress = "\u00a0[" + req.originalUrl + "]\u00a0";
  const IPaddress =
    req.header["x-forwarded-for"] || req.connection.remoteAddress;
  const method = "\u00a0" + req.method;
  console.log(
    nowTime + chalk.yellow(URLaddress) + chalk.green(IPaddress + method)
  );
  next();
};

export default myLogger;
