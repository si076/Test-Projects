import { FieldInfo, MysqlError } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { getAsListForSQL } from "./utils.mjs";


export async function getTranslations(fromLang:string, toLang:string, words:string[]) {
    return await new Promise((resolve, reject) => {

        const wordsAsString = getAsListForSQL(words);

        const translSql = `select word translation from lang.translation 
                                where from_lang='${fromLang}' and 
                                      to_lang='${toLang}' and 
                                      word in (${wordsAsString})`;
        const query = ConnectionManager.getPool().query(translSql, (err:MysqlError, 
                                                                    translationsResult: {word:string, translation:string}[], 
                                                                    fields:FieldInfo[]) => {
          console.log(err);

          if (err) reject(err);

          const resultMap = new Map<string, string[]>();

          let translations: string[] = [];
          let word: string = '';
          for (let i = 0; i < translationsResult.length; i++) {
              if (word === '') {

              } else if ( word !== translationsResult[i].word) {
                resultMap.set(word, translations);
              }
              word = translationsResult[i].word;
              translations.push(translationsResult[i].translation);
          }
          resultMap.set(word, translations);

          resolve(resultMap);          
        });

    });
}