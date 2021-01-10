import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import blogRouter from './routes/blog.js'
import contactRouter from './routes/contact.js'
import authRouter from './routes/auth.js'

dotenv.config()
//connectDB()

const server = express();
server.use(express.json())
server.use('/auth', authRouter);
//server.use("user", )
server.use('/blog', blogRouter);
server.use('/contact', contactRouter);

server.listen(8080);
