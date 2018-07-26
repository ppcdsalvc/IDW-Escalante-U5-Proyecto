const router = require('express').Router();

module.exports = (wagner) => {

    const noticiasCtrl = wagner.invoke((Noticias) =>
        require('../controllers/noticias.controller')(Noticias));

    router.get('/', (req, res) =>
        noticiasCtrl.getAll(req, res));
    
    router.get('/:id', (req, res) =>
       noticiasCtrl.getById(req, res));
     
    router.delete('/:id', (req, res) =>
       noticiasCtrl.deleteById(req, res));

    router.post('/', (req, res) =>
       noticiasCtrl.createNoticia(req, res));

    router.put('/:id', (req, res) =>
       noticiasCtrl.updateById(req, res));
        
    return router;
}