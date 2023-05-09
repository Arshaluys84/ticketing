import request from "supertest"
import { app } from "../../app"
import { createId } from "../../test/helpers/createId"

it("returns 404 if ticket is not defined", async ()=>{
    const id = createId()
    await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404)
})
it("returns 404 if ticket is not defined", async ()=>{
    const title = "title"
    const price = 20

    const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
        title,
        price
    }).expect(201)

    const ticketRes = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send({})

    expect(ticketRes.body.title).toEqual(title)
    expect(ticketRes.body.price).toEqual(price)

})