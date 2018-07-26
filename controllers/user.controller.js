const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');

var qr = require('qr-image');
var express = require('express');
var router = express.Router();

var fs = require('fs');
const path = require('path');
// var async = require('async');

let _user;

const getAll = (req, res) => {
    _user.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'users', res));
};

const getById = (req, res) => {
   // const id = req.params.id;

    const {id} = req.params; //destructor

    //console.log(id.toString().legth);

    if(id.toString().length!=24){
        res.status(400);
        res.json({err:"Identificador inválido"});
    }else{
    _user.find({_id: id})
        .sort({})
        .exec(handler.handleOne.bind(null, 'user', res));
}
};

const deleteById = (req, res) => {

     const id = req.params.id;

     _user.remove({_id:id}, (err,data)=>{
         if(err){
             res.status(400);
             res.json({msg:"No se pudo realizar la operacion, intente nuevamente"});
         }else{
             res.status(200);
             res.json({msg:"El usuario se elimino correctamente"});
         }
 });
}

const createUser = (req, res) => {
    const user = req.body;

    _user.create(user)
        .then(
            (data) => {
                res.status(200);
                res.json({msg:"Usuario creado correctamente", data:data});
            }
        )
        .catch(
            (err) =>{
                res.status(400);
                res.json({msg:"Algo va mal!!", data:err});
            }
        )
};
 

const updateById = (req, res) => {

    const id = req.params.id;   
    const newData = req.body;

    const query = {_id:id};

    _user.findOneAndUpdate(query, newData, (err,data)=>{
        if(err){
            res.status(400);
            res.json({msg:"No se pudo realizar la operacion, intente nuevamente"});
        }else{
            res.status(200);
            res.json({msg:"El usuario se modifico correctamente"});
        }
});
}


const getByEmailPass = (req, res) => {
    const email = req.params.email;
    const password = req.params.password;    
    _user.find({email: email, password:password})
        .sort({})
        .exec(handler.handleOne.bind(null, 'user', res));

};



module.exports = (User) => {
    _user = User;
    return ({
        getAll,
        getById,
        getByEmailPass,
        deleteById,
        createUser,
        updateById
    });
}