var express = require('express');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();
// var userHelpers = require('../helpers/admin-helpers')
/* GET users listing. */


router.get('/', function(req, res, next) {
  adminsession=req.session.admin
  if(adminsession){
    adminHelpers.getAllUsers().then((data)=>{
      let user=data
      // console.log(user[0]);
      res.render('admin/view-users',{admin:true,user,adminsession});
    })
  }else{
    res.redirect('/admin/admin-login')
  }
 
  
});








// router.get('/', function(req, res, next) {
//   adminsession=req.session.admin
//   if(adminsession){
//     adminHelpers.getAllUsers().then((data)=>{
//       let user=data
//       // console.log(user[0]);
//       res.render('admin/view-users',{admin:true,user,adminsession});
//     })
//   }else{
//     res.redirect('/admin/admin-login')
//   }
 
  
// });
router.get('/add-users',(req,res)=>{
  
  res.render('admin/add-user',{admin:true})


})
router.post('/add-users',(req,res)=>{
  
  adminHelpers.adduser(req.body).then((result)=>{
    console.log(result+"haaaaiii");
    res.redirect('/admin')
    
  })
  })
router.get('/delete-user/:email',(req,res)=>{
    // let userId=req.query.id
    // console.log(userId)
    // console.log(req.name);
    let userEmail=req.params.email
    console.log(userEmail)
    adminHelpers.deleteUser(userEmail).then((response)=>{
      res.redirect('/admin/')
    })
})
router.get('/edit-user/:email',async (req,res)=>{
   let user=await adminHelpers.getUserDetails(req.params.email)
  // console.log(user);
   res.render('admin/edit-user',{user})
})
router.post('/edit-user/:email',(req,res)=>{

  adminHelpers.updateUser(req.params.email,req.body).then((response)=>{
    res.redirect('/admin')
  })
})


router.get('/admin-signup',(req,res)=>{
  res.render('admin/admin-signup',{admin:true,})
})


router.post('/admin-signup',(req,res)=>{

  adminHelpers.adminsignup(req.body).then((data)=>{
    console.log(data);
    res.redirect('admin-login')
  })

})

router.get('/admin-login',(req,res)=>{
let admin = req.session.admin
if (admin) {
    res.redirect('/admin')

} else {

    res.render('admin/admin-login', { "loginErr":req.session.adminloginErr,admin:true})
    req.session.adminloginErr = false
}
})

router.post('/admin-login',(req,res)=>{
  adminHelpers.adminlogin(req.body).then((response)=>{
    
    if (response.status){
      
      req.session.admin=response.user
      req.session.loggedIn=true
      res.redirect('/admin')
    }
    else{
      req.session.adminloginErr="invalid user name or password"
      res.redirect('/admin/admin-login')
    }
  })
})
router.get('/admin-logout',(req,res)=>{
  req.session.admin=null
  console.log('logout success')
  // req.session.userLoggedIn=false
  res.redirect('/admin/admin-login')
})
module.exports = router;
