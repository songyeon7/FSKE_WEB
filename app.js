import express from "express";
import cookieParser from "cookie-parser";
import database from "./database.js";
import logger from "./middleware/logger.js";
import page from "./controller/page.js";
import shortcut from "./controller/shortcut.js";

// DB connect
database.mongo();

// express setting
const app = express();
app.set("port", 3000);
app.use(cookieParser());

// [middleware] all use
app.use(logger);

// Frontned (please do not use /api routing)
// [middleware] It will be use frontend
app.use(express.static("public"));
app.use("/keys", express.static("keys"));
// [Router] basic page
app.get("/", page.home);
app.get("/adobe/:software", page.adobe);
app.get("/window", page.window);
// [Router] widget page
app.get("/widget/:software/:plat", shortcut.call);

// Backend (please use /api routing)
// [middleware] It will be use backend
app.use(express.json());
// [Router] It use /api/sc or /api/shortcut
app.get("/api/s(hort)?c(ut)?", shortcut.alllist);
app.post("/api/s(hort)?c(ut)?/newsoftware", shortcut.addsoftware);
app.post("/api/s(hort)?c(ut)?/newshortcut", shortcut.renewsoftware);

app.listen(3000, () => {
  console.log("FSKE servise is listening on port " + app.get("port"));
});
