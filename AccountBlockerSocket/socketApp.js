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
            if(!userData)
            {
                redisUserList.push(user);
                await redisService.setData("onlineuser",user.Id,redisUserList); 
                io.emit('getUserList',redisUserList); 
            }
        }
        else
        {
            const newUserList =[];
            newUserList.push(user);
            await redisService.setData("onlineuser",user.Id,newUserList); 
            io.emit('getUserList',newUserList);   
        }
        
    });


    socket.broadcast.on('removeUser', async user =>{
       const redisUserList = await redisService.getData("onlineuser",user.Id);
       if(redisUserList)
       {
          const userData = redisUserList.filter(x=>x.token ==user.token)[0];
          if(userData)
          {
             redisUserList.splice(redisUserList.indexOf(userData),1);
             await redisService.setData("onlineuser",user.Id,redisUserList); 
             io.emit('getUserList',redisUserList);
          }
       }
    });
    
    socket.on("disconnect", () =>  {
        
    });
});