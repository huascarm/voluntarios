import Express from 'express';
import bodyParser from 'body-parser';

//iniciamos, configuramos y middleware
let app = new Express();
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.urlencoded({extended: false}))

module.exports = app;