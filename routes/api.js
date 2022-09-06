import express from 'express'
import svgCaptcha from 'svg-captcha';
const router = express.Router()

router.get('/newCaptcha',async(req,res)=>{
	let captcha = svgCaptcha.create()
    req.session.captcha = captcha.text
    res.send(captcha.data)
})

export default router