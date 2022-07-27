import { FieldInfo, MysqlError } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { Alphabet, AlphabetLetter, CharacteristicElement, Characteristics, CONTEXTS, ErrorWrapper, Language, LanguagesPerRequest, ObjectWrapper } from "./TransfferedObjectsClasses.mjs";

let availableLanguagesLoaded: boolean = false;
let availableLanguages: Language[] = [];

async function getAvailableLanguagesFromDB(): Promise<Language[]> {
    return await new Promise<Language[]>((resolve, reject) => {
        if (!availableLanguagesLoaded) {
    
            console.log('Promis languages');

            const sql = `select * from language`;
            ConnectionManager.getPool().query(sql, (err:MysqlError | null, results:any, fields: FieldInfo[]) => {

                if (err) {
                    availableLanguagesLoaded = false;
                    reject(err);
                    return;
                }

                results.forEach((el: {lang:string, description:string}) => {
                    const langObj: Language = 
                            new Language(el.lang.toLocaleLowerCase('en'), el.description);
                    availableLanguages.push(langObj);
                });

                availableLanguagesLoaded = true;
                resolve(availableLanguages);

            });
        } else {
            console.log('Loaded languages');

            resolve(availableLanguages);
        }

    });
}

function getAvailableLanguagesSync(): Language[] {
    return availableLanguages;
}

function getLanguages(req:any, res:any) {
    getAvailableLanguagesFromDB()
    .then((result) => {
        console.log('then');
        console.log(result);

        const objWrapper = new ObjectWrapper(result);

        res.send(objWrapper);
    })
    .catch((error) => {
        console.log('catch');

        const objWrapper = new ObjectWrapper(null, [new ErrorWrapper(CONTEXTS.LANGUAGES, error)]);

        res.send(objWrapper);
    });
}

async function getFromDB<T>(sql:string, funcProcessingResult: (results: any) => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {

        ConnectionManager.getPool().query(sql, (err:MysqlError | null, 
                                                res:any, 
                                                fields: FieldInfo[]) => {

            if (err) {
                
                reject(err);
                return;
            }

            resolve(funcProcessingResult(res));

        });

    })
    
}

function handleRequest(req:any, res:any,
                       sql:string, contextForErrors: CONTEXTS,
                       funcProcessingResult: (results: any) => any) {
    getFromDB(sql, funcProcessingResult)
    .then((result) => {

        const objWrapper = new ObjectWrapper(result);

        res.send(objWrapper);
    })
    .catch((error) => {

        const objWrapper = new ObjectWrapper(null, [new ErrorWrapper(contextForErrors, error)]);

        res.send(objWrapper);
    });

}

function getAlphabet(req:any, res:any) {
    const sql = `select * from alphabet
                    where lang='${(req.app.locals.languagesPerRequest as LanguagesPerRequest).fromLang}'`;

    handleRequest(req, res, sql, CONTEXTS.ALPHABET, 
        (results) => {
            const alphabet = new Alphabet();

            results.forEach((el:{
                                lang: string, 
                                letter: string ,
                                letter_name_lang: string ,
                                letter_name: string ,
                                transliteration: string ,
                                IPA: string ,
                                order1: number,
                                order2: number,
                                order3: number,
                                order4: number,
                                order5: number,
                                letter_type1: string ,
                                letter_type2: string
                                }
                            ) => {
                const  alphabetLetter = new  AlphabetLetter();

                alphabetLetter.lang = el.lang;
                alphabetLetter.letter = el.letter;
                alphabetLetter.letter_name_lang = el.letter_name_lang;
                alphabetLetter.letter_name = el.letter_name;
                alphabetLetter.transliteration = el.transliteration;
                alphabetLetter.IPA = el.IPA;
                alphabetLetter.order1 = el.order1;
                alphabetLetter.order2 = el.order2;
                alphabetLetter.order3 = el.order3;
                alphabetLetter.order4 = el.order4;
                alphabetLetter.order5 = el.order5;
                alphabetLetter.letter_type1 = el.letter_type1;
                alphabetLetter.letter_type2 = el.letter_type2;

                alphabet.letters.push(alphabetLetter);
            });

            return alphabet;

        });
}


function processCaractRes(results:any):any {
    const elements: CharacteristicElement[] = [];

    results.forEach((el: {type: string, description:string}) => {
        elements.push(new CharacteristicElement(el.type, el.description));
    });
    
    return elements;
}

function getCharacteristics(req:any, res:any) {
    const sqlGender = `select * from gender`;
    const promG = getFromDB<CharacteristicElement[]>(sqlGender, processCaractRes);

    const sqlAnimate = `select * from animate`;
    const promA = getFromDB<CharacteristicElement[]>(sqlAnimate, processCaractRes);

    const sqlDeclinationType = 
            `select * from declination_type
                where lang='${(req.app.locals.languagesPerRequest as LanguagesPerRequest).fromLang}'`;
    const promD = getFromDB<CharacteristicElement[]>(sqlDeclinationType, processCaractRes);

    Promise.allSettled([promG, promA, promD])
    .then((results) => {
        const characteristics = new Characteristics();

        results.forEach((el, index) => {
            const objWrapper = new ObjectWrapper<CharacteristicElement[]>();
            switch (el.status) {
                case "fulfilled":
                    objWrapper.objectOfInterest = el.value;
                    break;
                case "rejected":
                    switch (index) {
                        case 0:
                            objWrapper.errors.push(new ErrorWrapper(CONTEXTS.GENDER, el.reason));
                            break;
                        case 1:
                            objWrapper.errors.push(new ErrorWrapper(CONTEXTS.ANIMATE, el.reason));
                            break;
                        case 2:
                            objWrapper.errors.push(new ErrorWrapper(CONTEXTS.DECLINATION_TYPE, el.reason));
                            break;
                    }
                    break;
            }
            switch (index) {
                case 0:
                    characteristics.gender = objWrapper;
                    break;
                case 1:
                    characteristics.animate = objWrapper;
                    break;
                case 2:
                    characteristics.declination_type = objWrapper;
                    break;
            }
        });

        res.send(characteristics);
    });
}

function getLangSettings(req:any, res:any) {
    
}

// (function () {
//     console.log('load IIFE');
//     getAvailableLanguagesFromDB();
// })();

export {getAvailableLanguagesSync, getLanguages, getAlphabet, getCharacteristics,
        getLangSettings};