import nounsRouter from './routes/nouns.mjs';
import cors from 'cors';
import e from 'express';
// import * as bodyParser from 'bodyParser';

export const languages = {fromLang:'', 
                   toLang:''};

const app  = e(); 
const port = 5000;

// app.use(bodyParser.json());
 
app.use(cors());

app.param('from_lang', function (req:any, res:any, next:any, paramValue:any) {
    console.log('paramValue:' + paramValue);
    languages.fromLang = paramValue;
    next(); 
});

app.param('to_lang', function (req:any, res:any, next:any, paramValue:any) {
    console.log('paramValue:' + paramValue);
    languages.toLang = paramValue;
    next();
});

// app.use('/:from_lang/:to_lang/lang_settings', langSettingsRouter);
// app.use('/:from_lang/:to_lang/alphabets', alphabetRouter);
app.use('/:from_lang/:to_lang/nouns', nounsRouter); 

app.listen(port);

