import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import session from 'express-session';
import morgan from 'morgan';

if(process.env.NODE_ENV !== 'production')
    dotenv.config()

const app = express();

/* App Configurations */
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(express.static("./public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.set("views", "./views");
app.set("view engine", "ejs");

/* Router Definitions */
import indexRouter from './routes/index';
import api from './routes/api';
import dashboardRouter from './routes/dashboard';

/* Routing */
app.use("/", indexRouter);
app.use("/api", api.router);
app.use("/dashboard", dashboardRouter);

/* Server Initialization */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));