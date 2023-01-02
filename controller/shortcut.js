import Shortcut from "../model/Shortcut.js";
import logg from "../function/logmaker.js";

const call = async (req, res) => {
  console.time("runTime");
  const behavior = req.params.software + "'s ";
  try {
    const data = await Shortcut.findOne({ software: req.params.software });
    if (req.params.plat == "win") {
      logg.log(behavior + "load win");
      res.send({
        state: true,
        behavior: behavior + "load",
        data: data.win,
      });
    } else {
      logg.log(behavior + "load mac");
      res.send({
        state: true,
        behavior: behavior + "load",
        data: data.mac,
      });
    }
  } catch {
    logg.err(behavior + "unload");
    res.send({
      state: false,
      behavior: behavior + "unload",
      data: "sorry data is not found",
    });
  }
};

const alllist = async (req, res) => {
  console.time("runTime");
  const behavior = "all shortcut list is ";
  Shortcut.find({})
    .then((response) => {
      logg.log(behavior + "load");
      res.send({ state: true, behavior: behavior + "load", data: response });
    })
    .catch((error) => {
      logg.err(behavior + "unload", error);
    });
};

// Save Shortcuts to New Software
const addsoftware = async (req, res) => {
  console.time("runTime");
  const behavior = req.body.software + "'s Shortcut data is ";
  const newsoftware = new Shortcut(req.body);
  await newsoftware.save();
  logg.log(behavior + "saved");
  res.send({ state: true, behavior: behavior + "saved", data: newsoftware });
};

const renewsoftware = async (req, res) => {
  console.time("runTime");
  const behavior = req.body.software + "'s Shortcut data is ";
  Shortcut.findOneAndUpdate(
    { software: req.body.software },
    { $push: { win: req.body.win, mac: req.body.mac } },
    function (error, success) {
      if (error) {
        logg.err(behavior + "unoverwrite", error);
      } else {
        logg.log(behavior + "overwrite");
        res.send({
          state: true,
          behavior: behavior + "overwrite",
        });
      }
    }
  );
};

const shortcut = { call, alllist, addsoftware, renewsoftware };

export default shortcut;
