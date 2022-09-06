import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import {fileURLToPath} from 'url'
import session from 'express-session'
import compression from 'compression'
import path from 'path'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import http from 'http'
import flash from 'express-flash'
import User from './database/user.js'
import indexRouter from './routes/index.js'
import userRouter from './routes/user.js'
import apiRouter from './routes/api.js'
const app = express()
const server = http.createServer(app)
app.set('view engine','ejs')
app.use(cors())
app.use(compression())
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser('gp2018pd2020'))
app.use(session({
	secret:'gp2018pd2020',
	resave:false,
	saveUninitialized:false,
	cookie:{maxAge:60000}
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use('/js',express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'node_modules/bootstrap/dist/js')))
app.use('/js',express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'node_modules/jquery/dist')))
app.use('/js',express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'node_modules/chart.js/dist')))
app.use('/js',express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'node_modules/socket.io/client-dist')))
app.use('/',indexRouter)
app.use('/user',userRouter)
app.use('/api',apiRouter)
app.use((req,res)=>{
	req.flash('red','We couldn\'t find that...')
	res.redirect('/')
})

server.listen(process.env.PORT||3000,()=>{
	console.log('\x1b[32m%s\x1b[0m','Server started...')
	mongoose.connect(process.env.MONGO_URI,{
		useNewURLParser:true,
		useUnifiedTopology:true
	})
})
export default app