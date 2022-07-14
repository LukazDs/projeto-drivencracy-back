import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import poolsRouter from './routes/pollsRouter.js';
import choicesRouter from './routes/choicesRouter.js';
import votesRouter from './routes/votesRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(poolsRouter);
app.use(choicesRouter);
app.use(votesRouter);

app.listen(process.env.PORT, console.log("Conexão estabelecida!"));
