const redisClient = require('./redisHelper');

function setData(keyName,userId,data)
{
    if(redisClient.connected)
    {
        const redisData = JSON.stringify(data);
        
        redisClient.hset(keyName, userId, redisData, (err, res) =>  {
           if(err)
           {
               console.log(err.message);
           }
        });
    }
}

function getListData(keyName)
{
    const rtrList = [];
    if(redisClient.connected)
    {
        redisClient.get(keyName,(err,datalist)=>{
           if(err)
           {
               return null;
           }
           rtrList.push(JSON.parse(datalist));
           return rtrList;
        });
      return rtrList;
    }
    return rtrList;
}

async function getData(keyName,userId)
{
    return new Promise((resolve,reject)=>{
        try {
            if(redisClient.connected)
             {
                redisClient.hget(keyName,userId,(err,datalist)=>{
                if(err)
                {
                    return null;
                }
               const data = JSON.parse(datalist);
               resolve (data);
            });
          }
            
        } catch (error) {
            reject(error);
        }
    })
}

function removeKeyField(keyName,fieldName)
{
    if(redisClient.connected)
    {
        redisClient.hdel(keyName, fieldName);
    }
    else
    {
        console.log("Redis not connect.")
    }
}



module.exports = {setData,getData,getListData,removeKeyField};