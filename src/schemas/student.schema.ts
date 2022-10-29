import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, min: 3, max: 23},
    roll: {type: Number, min: 0},
    class: {type: String},
    father: String,
    mother: String,
    address: String
})

export const studentModel = mongoose.model('Student', studentSchema);