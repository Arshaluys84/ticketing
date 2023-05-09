import request from "supertest"
import { app } from "../../app"

it("expects to log out ", async () =>{
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "pass"
    })
    .expect(201);

     await request(app)
    .post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "pass"
    })
    .expect(200)

    const response = await request(app)
    .post("api/users/signout")
    .send({})
   
        
})