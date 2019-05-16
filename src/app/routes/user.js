const multer = require('multer');
const upload = multer();
import dbConnection from '../../config/mysqlConnection';
const voluntarios = dbConnection().voluntarios;
const tse = dbConnection().tse;

module.exports = app => {
    app.post('/user', upload.none(), (req, res) => {
        if(req.body.iduser){
            consulta(voluntarios, 'Select idOperator from users where id =', req.body.iduser)
            .then(data => {
                return consulta(voluntarios, 'Select online from operators where id =', data[0].idOperator)
            }).then( data => {
                res.json(data)
            }).catch( err => {
                res.json([{'online':0}])
            })
        }else{
            res.json({error : 'parametro no válido'})
        }
    })

    app.get('/cedulas', (req, res) => {
        if(req.query.caracteres){
            consultaLibre(tse, `SELECT * FROM ciudadanos WHERE cedula LIKE '%${req.query.caracteres}%'`)
            .then(data => {
                res.json(data);
            }).catch( err => {
                res.json(err)
            })
        }
    })
}

function consulta(db, sql, id){
    return new Promise ((res, error) => {
        db.query( sql + id , (err, result) =>{
            if(err){
                error(err);
            }else if(result.length>0){
                res(result)
            }else{
                error('Registro no encontrado')
            }
        });
    })
}
function consultaLibre(db, sql){
    return new Promise ((res, error) => {
        db.query( sql , (err, result) =>{
            if(err){
                error(err);
            }else if(result.length>0){
                res(result)
            }else{
                error('Registro no encontrado')
            }
        });
    })
}