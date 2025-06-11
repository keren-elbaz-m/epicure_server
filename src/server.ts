import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './db';
import {ROUTES} from './constants/routes.const';
import healthRoute from './routes/health.route';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(ROUTES.HEALTH, healthRoute);

const startServer = async()=>{
    await connectDB();
    const server = http.createServer(app);

    server.listen(process.env.PORT || 8080, ()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}/`);
});
} 

startServer();
