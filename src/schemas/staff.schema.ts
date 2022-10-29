import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: {type: String, required: true},
    designation: {type: String, required: true, default: "teacher"},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

export const staffModel = mongoose.model('Staff', staffSchema);