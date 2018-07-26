const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = (wagner) => {
  mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/usuarios',{
    useMongoClient: true
  });

  wagner.factory('db', () => mongoose);
  const User = require('./user.model');
  const Noticias = require('./noticias.model');



  const models = {
    User,
    Noticias
   
  };

  _.each(models, (v, k) => {
    wagner.factory(k, () => v);
  });
}