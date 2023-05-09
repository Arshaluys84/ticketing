import request  from "supertest";
import { app } from "../../app"


it("send 400 signin non existing email", async () =>{
    return request(app)
    .post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "pass"
    })
    .expect(400)
})

it("send 200 after login", async () =>{
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "pass"
    })
    .expect(201)

    await request(app)
    .post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "pas1s"
    })
    .expect(400)

})

it("send 200 after login", async () =>{
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "pass"
    })
    .expect(201)

    const response = await request(app)
    .post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "pass"
    })
    .expect(200)

    expect(response.get("Set-Cookie")).toBeDefined()

})