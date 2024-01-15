import "express-async-errors";
import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@gittrix/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { listTicketsRouter } from "./routes/list";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);

// Middlewares
app.use(json());
app.use(
  cookieSession({ signed: false, secure: false })
);
app.use(currentUser);

// Routers
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(listTicketsRouter);
app.use(updateTicketRouter);

app.use(errorHandler);

app.all("*", async () => {
  throw new NotFoundError();
});

export { app };
