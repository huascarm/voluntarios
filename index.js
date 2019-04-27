var express = require('express');
var app = express();
var Podio = require('podio-js').api;
var domain = require('domain');
var https = require('https')
var podio;
const port = process.env.PORT || 3000

app.get('/login', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    authVoluntario(req.query.id)
    .then(d => {
        var itemId;
        try {
            itemId =  d[0].item.app_item_id   
        } catch (error) {
            res.json({ error: 'Usuario no válido' });
            return;
        }

        if (itemId == req.query.pass) {
            res.json({ hash: req.query.id })
        } else {
            res.json({ error: 'Contraseña no válida' })
        }
    }).catch(error => {
        res.json({ error: 'Error del Servidor' })
    })
})

app.get('/casos', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    getCasos(req.query.token).then(
        data => {
            res.json(data);
        }
    );
});

app.get('/download', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    download2(req.query.id).then(
        data => {
            res.send(data);
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at port ` + port);
});

function getCasos(ci) {
    return new Promise((resolver, rechazar) => {
        
        podio= new Podio({
            authType: 'password',
            clientId: 'voluntariosdsf',
            clientSecret: 'fUvYAYWXgitvE0y02txILmNR7I0pR6fr1Spjus7xWIDUeYjDgHTq7dDizcfTtTyj'
        });
        var username = 'huascarm@gmail.com';
        var password = 'Pompeyista1982?';

        podio.isAuthenticated().then(function () {
            // ready to make API calls
            console.log('AUTH CORRECTA 1');
        }).catch(function (err) {

            var reqdomain = domain.create();

            reqdomain.on('error', function (e) {
                rechazar(e)
            });

            reqdomain.run(function () {
                podio.authenticateWithCredentialsForOffering(username, password, null, function () {

                    //features ();

                    podio.request('POST', '/search/app/22569419/', {
                        query: ci.toString(),
                        ref_type: "item"
                    })
                        .then(function (data) {
                            podio.request('GET', `/item/${data[0].item.item_id}/reference/`)
                                .then(function (data2) {
                                    try {
                                        var casos = data2.map(e =>{
                                            return podio.request('GET', `/item/${e.items[0].item_id}`)
                                            .then( r => {
                                                var obj = {}
                                                obj.type = r.app.name;
                                                obj.id = r.item_id
                                                obj.status = r.status
                                                obj.titulo = r.app_item_id_formatted
                                                if(obj.type == 'MEP'){
                                                    obj.documentos = r.files
                                                    obj.especifique = r.fields[10].values[0].value
                                                    obj.cliente = r.fields[14].values[0].value
                                                }else if(obj.type == 'CCSS'){
                                                    obj.documentos = r.files
                                                    obj.especifique = r.fields[9].values[0].value.text
                                                    obj.cliente = r.fields[15].values[0].value
                                                }
                                                
                                                return obj
                                            })
                                        })

                                        Promise.all(casos).then(
                                            res => {
                                                resolver(res)}
                                        )
                                    } catch (error) {
                                        rechazar(error);
                                    }
                                    
                                }).catch(function (err) {
                                    rechazar(err);
                                });
                        }).catch(function (err) {
                            rechazar(err);
                        });
                });
            });
        });
    })
}

function authVoluntario(ci) {
    return new Promise((resolver, rechazar) => {
        podio= new Podio({
            authType: 'password',
            clientId: 'voluntariosdsf',
            clientSecret: 'fUvYAYWXgitvE0y02txILmNR7I0pR6fr1Spjus7xWIDUeYjDgHTq7dDizcfTtTyj'
        });
        var username = 'huascarm@gmail.com';
        var password = 'Pompeyista1982?';

        podio.isAuthenticated().then(function () {
            voluntario(ci).then( d => {
                resolver(d)
            }).catch(e => rechazar(e))
        }).catch(function (err) {

            var reqdomain = domain.create();

            reqdomain.on('error', function (e) {
                rechazar(e)
            });

            reqdomain.run(function () {
                podio.authenticateWithCredentialsForOffering(username, password, null, function () {
                    voluntario(ci).then( d => {
                        resolver(d)
                    }).catch(e => rechazar(e))
                });
            });
        });
    })

}

function voluntario(ci) {
    return new Promise((res, rej) => {
        podio.request('POST', '/search/app/22569419/', {
            query: ci.toString(),
            ref_type: "item"
        })
        .then(function (data) {
            try {
                res(data)
            } catch (error) {
                rej(error)
            }
        }).catch(err => {
            rej(err)
        });
    })
}

function features() {
    podio.request('GET', '/app/22569419')
        .then(function (data) {
            console.log('HUASCAR APP DATA: ', data);
        }).catch(function (err) {
            console.log('Error al GET', err)
        });
}

function download2(id){
    return new Promise((resolver, rechazar) => {
        podio= new Podio({
            authType: 'password',
            clientId: 'voluntariosdsf',
            clientSecret: 'fUvYAYWXgitvE0y02txILmNR7I0pR6fr1Spjus7xWIDUeYjDgHTq7dDizcfTtTyj'
        });
        var username = 'huascarm@gmail.com';
        var password = 'Pompeyista1982?';

        podio.isAuthenticated().then(function () {
            
        }).catch(function (err) {

            var reqdomain = domain.create();

            reqdomain.on('error', function (e) {
                rechazar(e)
            });

            reqdomain.run(function () {
                podio.authenticateWithCredentialsForOffering(username, password, null, function () {
                    var url = 'https://files.podio.com/'+id+'?oauth_token='+podio.authObject.accessToken;
                    const request = require('request');
                    request(url, { json: true }, (err, res) => {
                        if (err) { rechazar(err) }
                        resolver(res);
                    });
                });
            });
        });
    })
}

/*
un voluntario en particular: 304640601
*/