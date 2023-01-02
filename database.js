import mongoose from "mongoose";
import chalk from "chalk";

const mongo = () => {
  const handleconnect = () => {
    mongoose.connect(
      "mongodb+srv://nokcha:nokchababo@cluster.5h9unov.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  };

  const handleOpen = () => {
    const nowTime = new Date().toISOString();
    console.log(nowTime + chalk.blue(" [mongoDB] ") + "connecting");
  };
  const handleError = (error) => {
    const nowTime = new Date().toISOString();
    console.log(nowTime + chalk.red(" [mongoDB] ") + `errorCode:${error}`);
  };

  handleconnect();

  const db = mongoose.connection;

  db.once("open", handleOpen);
  db.on("error", handleError);
  db.on("disconnected", handleconnect);
};

const database = { mongo };

export default database;
