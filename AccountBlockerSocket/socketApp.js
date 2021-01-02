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
                userData.socketList.push(socket.id);
                redisUserList[redisUserList.indexOf(userData)]=userData;
                await redisService.setData("onlineuser",user.Id,redisUserList); 
                io.emit('getUserList',redisUserList); 
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
            const userData = redisUserList.filter(x=>x.token ==user.token)[0];
            if(userData.socketList.length==1)
            {
                redisService.removeKeyField("onlineuser",user.Id);
                console.log("içinde");
            }
            else
            {
                  const socketData = userData.socketList.filter(x=>x==socket.id)[0];
                  userData.socketList.splice(userData.socketList.indexOf(socketData));
    
                  const redisIndex= redisUserList.indexOf(userData);
                  redisUserList[redisIndex]=userData;
                  await redisService.setData("onlineuser",user.Id,redisUserList); 
                  io.emit('getUserList',redisUserList);
            }
        }
        else
        {
            const userData = redisUserList.filter(x=>x.token ==user.token)[0];
            if(userData)
            {
                if(userData.socketList.length==1)
                {
                    redisUserList.splice(redisUserList.indexOf(userData));
                    io.emit('getUserList',redisUserList);
                }
                else
                {
                  const socketData = userData.socketList.filter(x=>x==socket.id)[0];
                  userData.socketList.splice(userData.socketList.indexOf(socketData));
    
                  const redisIndex= redisUserList.indexOf(userData);
                  redisUserList[redisIndex]=userData;
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