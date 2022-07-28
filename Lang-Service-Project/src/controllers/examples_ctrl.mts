import { FieldInfo, format, MysqlError, PoolConnection } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { CONTEXTS, ErrorWrapper, Example, ExampleTranslation } from "./TransfferedObjectsClasses.mjs";
import { getAsListForSQL, executeSQLOnDB } from "./utils.mjs";
import { v4 as uuidv4 } from 'uuid';



async function getExamplesFromDB(fromLang:string, toLang:string[], 
                           words:string[]): Promise<Map<string, Example[]>> {

  const wordsAsString = getAsListForSQL(words);
  const toLangs = getAsListForSQL(toLang);

  const sql = `select ew.word, e.text, et.to_lang, et.translation,  from 
                  example_word as ew inner join
                  example as e inner join
                  example_translation as et
                  on ew.example_uuid = e.uuid  and
                     e.uuid = et.example_uuid
                  where ew.lang='${fromLang}' and
                        ew.word in (${wordsAsString}) and
                        et.to_lang in (${toLangs}) and
                  order by ew.word e.text et.to_lang`;
  return executeSQLOnDB<Map<string, Example[]>>(
            sql,
            (examplesResult: {
                              word:string, 
                              text:string, 
                              to_lang:string, 
                              translation:string
                              }[]
            ) => {
              const resultMap = new Map<string, Example[]>();

              let examples: Example[] = [];
              let example: Example = new Example();
              let word: string = '';
              let text: string = '';
              for (let i = 0; i < examplesResult.length; i++) {
    
                  if (word === '') {
                    word = examplesResult[i].word;
                  } else if ( word !== examplesResult[i].word) {
                    examples.push(example);
                    resultMap.set(word, examples);
  
                    examples = [];
    
                    word = examplesResult[i].word;
                  }

                  if (text === '') {
                    text = examplesResult[i].text;
                  }
                  else if (text !== examplesResult[i].text) {
                    examples.push(example);

                    text = examplesResult[i].text;

                    example = new Example(text);
                  }

                  example.translations.push(
                    new ExampleTranslation(examplesResult[i].to_lang,
                                           examplesResult[i].translation));
              }
              examples.push(example);
              resultMap.set(word, examples);

              return resultMap;
            }

          );
}

async function saveExamplesInDB(fromLang: string, word: string, examples: Example[], 
                                errors:ErrorWrapper[],
                                connection: PoolConnection) {
  return new Promise((resolve, reject) => {     

    if (!word || examples.length === 0) {
      resolve(errors);

      return;
    }

    const example = examples[0];

    saveExampleInDB(connection, fromLang, word, example, errors)
    .then((results) => {

      saveExamplesInDB(fromLang, word, examples.slice(1), errors, connection)
      .then((result) => {

        resolve(errors);

      });

    })
    .catch((reason) => {

      errors.push(new ErrorWrapper(CONTEXTS.EXAMPLES, reason));

      //try with the other example
      saveExamplesInDB(fromLang, word, examples.slice(1), errors, connection)
      .then((result) => {

        resolve(errors);

      });
      
    });

  });
                              
                                  
}

async function saveExampleInDB(connection: PoolConnection, 
                               fromLang: string, word: string, example: Example, 
                               errors:ErrorWrapper[]) {
  return new Promise((resolve, reject) => {                              
    connection.beginTransaction((err) => {
      if (err) { 

        reject(err);

        return;
      }

      const uuid = uuidv4();

      let sqlExample = `insert into example set 
                            ?? = ? ?? = ? ?? = ?`;
      const insertsExample = ['uuid', uuid, 'lang', fromLang, 'text', example.text];   
      sqlExample = format(sqlExample, insertsExample);

      executeSQLOnDB(sqlExample, (results) => results, connection)
      .then((result) => {

        let sqlExampleWord = `insert into example set 
                                ?? = ? ?? = ? ?? = ?`;
        const insertsExampleWord = ['lang', fromLang, 'word', word, 'example_uuid', uuid];
        sqlExampleWord = format(sqlExampleWord, insertsExampleWord);

        executeSQLOnDB(sqlExample, (results) => results, connection)
        .then((result) => {

          saveExampleTranslationsInDB(fromLang, uuid, 0, example.translations, errors, connection)
          .then((result) => {
            connection.commit(function(err) {
              if (err) {

                errors.push(new ErrorWrapper(CONTEXTS.EXAMPLES, err));

                connection.rollback(function() {
                  throw err;
                });
              }

              Promise.resolve();
            });

          })
          .catch((reason) => {
            errors.push(new ErrorWrapper(CONTEXTS.EXAMPLES, reason));
    
            connection.rollback(function() {
              throw reason;
            });
    
          });

        })
        .catch((reason) => {
          errors.push(new ErrorWrapper(CONTEXTS.EXAMPLES, reason));
  
          connection.rollback(function() {
            throw reason;
          });
  
        });

      })
      .catch((reason) => {
        errors.push(new ErrorWrapper(CONTEXTS.EXAMPLES, err));

        connection.rollback(function() {
          throw reason;
        });

      });

    });
  });               
}

async function saveExampleTranslationsInDB(fromLang: string, example_uuid: string, index: number, 
                                           translations: ExampleTranslation[], 
                                           errors:ErrorWrapper[],
                                           connection: PoolConnection) {
    let sql = `insert into example_translation set 
                ?? = ? ?? = ? ?? = ? ?? = ? ?? = ?`;
    const inserts = ['from_lang', fromLang, 'example_uuid', example_uuid, 'index', index,
          'to_lang', translations[index].lang, 'translation', translations[index].translation];
    sql = format(sql, inserts);

    return executeSQLOnDB(sql, (results) => {
              return results;
    },
    connection)
    .then((results) => {
      index++;

      if (index < translations.length) {

        saveExampleTranslationsInDB(fromLang, example_uuid, index, translations, errors, connection)
        .then((res) => Promise.resolve(errors));

      } else {

        //just to return to parent
        return Promise.resolve(errors);

      }
    })
    .catch((reason) => {

      const error: ErrorWrapper = 
                    new ErrorWrapper(CONTEXTS.EXAMPLES, reason, 
                                     translations[index].lang, 
                                     translations[index].translation);
      errors.push(error);

      index++;

      if (index < translations.length) {

        saveExampleTranslationsInDB(fromLang, example_uuid, index, translations, errors, connection)
        .then((res) => Promise.resolve(errors));

      } else {

        //just to return to parent
        return Promise.resolve(errors);

      }
    });
  
}

export {getExamplesFromDB, saveExamplesInDB};