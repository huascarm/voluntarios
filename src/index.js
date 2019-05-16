//importo las configuraciones del server
import app from './config/server';

//rutas y verbos hacia el server
require('./app/routes/user')(app);
require('./app/routes/podio')(app);

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.set('transports', ['websocket']);
io.on("connection", socket => {
  console.log('user connected');

  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  let contador=0;
  setInterval(() => {
      socket.emit('caso', contador);
      contador++;
  }, 1000);
})
//inicio el server
http.listen(app.get('port'), ()=>{
    console.log('El server corre en el puerto: ', app.get('port'));
})
