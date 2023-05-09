import request from "supertest"
import { app } from "../../app"

it("get currentUser", async ()=> {
  const cookie = await global.signin()

    const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200)

    expect(response.body.currentUser.email).toEqual("test@test.com")
    
    
})

it("get currentUser to be null", async ()=> {
    const response = await request(app)
      .get("/api/users/currentuser")
      .send()
       
      expect(response.body.currentUser).toEqual(null)  
      
  })