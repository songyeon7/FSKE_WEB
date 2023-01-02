import path from "path";

const home = (req, res) => {
  const __dirname = path.resolve();
  res.sendFile(__dirname + "/public/index.html");
};

const adobe = (req, res) => {
  const __dirname = path.resolve();
  res.cookie("program", req.params.software);
  res.sendFile(__dirname + "/public/adobe.html");
};

const window = (req, res) => {
  const __dirname = path.resolve();
  res.sendFile(__dirname + "/public/win.html");
};

const page = { home, adobe, window };

export default page;
