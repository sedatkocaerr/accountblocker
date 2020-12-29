const app = require('express')();
const server = require('http').Server(app);
const redisService = require('./redisService');
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
    console.log("a user connected");

    socket.broadcast.on("addNewUser", async user => {
        const redisUser = await redisService.getData("onlineuser",user.userId);
        if(redisUser!=null)
        {
            redisUser.onlineCount+=1;
            redisService.setData("onlineuser",user.userId,redisUser);
        }
        else
        {
            const saveUser = {
                ...user,
                onlineCount:1
            };
            redisService.setData("onlineuser",user.userId,saveUser);
        }
    });


    socket.on("disconnect", () =>  {
        console.log(+"redisten geldim.");
    });
});