const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true
},
email:{
    type: String,
    require: true,
    match: /.+@.+\..+/,
    lowercarse: true
},
password:{
    type: String,
    require: true
}
});

const userModel = mongoose.model('UserSchema', userSchema, 'usuarios');

module.exports = userModel;