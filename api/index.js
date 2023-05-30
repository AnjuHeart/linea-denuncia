const express = require('express');
const router = express();
const db = require('../db');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

//  RUTAS API PARA      EMPRESAS
const apiEmpresas = require('./empresas');
router.use('/empresas', apiEmpresas);

router.get('/*', (req,res) =>{
    res.status(400).send('Request not managed properly');
});

module.exports = router;