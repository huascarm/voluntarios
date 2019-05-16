import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//iniciamos, configuramos y middleware
let app = new Express();
const corsOptions = {
  origin: 'http://localhost:4200'
}
app.use(cors());

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.urlencoded({extended: true}))

module.exports = app;