const app = require('express')();
const server = require('http').Server(app);

const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
      credentials: true
    }});

const cors= require('cors');
app.use(cors());
server.listen(3001);
 
io.on('connection', (socket) => {
    console.log('User Socket Connected');
    socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));
 
    socket.broadcast.on("sendUpdatePerson", person => {
        console.log("Update Person:" + person.name.first + ' ' + person.name.last);
        socket.broadcast.emit("Updatedperson", person);
    });
 
    socket.broadcast.on("sendSavePerson", person => {
        console.log("Saved Person:" + person.name.first + ' ' + person.name.last);
        socket.broadcast.emit("Savedperson", person);
    });

});