import "express-async-errors";
import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@gittrix/common";

import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);

// Middlewares
app.use(json());
app.use(
  cookieSession({ signed: false, secure: false })
);
app.use(currentUser);

// Routers
app.use(createChargeRouter);

app.use(errorHandler);

app.all("*", async () => {
  throw new NotFoundError();
});

export { app };
