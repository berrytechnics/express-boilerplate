import express from 'express'
const router = express.Router()

router.get('/',async(req,res)=>{
	res.render('../pages/index',{user:req.user})
})

router.get(['/login','/register'],async(req,res)=>{
	res.redirect('/user/login')
})

router.get('/chart',(req,res)=>{
	res.render('../pages/chart',{user:req.user})
})

export default router