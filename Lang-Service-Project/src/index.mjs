import express from 'express';
import bodyParser from 'body-parser';
import nounsRouter from './routes/nouns.mjs';


const app  = express();
const port = 5000;

app.use(bodyParser.json());

app.use('/nouns', nounsRouter);

app.listen(port);

