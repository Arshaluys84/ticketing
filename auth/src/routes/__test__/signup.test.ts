import request  from "supertest";
import { app } from "../../app"

it("send 201 after successfull signup", async () =>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "pass"
    })
    .expect(201)
})

it("send 400 after invalid email", async () =>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "testtest.com",
        password: "pass"
    })
    .expect(400)
})

it("send 400 after invalid password", async () =>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "pas"
    })
    .expect(400)
})

it("send 400 after missing email or password", async () =>{
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        
    })
    .expect(400)

    return request(app)
    .post("/api/users/signup")
    .send({
        
        password: "passs"
    })
    .expect(400)

})

it("disallows signup with dublicate email", async () =>{
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "pass"
    })
    .expect(201)
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "pass"
    })
    .expect(400)
})

it("expects cookie in the header", async () =>{
    const response = await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "pass"
    })
    .expect(201)
    
    expect(response.get("Set-Cookie")).toBeDefined()
})