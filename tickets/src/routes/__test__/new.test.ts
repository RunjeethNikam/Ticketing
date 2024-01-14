import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("has a route handler listening to /api/tickets", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("Can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("Returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(response).not.toEqual(401);
});

it("Returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .send({
      title: "",
      price: 10,
    })
    .set("Cookie", global.signin())
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .send({
      price: 10,
    })
    .set("Cookie", global.signin())
    .expect(400);
});

it("Returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .send({
      title: "title",
      price: -10,
    })
    .set("Cookie", global.signin())
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .send({
      title: "title",
    })
    .set("Cookie", global.signin())
    .expect(400);
});

it("Creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toBe(0);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "title", price: 20 })
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toBe(1);
  expect(tickets[0].price).toBe(20);
});

it("Publishes the create ticket event", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "title", price: 20 })
    .expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
