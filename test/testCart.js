const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../Backend/server");
const User = require("../Backend/models/userModel");
const Book = require("../Backend/models/booksModel");

chai.use(chaiHttp);
const { expect } = chai;

describe("Add to Cart API", () => {
  let token, bookId;

  before(async () => {
    await User.deleteMany({});
    await Book.deleteMany({});
    const user = new User({
      email: "bruka77@gmail.com",
      password: "816834",
    });
    await user.save();

    const book = new Book({
      title: "Test Book",
      author: "John Doe",
      price: 10,
      imageUrl:
        "https://www.google.com/imgres?q=books%20image%2050%20laws%20of%20power&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F41PKLR0SVvL._SL500_.jpg&imgrefurl=https%3A%2F%2Fwww.audible.co.uk%2Fpd%2FThe-50th-Law-Audiobook%2FB0BH9CDHG2&docid=oXGZXoNI9yFNRM&tbnid=Bw8cZehNEIziqM&vet=12ahUKEwiBgfPhgJaIAxVb1wIHHWN9HXYQM3oECFoQAA..i&w=500&h=500&hcb=2&ved=2ahUKEwiBgfPhgJaIAxVb1wIHHWN9HXYQM3oECFoQAA",
    });
    await book.save();
    bookId = book._id;

    // Log in to get a JWT token
    const res = await chai
      .request(app)
      .post("/auth/login")
      .send({ email: "bruka77@gmail.com", password: "816834" });

    token = res.body.token;
  });

  it("should add a book to the cart", async () => {
    const res = await chai
      .request(app)
      .post("/cart/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ bookId });

    expect(res).to.have.status(200);
    expect(res.body.message).to.equal("Book added to cart");
  });
});
