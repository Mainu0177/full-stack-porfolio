import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dbConnection from './dataBase/dbConnection.js';
import {errorMiddleware} from './middleware/error.js'
import messageRouter from './routers/messageRouter.js'
import userRouter from './routers/userRouter.js'
import timelineRouter from './routers/timeLineRouter.js'
import softwareApplicationRotuer from './routers/softwareApplicationRouter.js'
import skillRouter from './routers/skillRouter.js'
import projectRouter from './routers/projectRouter.js'

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
    cors({
        origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    })
)

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter)
app.use("/api/v1/timeline", timelineRouter)
app.use("/api/v1/software", softwareApplicationRotuer )
app.use("/api/v1/skill", skillRouter)
app.use("/api/v1/project", projectRouter)

dbConnection();
app.use(errorMiddleware);

export default app;