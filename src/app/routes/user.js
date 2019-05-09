import dbConnection from '../../config/mysqlConnection';
const conn = dbConnection();
module.exports = app => {
    app.post('/operator/:id', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        consulta( 'Select idOperator from users where id =', req.params.id)
        .then(data => {
            return consulta( 'Select online from operators where id =', data[0].idOperator)
        }).then( data => {
            res.json(data)
        }).catch( err => {
            res.json({error : err})
        })
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

/**
 * 
=============== on res.send 
X-Powered-By →Express
Content-Type →application/json; charset=utf-8
Content-Length →161
ETag →W/"a1-d3z3obFD73A8KXTWuxHqgyDxUzQ"
Date →Thu, 09 May 2019 17:00:00 GMT
Connection →keep-alive
=============== con res.json
X-Powered-By →Express
Content-Type →application/json; charset=utf-8
Content-Length →161
ETag →W/"a1-d3z3obFD73A8KXTWuxHqgyDxUzQ"
Date →Thu, 09 May 2019 17:01:45 GMT
Connection →keep-alive
 */