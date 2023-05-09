import request from "supertest";
import { Ticket } from "../../models/ticket";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

it("returns not 404 error", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can create ticket if is authorized", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("can create ticket if is authorized", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("ticket is not empty", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it("creates ticket succesfully", async () => {
  const tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "ticket",
      price: 20,
    })
    .expect(201);

  const ticketsAfter = await Ticket.find({});
  expect(ticketsAfter.length).toEqual(1);
  expect(ticketsAfter[0].price).toEqual(20);
  expect(ticketsAfter[0].title).toEqual("ticket");
});

it("publish mock works", async ()=>{
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "ticket",
      price: 20,
    })
    .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled()
})