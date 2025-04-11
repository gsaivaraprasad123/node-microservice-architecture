import "dotenv/config.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

import Routes from "./routes/index.js";
app.use(Routes);

app.listen(PORT, () => {
  console.log(`⏳Server running on PORT : ${PORT}`);
});
