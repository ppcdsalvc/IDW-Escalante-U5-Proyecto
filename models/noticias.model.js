const mongoose = require('mongoose');

let noticiasSchema = new mongoose.Schema({
  titulo:{
    type: String,
    require: true
},
autor:{
    type: String
},
nota:{
    type: String,
    require: true
},
fecha:{
    type: String,
    require: true
},
activo:{
    type:Boolean, 
    require:true,
    default:true
},
foto:{
    type:String,
    require:true
},
user:{ 
    type: mongoose.Schema.Types.ObjectId, ref:'UserSchema'
}
});

const noticiasModel = mongoose.model('NoticiasSchema', noticiasSchema, 'noticias');

module.exports = noticiasModel;