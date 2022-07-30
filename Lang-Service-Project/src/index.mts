import "reflect-metadata";
import cors from 'cors';
import e from 'express';
import {getAlphabet, getAvailableLanguagesSync, getCharacteristics, getDiacritics, getLangSettings, getLanguages } from "./controllers/languages.mjs"
import { Language, LanguagesPerRequest } from "./controllers/TransfferedObjectsClasses.mjs";
import {nounsRouter} from "./routes/nouns.mjs";
// import * as bodyParser from 'bodyParser';


const app  = e(); 
const port = 5000;

// app.use(bodyParser.json());
app.locals.languagesPerRequest = new LanguagesPerRequest();
 
app.use(cors());

app.param('from_lang', function (req:any, res:any, next:any, paramValue:any) {
    console.log('param from_lang:' + paramValue);

    validateRequestedLanguage(paramValue);
    app.locals.languagesPerRequest.fromLang = paramValue;

    next();
});

app.param('to_lang', function (req:any, res:any, next:any, paramValue:any) {
    console.log('param to_lang:' + paramValue);
    if (paramValue === '*') { //all
        const availableLanguages = getAvailableLanguagesSync();
        app.locals.languagesPerRequest.toLang = 
            availableLanguages
                .map(el => el.lang)
                    .filter(el => el !== app.locals.languagesPerRequest.fromLang);
    }
    else {
        validateRequestedLanguage(paramValue);
        app.locals.languagesPerRequest.toLang = [paramValue];
    }

    console.log(app.locals.languagesPerRequest);

    next();
});

function validateRequestedLanguage(lang:string) {
    const availableLanguages = getAvailableLanguagesSync();

    if (!availableLanguages || availableLanguages instanceof Error) {
        throw new Error("Critical Error:Cannot get available languages!");
    } else {

        const langLC = lang.toLocaleLowerCase('en');
        if ((availableLanguages as Language[]).findIndex(el => el.lang === langLC) === -1) {
            const supportedLanguages = availableLanguages.map(el => el.lang).join()
            throw new Error(`Unsupported language: ${lang}! Supported languages: ${supportedLanguages}.`);
        }        
    }
}

app.use('/languages', getLanguages);
app.use('/:from_lang/alphabet', getAlphabet);
app.use('/:from_lang/characteristics', getCharacteristics);
app.use('/:from_lang/lang_settings', getLangSettings);
app.use('/:from_lang/diacritics', getDiacritics);
app.use('/:from_lang/:to_lang/nouns', nounsRouter); 

app.listen(port);

