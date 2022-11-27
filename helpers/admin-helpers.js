var db=require('../config/connection')
const bcrypt =require('bcrypt')
module.exports={

    adduser:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection('user').insertOne(userData).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
       
    },

    // adduser:(user,callback)=>{
    //     console.log(user);
    //     db.get().collection('user').insertOne(user).then((data)=>{
            
    //         callback(true) 
    //     })
    // },
    getAllUsers:()=>{
        return new Promise(async (resolve,reject)=>{
            let users= await db.get().collection('user').find().toArray()
            resolve(users)
        })
    },
    deleteUser:(userEmail)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection('user').deleteOne({email:userEmail}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getUserDetails:(userEmail)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('user').findOne({email:userEmail}).then((user)=>{
                resolve(user)
            })
        })
    },
    updateUser:(userEmail,userDetails)=>{
        return new Promise(async (resolve,reject)=>{
            userDetails.password=await bcrypt.hash(userDetails.password,10)
            db.get().collection('user').updateOne({email:userEmail},{
                $set:{
                    name:userDetails.name,
                    email:userDetails.email,
                    password:userDetails.password


            }
        }).then((response)=>{
            console.log();
            resolve()
        })
        })
    },
    adminsignup:(admindata)=>{
        console.log(admindata)
        return new Promise(async(resolve,reject)=>{
            admindata.password=await bcrypt.hash(admindata.password,10)
            db.get().collection('admin').insertOne(admindata).then((response)=>{
                resolve(response)
            })
        })
       
    },
    adminlogin:(admindata)=>{
        let loginStatus=false
        let response={}
        return new Promise(async(resolve,reject)=>{
            let admin=await db.get().collection('admin').findOne({email:admindata.email})
            if(admin){
                bcrypt.compare(admindata.password,admin.password).then((status)=>{
                    // console.log(admindata);
                    if(status){
                        console.log("login success");
                        response.user=admin
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