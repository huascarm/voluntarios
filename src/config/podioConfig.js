var Podio = require('podio-js').api;
var domain = require('domain');

module.exports = () => {
    return new Promise((resolver, rechazar) => {
        const podio = new Podio({
            authType: 'password',
            clientId: 'voluntariosdsf',
            clientSecret: 'fUvYAYWXgitvE0y02txILmNR7I0pR6fr1Spjus7xWIDUeYjDgHTq7dDizcfTtTyj'
        });
        var username = 'huascarm@gmail.com';
        var password = 'Pompeyista1982?';

        podio.isAuthenticated().then(function () {
            resolver(podio)
        }).catch(function (err) {
            var reqdomain = domain.create();
            reqdomain.on('error', function (e) {
                rechazar(e)
            });
            reqdomain.run(function () {
                podio.authenticateWithCredentialsForOffering(username, password, null, function () {
                    resolver(podio)
                });
            });
        });
    })
}