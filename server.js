import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

/* App Configurations */
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.static("./public"));

app.set("views", "./views");
app.set("view engine", "ejs");

/* Router Definitions */
import indexRouter from './routes/index';

/* Routing */
app.use("/", indexRouter);

/* Server Initialization */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));