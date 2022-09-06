import express from 'express'
import passport from 'passport'
import svgCaptcha from 'svg-captcha'
import User from '../database/user.js'
const router = express.Router()
const isAuth = (req,res,next)=>{
	if(req.isAuthenticated()){
		return next()
	}
	req.flash('red','Login required!')
	res.redirect('/login')
}
const isAdmin = (req,res,next)=>{
	if(req.user&&req.user.admin){
		return next()
	}
	req.flash('red','Not authorized, contact administrator!')
	res.redirect('/login')
}
router.get(['/register','/login'],async(req,res)=>{
	let captcha = svgCaptcha.create()
	req.session.captcha = captcha.text
	!req.user ? res.render('../pages/user/login',{captcha:captcha.data}) : res.redirect('/user/dashboard')
})
router.post('/register',async(req,res)=>{
	if(req.body.captchaText.toUpperCase()==req.session.captcha.toUpperCase()){
		try{
			await User.register({
				name:req.body.firstname+' '+req.body.lastname,
				username:req.body.email,
				admin: req.body.admin == process.env.ADMIN_CODE ? true : false,
			},req.body.password)
			req.flash('green','User registered. You may now login!')
			res.redirect('/login')
		}
		catch(err){
			req.flash('red','ERROR: '+err||'Please contact the site admin.')
			res.redirect('/login')
		}
	}
	else{
		req.flash('red','Captcha verification faied! Please try again.')
		res.redirect('/user/login')
	}
})
router.post('/login',passport.authenticate('local',{
	failureRedirect:'/login',
	failureFlash:{type:'red',message:'Username or Password incorrect.'}
}),(req,res)=>{
	req.user.admin ? res.redirect('/user/admin') : res.redirect('/user/dashboard')
})
router.get('/logout',(req,res)=>{
	req.logout(err=>{
		if(err) req.flash('red','ERROR: '+err)
		res.redirect('/login')
	})
})
//------------------------------------------------
router.get('/dashboard',isAuth,(req,res)=>{
	res.render('../pages/user/dashboard',{user:req.user})
})
router.get('/admin',isAdmin,async(req,res)=>{
	let users = await Users.find({})
	res.render('../pages/user/admin',{user:req.user,users})
})

export default router