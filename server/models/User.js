const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: String,
    email: String,
    password: String,
    name: String,
    role: String,
    departement: String
})

module.exports = User = mongoose.model("users", UserSchema);


