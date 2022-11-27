var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')

// const verifylogin = (req,res,next)=>{
//   if(req.session.userLoggedIn){
//     next()
//   }else{
//     res.redirect('/login')
//   }
// }
/* GET home page. */


router.get('/', function (req, res, next) {
  let user=req.session.user
  console.log(user)
  let products = [
    {
      name: 'iphone11',
      catagory: 'mobile',
      description: 'this is nice phone',
      image: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662418953/Croma%20Assets/Communication/Mobiles/Images/230106_nxtpnk.png/mxw_640,f_auto"
    },
    {
      name: 'iphone12',
      catagory: 'mobile',
      description: 'this is new phone',
      image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-12-white-2020?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1635202752000'
    },
    {
      name: 'iphone13',
      catagory: 'mobile',
      description: 'this is awesome phone',
      image: 'https://media.croma.com/image/upload/v1664009609/Croma%20Assets/Communication/Mobiles/Images/243463_0_qtsxpd.png'
    },

    {
      name: 'iphone14',
      catagory: 'mobile',
      description: 'this is latest phone',
      image: 'https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662655662/Croma%20Assets/Communication/Mobiles/Images/261979_oq7vjv.png/mxw_640,f_auto'
    }]
    
    if (user) {
      res.render('user/index', { products, user });
    } else {
      res.redirect('/login')
    }
  
  });



router.get('/login',(req,res)=>{
  let user = req.session.user
  if(user){
    res.redirect('/')
  }else{
    
  res.render('user/login',{"loginErr":req.session.userloginErr})
  req.session.userloginErr=false
  }
})


router.get('/signup', function (req, res, next) {
  res.render('user/signup', { signupError: req.session.signupError })
  req.session.signupError = false
})
router.post('/signup', function (req, res, next) {
  // console.log(req.body);
  userHelpers.dosignup(req.body).then((response) => {
    console.log(response);
    if (response) {
      res.redirect('/login')
    } else {
      req.session.signupError = true
      res.redirect('/signup')

    }
  })

})


router.post('/login',(req,res)=>{
    userHelpers.dologin(req.body).then((response)=>{
      console.log(response)
      if (response.status){
        
        req.session.user=response.user
        req.session.user.loggedIn=true
        res.redirect('/')
      }
      else{
        req.session.userloginErr="invalid user name or password"
        res.redirect('/login')
      }
    })
})
router.get('/logout',(req,res)=>{
  req.session.user=null
  // req.session.userLoggedIn=false
  res.redirect('/login')
})
module.exports = router;
