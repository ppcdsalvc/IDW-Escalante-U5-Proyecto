const router = require('express').Router();

module.exports = (wagner) => {

    const userCtrl = wagner.invoke((User) =>
        require('../controllers/user.controller')(User));

    router.get('/', (req, res) =>
        userCtrl.getAll(req, res));
    
    router.get('/:id', (req, res) =>
        userCtrl.getById(req, res));
    router.delete('/:id', (req, res) =>
        userCtrl.deleteById(req, res));

    router.post('/', (req, res) =>
        userCtrl.createUser(req, res));

    router.put('/:id', (req, res) =>
        userCtrl.updateById(req, res));

        
    router.get('/:email/:password', (req, res) =>
        userCtrl.getByEmailPass(req, res));
    

    return router;
}