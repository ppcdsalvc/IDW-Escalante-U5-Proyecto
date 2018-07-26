const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');
// var async = require('async');

let _noticias;

const getAll = (req, res) => {
    _noticias.find({})
        .sort({}).
        populate('user')
        .exec(handler.handleMany.bind(null, 'noticia', res));
};

const getById = (req, res) => {
   // const id = req.params.id;

    const {id} = req.params; //destructor

    //console.log(id.toString().legth);

    if(id.toString().length!=24){
        res.status(400);
        res.json({err:"Identificador inválido"});
    }else{
    _noticias.find({_id: id})
        .sort({})
        .populate('user')
        .exec(handler.handleOne.bind(null, 'noticias', res));
}
_noticias.find({_id: id})
.sort({})
         .exec((error, doc)=>{
            if(error){
                res.status(400);
                res.json({err:"Identificador inválido"});
            }else{ 
                var code = qr.image(doc, {type: 'png'});
                res.status(200);
                res.type('png');
                code.pipe(res);
         }
});
}

const deleteById = (req, res) => {

     const id = req.params.id;

     _noticias.remove({_id:id}, (err,data)=>{
         if(err){
             res.status(400);
             res.json({msg:"No se pudo realizar la operacion, intente nuevamente"});
         }else{
             res.status(200);
             res.json({msg:"La noticia se elimino correctamente"});
         }
 });
}

const createNoticia = (req, res) => {
    const noticias = req.body;

    _noticias.create(noticias)
        .then(
            (data) => {
                res.status(200);
                res.json({msg:"Noticia creada correctamente", data:data});
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

    _noticias.findOneAndUpdate(query, newData, (err,data)=>{
        if(err){
            res.status(400);
            res.json({msg:"No se pudo realizar la operacion, intente nuevamente"});
        }else{
            res.status(200);
            res.json({msg:"La noticia se modifico correctamente"});
        }
});
}

module.exports = (Noticias) => {
    _noticias = Noticias;
    return ({
        getAll,
        getById,
        deleteById,
        createNoticia,
        updateById
    });
}