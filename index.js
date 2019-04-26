var express = require('express');
var app = express();
var request = require('request');
var Podio = require('podio-js').api;
var domain = require('domain');

var podio = new Podio({
    authType: 'password',
    clientId: 'voluntariosdsf',
    clientSecret: 'fUvYAYWXgitvE0y02txILmNR7I0pR6fr1Spjus7xWIDUeYjDgHTq7dDizcfTtTyj'
});
var username = 'huascarm@gmail.com';
var password = 'Pompeyista1982?';

podio.isAuthenticated().then(function () {
    // ready to make API calls
    console.log('AUTH CORRECTA');
}).catch(function (err) {

    var reqdomain = domain.create();

    reqdomain.on('error', function (e) {
        console.log('Error:', e.name);
        console.log('Error description:', e.message.error_description);
        console.log('HTTP status:', e.status);
        console.log('Requested URL:', e.url);

        console.log('error', { description: e.message });
    });

    reqdomain.run(function () {
        podio.authenticateWithCredentialsForOffering(username, password, null, function () {
            
            //features ();
            
            podio.request('POST', '/search/app/22569419/',{
                query:'304640601',
                ref_type:"item"
            })
            .then(function (data) {
                podio.request('GET', `/item/${data[0].item.item_id}/reference/`)
                .then(function (data2) {
                    console.log(data2);
                }).catch(function (err) {
                    console.log('Error al GET', err)
                });
            }).catch(function (err) {
                console.log('Error al GET', err)
            });

            console.log('AUTH CORRECTA 2');
        });
    });
});

function features (){
    podio.request('GET', '/app/22569419')
    .then(function (data) {
        console.log('HUASCAR APP DATA: ',data);
    }).catch(function (err) {
        console.log('Error al GET', err)
    });
}








/*

"filters": { 177178684: '10869072' }
voluntario=188367173

un voluntario en particular: 304640601










/**   platform.isAuthenticated().then(function () {
    console.log('AUT CORRECTA')
  }).catch(function (err) {
    console.log(err)
  })


  if (platform.isAuthenticated()) {
    platform.request('GET', '/tasks').then(function(data, err) {
        console.log('SUC',data);
        console.log('ERR',err);
     }).catch(function (err) {
        console.log('Error al GET',err)
      });
  } else {
    platform.authenticateWithCredentials(username, password, function() {
        platform.request('GET', '/app/22723503').then(function(data, err) {
            console.log('SUC',data);
            console.log('ERR',err);
         });
    });
  }

request.post(
    'https://podio.com/oauth/token',
    {
        json: {
            client_id: "voluntariosdsf",
            grant_type: "app",
            app_id: "22723503",
            app_token: "59a2fae27eab4d488086db9bdd1627ab",
            redirect_uri: "https://voluntarios.criptoanalisis.org/dashboard",
            client_secret: "fUvYAYWXgitvE0y02txILmNR7I0pR6fr1Spjus7xWIDUeYjDgHTq7dDizcfTtTyj"
        }
    },
    function (error, response, body) {
        console.log('response', response.statusCode);
        console.log('error', error);

        console.log(body);

    }
);*/