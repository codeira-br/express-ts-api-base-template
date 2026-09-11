import express from "express";
import { httpBeforeLogger } from "./shared/middlewares/http-before-handler.js";
import errorHandler from "./shared/middlewares/error-handler.js";

const app = express();

app.use(httpBeforeLogger);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "API funcionando!",
  });
});

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
