const mongoose = require('mongoose');
const validator = require('validator');

const studentSch = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
            type: String,
            required: true,
            unique: [true, "Emailid already taken"],
            validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
        phone: {
            type: Number,
            min: 10,
            required:true
    },
    address: {
        type: String,
        required:true
    }
    
})


//collections
const Student = new mongoose.model('Student', studentSch);
module.exports = Student;