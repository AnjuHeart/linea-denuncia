const express = require('express');
const router = express.Router();
const db = require('../db');

//GET TODOS LAS DENUNCIA
router.get('/', (req, res) => {
    db.any("SELECT * FROM denuncias ORDER BY id ASC")
        .then(rows => {
            res.json(rows);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

//GET UNA SOLA DENUNCIA
router.get('/:folio', (req, res) => {
    const folio = req.params.folio;

    let { contrasena } = req.query;

    db.any("SELECT * FROM denuncias WHERE folio = $1", [folio])
        .then(rows => {
            if(rows[0].contrasena == contrasena){
                const data = {
                    folio: folio,
                    detalles: rows[0].detalles,
                    estado: rows[0].estado,
                    comentarios: rows[0].comentarios
                }
                res.status(200).send(data);
            } else{
                res.status(401).send("La contraseña no es correcta");
            }
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