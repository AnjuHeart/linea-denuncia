const express = require('express');
const router = express.Router();
const db = require('../db');

//GET TODOS LAS EMPRESAS
router.get('/', (req, res) => {
    db.any("SELECT * FROM denuncias ORDER BY id ASC")
        .then(rows => {
            res.json(rows);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

//GET UNA SOLA EMPRESA
router.get('/:id', (req, res) => {
    const id = req.params.id
    db.any("SELECT * FROM denuncias WHERE id = $1", [id])
        .then(rows => {
            res.json(rows);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

router.post('/', (req, res) => {
    console.log(req.body);
    let { empresa, pais, estado, anonimo, nombre_denunciante, correo_denunciante,
        telefono_denunciante, detalles_text, fecha, contraesna } = req.body;
    db.any("SELECT * FROM denuncias ORDER BY id ASC")
        .then(rows => {
            const siguienteFolio = rows.length + 1;
            const cantidadDeCeros = 5 - siguienteFolio.toString.length;
            var nuevoFolio = "";
            for (let i = 0; i < cantidadDeCeros; i++) {
                nuevoFolio += "0";
            }
            nuevoFolio += siguienteFolio;

            res.send(nuevoFolio);

            console.log(nuevoFolio);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

module.exports = router;