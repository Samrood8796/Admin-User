var db=require('../config/connection')
const bcrypt =require('bcrypt')
module.exports={
    dosignup:(userData)=>{
        console.log(userData)
        return new Promise(async(resolve,reject)=>{
            let response={}
            let user = await db.get().collection('user').findOne({email:userData.email})
            if(user){
                console.log("Email Already exist");
                resolve(response.status =false)
            }else{

            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection('user').insertOne(userData).then((response)=>{
                resolve(response)
            })
        }
        })
       
    },
    dologin:(userData)=>{
        let loginStatus=false
        let response={}
        return new Promise(async(resolve,reject)=>{
            let user=await db.get().collection('user').findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log("login success");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('login error')
                        resolve({status:false})

                    }
                })
            }else{
                console.log('login failed');
                resolve({status:false})
            }
        })
    }
}