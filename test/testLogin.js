const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../Backend/server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("POST /auth/login", () => {
  it("should log in and return a JWT token", (done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        email: "bruka77@gmail.com",
        password: "816834",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("token");
        done();
      });
  });
});
