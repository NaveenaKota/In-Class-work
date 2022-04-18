const express = require('express');
const app = express.Router();
const {requireAuth} = require('./models/user');

const userModel = require('../models/user');
const CREATED_STATUS = 201;

app
.get('/', (req, res) => {
    userModel.getList()
    .then(users => {
        res.send(users);
    }).catch(next);
})

.get('/:id', (req, res) => {
    //const user = userModel.get(req.params.id);
    //res.send(user);
    userModel.get(req.params.id)
    .then(users => {
        res.send(users);
    }).catch(next);
    })

    .post('/', (req, res, next) => {
        userModel.create(req.body)
        .then(user => {
            res.status(CREATED_STATUS).send(user);
        }).catch(next);
    })

    .delete('/:id', requireAuth,  (req, res) => {

        //const user = userModel.remove(req.params.id);

        //res.send({ success: true, errors: [], data: user });
        userModel.remove(req.params.id)
        .then(user => {
            res.send({ success: true, errors: [], data: user });
        }).catch(next);



    })
    .patch('/:id', (req, res) => {

        const user = userModel.update(req.params.id, req.body );

        res.send({ success: true, errors: [], data: user });

    })
    .post('/login', (req,res,next)=> {
        userModel.login(req.body.email, req.body.password)
        .then(user=> {
            res.send(user);
        }).catch(next);
    })
    .post('./seed', (req, res, next) => {
        userModel.seed()
        .then(x => {
            res.send({success:true, errors: [], data: x.insertedIds});
        }).catch(next);
    })

module.exports = app;