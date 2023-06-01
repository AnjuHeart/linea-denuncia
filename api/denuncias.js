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
    let { empresa, pais, estado, anonimo, nombre_denunciante, correo_denunciante,
        telefono_denunciante, detalles_text, fecha, contrasena, num_centro } = req.body;
    db.any("SELECT * FROM denuncias ORDER BY id ASC")
        .then(rows => {
            const siguienteFolio = rows.length + 1;
            const cantidadDeCeros = 5 - siguienteFolio.toString.length;
            var nuevoFolio = "";
            for (let i = 0; i < cantidadDeCeros; i++) {
                nuevoFolio += "0";
            }
            nuevoFolio += siguienteFolio;

            db.any(`INSERT INTO denuncias (id, empresa_key, pais_key, estado_key, folio,
                 contrasena,fecha_evento, detalles, estado, comentarios, denunciante_nombre,
                 denunciante_correo, denunciante_telefono, numero_centro) 
                 VALUES (DEFAULT, $1:raw, $2:raw, $3:raw, $4, $5, $6, $7, $8, '{}', $9, $10, $11, $12:raw);`,
                [empresa,pais,estado,nuevoFolio,contrasena,fecha,detalles_text,"En proceso", nombre_denunciante,
                correo_denunciante,telefono_denunciante,num_centro])
            .then(response =>{
                res.status(200).send(nuevoFolio);
            })
            .catch(error =>{
                console.log(error);
                res.status(500).send(error);
            });
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

module.exports = router;