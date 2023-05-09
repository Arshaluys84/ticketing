import request from "supertest"
import { Ticket } from "../../models/ticket"
import { app } from "../../app"

const createTicket = () =>{
 return request(app)
  .post("/api/tickets")
  .set("Cookie", global.signin())
  .send({
    title: "title",
    price: 20
  })
}

it("shows tickets", async () =>{

    await createTicket()
    await createTicket()
    await createTicket()

    const tickets = await request(app)
    .get("/api/tickets")
    .send({})
    .expect(200)
         
    expect(tickets.body.length).toEqual(3)
})

