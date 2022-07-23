import { FieldInfo, MysqlError } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { CONTEXTS, ErrorWrapper, Translations, Wrapper } from "./TransfferedObjectsClasses.mjs";
import { getAsListForSQL } from "./utils.mjs";



export async function getTranslations(wrapper: Wrapper, 
                                      fromLang:string, toLang:string, 
                                      words:string[]) {
    return await new Promise((resolve, reject) => {

        const wordsAsString = getAsListForSQL(words);

        const translSql = `select word to_lang translation from lang.translation 
                                where from_lang='${fromLang}' and 
                                      to_lang='${toLang}' and 
                                      word in (${wordsAsString}) 
                                order by word to_lang`;
        const query = ConnectionManager.getPool().query(translSql, (err:MysqlError, 
                                                                    translationsResult: {word:string,
                                                                                         to_lang: string, 
                                                                                         translation:string}[], 
                                                                    fields:FieldInfo[]) => {
          // console.log(err);

          if (err) {
            const errorWrapper: ErrorWrapper = 
                    new ErrorWrapper(CONTEXTS.TRANSLATIONS, err);
            wrapper.errors.push(errorWrapper);
            
            reject(err);
          }

          const resultMap = new Map<string, Translations[]>();

          let translations: Translations[] = [];
          let translationsLang: Translations = new Translations();
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

                translationsLang = new Translations(lang);
              }

              translationsLang.translations.push(translationsResult[i].translation);
          }
          translations.push(translationsLang);
          resultMap.set(word, translations);

          resolve(resultMap);          
        });

    });
}

export async function saveTranslations(translations: Translations[]) {
  
}