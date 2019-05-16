import PodioConfig from '../../config/podioConfig'
module.exports = app => {
    app.get('/login', function (req, res) {
        authVoluntario(req.query.id)
            .then(d => {
                var itemId;
                try {
                    itemId = d[0].item.app_item_id
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
                console.log(error);
                res.json({ error: 'Error del Servidor' })
            })
    });

    app.get('/casos', function (req, res) {
        getCasos(req.query.token).then(
            data => {
                res.json(data);
            }
        ).catch(error => {
            console.log(error);
            res.json({ error: 'Error del Servidor' })
        })
    });

    app.get('/download', function (req, res) {
        download2(req.query.id).then(
            data => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "X-Requested-With");
                res.header('content-type', 'text/pdf');
                res.send(data);
            }
        );
    });

}

function authVoluntario(ci) {
    return new Promise((resolver, rechazar) => {
        PodioConfig().
            then((podio) => {
                podio.request('POST', '/search/app/22569419/', {
                    query: ci.toString(),
                    ref_type: "item"
                })
                .then(function (data) {
                    try {
                        resolver(data)
                    } catch (error) {
                        rechazar(error)
                    }
                }).catch(err => {
                    rej(err)
                });
            }).catch(e => {
                rechazar(e);
            })
    })
}

function getCasos(ci) {
    return new Promise((resolver, rechazar) => {
        PodioConfig().
        then((podio) => {
            
            podio.request('POST', '/search/app/22569419/', {
                query: ci.toString(),
                ref_type: "item"
            }).then(function (data) {
                podio.request('GET', `/item/${data[0].item.item_id}/reference/`)
                    .then(function (data2) {
                        try {
                            var casos = data2.map(e => {
                                return podio.request('GET', `/item/${e.items[0].item_id}`)
                                    .then(r => {
                                        var obj = {}
                                        obj.type = r.app.name;
                                        obj.id = r.item_id
                                        obj.status = r.status
                                        obj.titulo = r.app_item_id_formatted
                                        if (obj.type == 'MEP') {
                                            obj.documentos = r.files
                                            obj.especifique = r.fields[10].values[0].value
                                            obj.cliente = r.fields[14].values[0].value
                                        } else if (obj.type == 'CCSS') {
                                            obj.documentos = r.files
                                            obj.especifique = r.fields[9].values[0].value.text
                                            obj.cliente = r.fields[15].values[0].value
                                        }

                                        return obj
                                    })
                            })

                            Promise.all(casos).then(
                                res => {
                                    resolver(res)
                                }
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

        }).catch(e => {
            rechazar(e);
        })
    })
}

function download(){
    return new Promise((resolver, rechazar) => {
        PodioConfig()
        .then((podio) => {
            var url = 'https://files.podio.com/' + id + '?oauth_token=' + podio.authObject.accessToken;
            https.get(url, function (res) {
                var chunks = [];
                res.on('data', function (chunk) {
                    console.log('start');
                    chunks.push(chunk);
                });
        
                res.on('end', function () {
                    var data = new Buffer.concat(chunks);
                    resolver(data);
                });
            });
        }).catch(e => {
            rechazar(e);
        })
    })
}

/*
un voluntario en particular: 304640601
*/