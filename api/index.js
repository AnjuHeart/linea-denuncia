const express = require('express');
const router = express();
const db = require('../db');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

//  RUTAS API PARA      EMPRESAS
const apiEmpresas = require('./empresas');
router.use('/empresas', apiEmpresas);

//  RUTAS API PARA      PAISES
const apiPaises = require('./paises');
router.use('/paises', apiPaises);

//  RUTAS API PARA      ESTADOS
const apiEstados = require('./estados');
router.use('/estados', apiEstados);

router.get('/*', (req,res) =>{
    res.status(400).send('Request not managed properly');
});

module.exports = router;