import mongoose from "mongoose";

const shema = new mongoose.Schema({
  software: String,
  about: String,
  company: String,
  win: [{ name: String, mean: String, key: [String] }],
  mac: [{ name: String, mean: String, key: [String] }],
});

const model = mongoose.model("Shortcut", shema);

export default model;
