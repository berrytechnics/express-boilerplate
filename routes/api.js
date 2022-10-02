import express from 'express'
import svgCaptcha from 'svg-captcha'
import Users from '../database.user.js'
const router = express.Router()
// const isAuth = (req,res,next)=>{
// 	if(req.isAuthenticated()){
// 		return next()
// 	}
// 	req.flash('red','Login required!')
// 	res.redirect('/login')
// }
const isAdmin = (req,res,next)=>{
	if(req.user&&req.user.admin){
		return next()
	}
	req.flash('red','Not authorized, contact administrator!')
	res.redirect('/user/dashboard')
}
router.get('/newCaptcha',async(req,res)=>{
	let captcha = svgCaptcha.create()
	req.session.captcha = captcha.text
	res.send(captcha.data)
})
router.get('/deleteUser/:id',isAdmin,(req,res)=>{
	Users.find({_id:req.params.id}).remove((err,user)=>{
		req.flash('yellow','User Deleted!')
		res.redirect('/login')
	})
})

export default router