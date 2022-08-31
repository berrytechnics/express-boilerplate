import express from 'express';
import connect from 'connect-ensure-login';
const router = express.Router();

router.get('/',async(req,res)=>{
    req.flash('green','Flash alerts are working!')
    res.render('../pages/index',{user:req.user})
})

router.get(['/login','/register'],async(req,res)=>{
    res.redirect('/user/login')
})

router.get('/chart',(req,res)=>{
    res.render('../pages/chart')
})

export default router