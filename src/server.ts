import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db";
import { ROUTES } from "./constants/routes.const";
import healthRoute from "./routes/health.route";
import apiRouter from "./routes/api.router";

const app = express();

app.use(
    cors({
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use(ROUTES.API, healthRoute);
app.use(ROUTES.API, apiRouter);

const startServer = async () => {
    try {
        await connectDB();
        const server = http.createServer(app);

        server.listen(process.env.PORT || 8080, () => {
            console.log(
                `Server running on http://localhost:${process.env.PORT}/`
            );
        });
    } catch (e) {
        console.error("Failed to start a server: ", e);
        process.exit(1);
    }
};

startServer();
