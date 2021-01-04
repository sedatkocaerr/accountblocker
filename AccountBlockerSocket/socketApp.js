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
    
    socket.broadcast.on("addNewUser", async user => {
        
        const redisUserList = await redisService.getData("onlineuser",user.Id);
        if(redisUserList)
        {
            const userData = redisUserList.filter(x=>x.token ==user.token)[0];
            if(userData)
            {
                io.to(socket.id).emit('multiplyPageBlock');
            }
            else
            {
                const newUserWebTab = {
                    ...user,
                    socketList:[socket.id]
                }
                redisUserList.push(newUserWebTab);
                await redisService.setData("onlineuser",user.Id,redisUserList); 
                io.emit('getUserList',redisUserList); 
            }
        }
        else
        {
            console.log("ekledim")
            const newUserList =[];
            const newUserWebTab = {
                ...user,
                socketList:[socket.id]
            }
            newUserList.push(newUserWebTab);
            await redisService.setData("onlineuser",user.Id,newUserList); 
            io.emit('getUserList',newUserList);   
        }
        
    });


    socket.broadcast.on('removeUser', async user =>{
        const redisUserList = await redisService.getData("onlineuser",user.Id);
        
        if(redisUserList.length==1)
        {
            if(redisUserList[0].socketList[0]==socket.id)
            {  
              redisService.removeKeyField("onlineuser",user.Id);
            }
        }
        else
        {
            const userData = redisUserList.filter(x=>x.token ==user.token)[0];
            if(userData)
            {
                if(userData.socketList[0]==socket.id)
                {   
                    redisUserList.splice(redisUserList.indexOf(userData));
                    await redisService.setData("onlineuser",user.Id,redisUserList); 
                    io.emit('getUserList',redisUserList);
                }
            }
        }
    });
    
    socket.on("disconnect", () =>  {
        console.log("socket");
    });
});