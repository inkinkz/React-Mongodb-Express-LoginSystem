var request = require("supertest");
var app = require("../app");

describe("Login with random account", function() {
  it("Should not be able to login (401 Unauthorized)", function(done) {
    request(app)
      .post("/Users/login")
      .send({
        // random email and password
        email: "thisShouldFailed",
        password: "sure"
      })
      .expect(401, done);
  });
});
