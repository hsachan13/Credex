var Promise = require('bluebird');

/*Promise.delay(3000,'First').then(())*/
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

const fruitsSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    reviw: String
});
const Fruit = mongoose.model("Fruit", fruitsSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid."
});
fruit.save().then(() => console.log("Succesfully added")).catch((err) => console.log(err));