import { FieldInfo, MysqlError } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { Alphabet, AlphabetLetter, CharacteristicElement, Characteristics, CONTEXTS, Diacritic, Diacritics, ErrorWrapper, LangSettings, Language, LanguagesPerRequest, ObjectWrapper } from "./TransfferedObjectsClasses.mjs";
import { executeSQLOnDB, getAsListForSQL, handleRequest } from "./utils.mjs";

let availableLanguagesLoaded: boolean = false;
let availableLanguages: Language[] = [];

async function getAvailableLanguagesFromDB(): Promise<Language[]> {
    return await new Promise<Language[]>((resolve, reject) => {
        if (!availableLanguagesLoaded) {
    
            // console.log('Promis languages');

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
            // console.log('Loaded languages');

            resolve(availableLanguages);
        }

    });
}

function getAvailableLanguagesSync(): Language[] {
    return availableLanguages;
}

function getLanguages(req:any, res:any) {
    console.log('-> getLanguages');

    getAvailableLanguagesFromDB()
    .then((result) => {
        // console.log('then');
        // console.log(result);

        const objWrapper = new ObjectWrapper(result);

        res.send(objWrapper);
    })
    .catch((error) => {
        console.log(error);

        const objWrapper = new ObjectWrapper(null, [new ErrorWrapper(CONTEXTS.LANGUAGES, error)]);

        res.send(objWrapper);
    });
}

function getAlphabet(req:any, res:any) {
    const lang = (req.app.locals.languagesPerRequest as LanguagesPerRequest).fromLang;
    const langList = getAsListForSQL(prepareLangList(lang));

    console.log('-> getAlphabet for: ' + langList);

    const sql = `select * from alphabet
                    where lang in (${langList})`;

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

function getDiacritics(req:any, res:any) {
    const lang = (req.app.locals.languagesPerRequest as LanguagesPerRequest).fromLang;
    const langList = getAsListForSQL(prepareLangList(lang));

    console.log('-> getDiacritics for: ' + langList);

    const sql = `select * from diacritics
                    where lang in (${langList})`;
    handleRequest(req, res, sql, CONTEXTS.DIACRITICS, 
        (results) => {
            const diacritics = new Diacritics();

            results.forEach((el: {
                                    lang:string,
                                    diacritic:string,
                                    name_lang:string,
                                    name:string,
                                    transliteration:string,
                                    IPA:string,
                                 }
                            ) => {
                const diacritic = new Diacritic();                
                diacritic.lang = el.lang;
                diacritic.diacritic = el.diacritic;
                diacritic.name_lang = el.name_lang;
                diacritic.name = el.name;
                diacritic.transliteration = el.transliteration;
                diacritic.IPA = el.IPA;

                diacritics.diacritics.push(diacritic);
            });

            return diacritics;
        });
      
}

function processCaractResult(results:any):any {
    const elements: CharacteristicElement[] = [];

    results.forEach((el: {type: string, description:string}) => {
        elements.push(new CharacteristicElement(el.type, el.description));
    });
    
    return elements;
}

function getCharacteristics(req:any, res:any) {
    console.log('getCharacteristics');
    const sqlGender = `select * from gender`;
    const promG = executeSQLOnDB<CharacteristicElement[]>(sqlGender, processCaractResult);

    const sqlAnimate = `select * from animate`;
    const promA = executeSQLOnDB<CharacteristicElement[]>(sqlAnimate, processCaractResult);

    const sqlDeclinationType = 
            `select * from declination_type
                where lang='${(req.app.locals.languagesPerRequest as LanguagesPerRequest).fromLang}'`;
    const promD = executeSQLOnDB<CharacteristicElement[]>(sqlDeclinationType, processCaractResult);

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
    const lang = (req.app.locals.languagesPerRequest as LanguagesPerRequest).fromLang;
    const langList = getAsListForSQL(prepareLangList(lang));

    console.log('-> getLangSettings for: ' + langList);

    const sql = `select * from lang_settings
                    where lang in (${langList})`;
    handleRequest(req, res, sql, CONTEXTS.LANG_SETTINGS, 
                  (results) => {
                    const langsSettings: LangSettings[] = [];

                    results.forEach((el: {
                                            lang:string,
                                            noun_singular_plural_sep:string,
                                            unicode_range:string,
                                            unicode_range_to_check:string,
                                            unicode_diacritics_to_check:string,
                                            alphabet_order1_name:string,
                                            alphabet_order2_name:string,
                                            alphabet_order3_name:string,
                                            alphabet_order4_name:string,
                                            alphabet_order5_name:string,
                                            write_direction:string,
                                         }
                                    ) => {
                        const langSettings = new LangSettings();
                        langSettings.lang = el.lang;
                        langSettings.noun_singular_plural_sep = el.noun_singular_plural_sep;
                        langSettings.unicode_range = el.unicode_range;
                        langSettings.unicode_range_to_check = el.unicode_range_to_check;
                        langSettings.unicode_diacritics_to_check = el.unicode_diacritics_to_check;
                        langSettings.alphabet_order1_name = el.alphabet_order1_name;
                        langSettings.alphabet_order2_name = el.alphabet_order2_name;
                        langSettings.alphabet_order3_name = el.alphabet_order3_name;
                        langSettings.alphabet_order4_name = el.alphabet_order4_name;
                        langSettings.alphabet_order5_name = el.alphabet_order5_name;
                        langSettings.write_direction = el.write_direction;

                        langsSettings.push(langSettings);
                    });

                    return langsSettings;
                  });
}

function prepareLangList(lang: string): string[] {
    let langList:string[] = [];
    if (lang === '*') {
        langList = availableLanguages.map(el => el.lang);
    } else {
        langList = [lang];
    }
    return langList;
}

// (function () {
//     console.log('load IIFE');
//     getAvailableLanguagesFromDB();
// })();

export {getAvailableLanguagesSync, getLanguages, getAlphabet, getCharacteristics,
        getLangSettings, getDiacritics};