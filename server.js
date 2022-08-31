import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {fileURLToPath} from "url";
import session from 'express-session';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import PassportLocal from 'passport-local';
import flash from 'express-flash';
import User from './database/user.js';
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
const app = express();
app.set('view engine','ejs');
app.use(cors());
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
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new PassportLocal.Strategy(User.authenticate()));
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use('/css',express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'node_modules/bootstrap/dist/js')))
app.use('/js',express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'node_modules/jquery/dist')))
app.use('/js',express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'node_modules/chart.js/dist')))
app.use('/',indexRouter);
app.use('/user',userRouter);

app.use((req, res, next)=>{
    var err = new Error(`We cant seem to find that!`);
    err.status = 404;
    next(err);
});
app.listen(process.env.PORT||3000,()=>{
    console.log('Server started...')
    mongoose.connect(process.env.MONGO_URI,{
        useNewURLParser:true,
        useUnifiedTopology:true
    })
})

export default app