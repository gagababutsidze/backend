import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { movieRouter } from './controlers/movie-contr.js';
import { usersRouter } from './controlers/user-contr.js';
import { commentRouter } from './controlers/comment-contr.js';
import { loginRouter } from './controlers/login.js';
import cors from 'cors';

const   PORT = process.env.PORT
const app = express();

app.use(express.json())
app.use(cors())
app.use('/movies',movieRouter)
app.use('/user', usersRouter)
app.use('/comment', commentRouter)
app.use('/login', loginRouter)

app.listen(PORT,()=>{
    console.log(`chairto ${PORT}`);
})