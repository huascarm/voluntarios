//importo las configuraciones del server
import app from './config/server';

//rutas y verbos hacia el server
require('./app/routes/user')(app);
require('./app/routes/podio')(app);

//inicio el server
app.listen(app.get('port'), ()=>{
    console.log('El server corre en el puerto: ', app.get('port'));
})
