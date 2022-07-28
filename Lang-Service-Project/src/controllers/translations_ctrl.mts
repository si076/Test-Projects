import { format } from "mysql";
import { CONTEXTS, ErrorWrapper, WordTranslations, ObjectWrapper } from "./TransfferedObjectsClasses.mjs";
import { getAsListForSQL, executeSQLOnDB } from "./utils.mjs";



async function getTranslationsFromDB(fromLang:string, toLang:string[], 
                                     words:string[]): Promise<Map<string, WordTranslations[]>> {
  const wordsAsString = getAsListForSQL(words);
  const toLangs = getAsListForSQL(toLang);

  const translSql = `select word to_lang translation from translation 
                          where from_lang='${fromLang}' and 
                                to_lang in ('${toLangs}') and 
                                word in (${wordsAsString}) 
                          order by word index to_lang`;
  return executeSQLOnDB<Map<string, WordTranslations[]>>(
            translSql, 
            (translationsResult:{
                                  word:string,
                                  to_lang: string, 
                                  translation:string
                                }[]
            ) => {
              const resultMap = new Map<string, WordTranslations[]>();

              let translations: WordTranslations[] = [];
              let translationsLang: WordTranslations = new WordTranslations();
              let word: string = '';
              let lang: string = '';
              for (let i = 0; i < translationsResult.length; i++) {

                  if (word === '') {
                    word = translationsResult[i].word;
                  } else if ( word !== translationsResult[i].word) {
                    translations.push(translationsLang);
                    resultMap.set(word, translations);

                    translations = [];

                    word = translationsResult[i].word;
                  }

                  if (lang === '') {
                    lang = translationsResult[i].to_lang;
                  }
                  else if (lang !== translationsResult[i].to_lang) {
                      
                    translations.push(translationsLang);

                    lang = translationsResult[i].to_lang;

                    translationsLang = new WordTranslations(lang);
                  }

                  translationsLang.translations.push(translationsResult[i].translation);
              }
              translations.push(translationsLang);
              resultMap.set(word, translations);
              
              return resultMap;
            }
        );
}

async function saveTranslationsInDB(fromLang: string, word: string, translations: WordTranslations[], 
                                    errors:ErrorWrapper[]) {
  return new Promise((resolve, reject) => {     

      if (!word || translations.length === 0) {
        resolve(errors);

        return;
      }

      const translationsLang = translations[0];

      saveTranslationInDB(fromLang, word, 0, translationsLang.lang, translationsLang.translations, errors)
      .then((results) => {

        saveTranslationsInDB(fromLang, word, translations.slice(1), errors)
        .then((result) => {

          resolve(errors);

        });

      })
      
  });
}

async function saveTranslationInDB(fromLang: string, word: string, index: number,
                                   toLang: string, translations: string[], 
                                   errors:ErrorWrapper[]) {

    let sql = `insert into translation set 
    ?? = ? ?? = ? ?? = ? ?? = ? ?? = ?`;
    const inserts = ['from_lang', fromLang, 'word', word, 'index', index,
          'to_lang', toLang, 'translation', translations[index]];
    sql = format(sql, inserts);

    return executeSQLOnDB(sql, (results) => {
              return results;
    })
    .then((results) => {
      index++;

      if (index < translations.length) {

        saveTranslationInDB(fromLang, word, index, toLang, translations, errors)
        .then((res) => Promise.resolve(errors));

      } else {

        //just to return to parent
        return Promise.resolve(errors);

      }
    })
    .catch((reason) => {

      const error: ErrorWrapper = new ErrorWrapper(CONTEXTS.TRANSLATIONS, reason, toLang, translations[index]);
      errors.push(error);

      index++;

      if (index < translations.length) {

        saveTranslationInDB(fromLang, word, index, toLang, translations, errors)
        .then((res) => Promise.resolve(errors));

      } else {

        //just to return to parent
        return Promise.resolve(errors);

      }
    });
                            
}

export {getTranslationsFromDB, saveTranslationsInDB};