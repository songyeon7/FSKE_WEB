import chalk from "chalk";

function log(content) {
  const nowTime = new Date().toISOString();
  console.log(nowTime + chalk.blue(" [logg] ") + content);
  console.timeEnd("runTime");
}

function err(content, error) {
  const nowTime = new Date().toISOString();
  console.log(nowTime + chalk.red(" [logg] ") + content + `(error: ${error})`);
}

const logg = { log, err };

export default logg;
