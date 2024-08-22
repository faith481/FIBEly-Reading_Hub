require('dotenv').config(); 

const mongoose = require('mongoose');
const Book = require('./models/booksModel'); // Adjust the path to your Book model
const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    return Book.updateMany({}, { $set: { price: 80 } }); // Setting a default price
  })
  .then(() => {
    console.log('Books updated with default price');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error updating books:', err);
  });
