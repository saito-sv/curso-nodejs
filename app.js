import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import homeRouter from './routes/home.js'
import blogRouter from './routes/blog.js'
import contactRouter from './routes/contact.js'
import aboutRouter from './routes/about.js'
import authRouter from './routes/auth.js'
import session from 'express-session'
dotenv.config()
connectDB()

const server = express();

server.use(session({
    secret:"kjasdhf234"
}));

server.use(express.static(path.join(process.cwd(), 'public')));

server.set('views', path.join(process.cwd(), "views"));
server.set('view engine', 'ejs');

server.use("/", homeRouter);
server.use('/about', aboutRouter);
server.use('/blog', blogRouter);
server.use('/contact', contactRouter);
server.use('/auth', authRouter);

server.listen(8080);
