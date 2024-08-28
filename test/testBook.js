const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../Backend/server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("POST /books/upload", () => {
  it("should add a book", (done) => {
    chai
      .request(server)
      .post("/books/upload")
      .set("Authorization", `Bearer <jwt_token>`)
      .send({
        title: "The Art Of War",
        author: "Sun Tzu",
        image:
          "https://www.google.com/imgres?q=art%20of%20war%20iamge&imgurl=https%3A%2F%2Fd28hgpri8am2if.cloudfront.net%2Fbook_images%2Fonix%2Fcvr9781626860605%2Fthe-art-of-war-9781626860605_hr.jpg&imgrefurl=https%3A%2F%2Fwww.simonandschuster.com%2Fbooks%2FThe-Art-of-War%2FSun-Tzu%2FWord-Cloud-Classics%2F9781626860605&docid=k0_ZDFFyEQsLOM&tbnid=MA9hkPRmgxgn4M&vet=12ahUKEwjx4OqTgpaIAxUpMlkFHV0QOiAQM3oECGMQAA..i&w=1400&h=2120&hcb=2&ved=2ahUKEwjx4OqTgpaIAxUpMlkFHV0QOiAQM3oECGMQAA",
        newPrice: 19.99,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("title", "Test Book");
        done();
      });
  });
});
