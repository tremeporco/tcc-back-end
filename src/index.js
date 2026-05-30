import express from "express";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const handler = toNodeHandler(auth);

app.use("/api/auth", async (req, res) => {
  return handler(req, res);
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});