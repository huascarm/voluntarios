import dbConnection from '../../config/mysqlConnection';
const conn = dbConnection();
module.exports = app => {
    app.post('/user', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        if(req.query.iduser){
            consulta( 'Select idOperator from users where id =', req.query.iduser)
            .then(data => {
                return consulta( 'Select online from operators where id =', data[0].idOperator)
            }).then( data => {
                res.json(data)
            }).catch( err => {
                res.json({error : err})
            })
        }else{
            res.json({error : 'parametro no válido'})
        }
    })
}

function consulta( sql, id){
    return new Promise ((res, error) => {
        conn.query( sql + id , (err, result) =>{
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