import request from "supertest"
import { app } from "../../app"
import { natsWrapper } from "../../nats-wrapper"
import { createId } from "../../test/helpers/createId"

it("return 404 if the id does not exist", async () =>{
    const id = createId()
    await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
        title: "titles",
        price: 10
    })
    .expect(404)
})

it("return 401 if the user is not autherized", async () =>{
    const id = createId()
    await request(app)
    .put(`/api/tickets/${id}`)
    .send({
        title: "titles",
        price: 10
    })
    .expect(401)
})

it("return 401 when onother user tries to update", async()=>{
    const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
        title:"title",
        price: 1
    })

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
        title: "title2",
        price:2
    }).expect(401)
})

it("return 401 when onother user tries to update", async()=>{
    const cookie = global.signin()
    const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
        title:"title",
        price: 1
    })

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
        price:2
    }).expect(400)

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
        title:"title5"
    }).expect(400)
})

it("return 200 when title and price are filled", async()=>{
    const cookie = global.signin()
    const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
        title:"title",
        price: 1
    })
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
        title:"title5",
        price: 1
    }).expect(200)

    const ticket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()

    expect(ticket.body.title).toEqual("title5")
    expect(ticket.body.price).toEqual(1)
})

it("update event to be called", async() =>{
    const cookie = global.signin()
    const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
        title:"title",
        price: 1
    })
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
        title:"title5",
        price: 1
    }).expect(200)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
})