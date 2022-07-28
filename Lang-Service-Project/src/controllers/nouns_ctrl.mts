import { FieldInfo, MysqlError, format, PoolConnection } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { getExamplesFromDB, saveExamplesInDB } from "./examples_ctrl.mjs";
import { getTranslationsFromDB, saveTranslationsInDB } from "./translations_ctrl.mjs";
import { CONTEXTS, ErrorWrapper, Noun, ObjectWrapper, WordTranslations, Example } from "./TransfferedObjectsClasses.mjs";
import { getAsListForSQL, executeSQLOnDB } from "./utils.mjs";

  

function getNouns(req: any, res: any) {
  console.log('getNouns from lang:' + req.app.locals.languagesPerRequest.fromLang + 
              ' to lang:' + req.app.locals.languagesPerRequest.toLang);

  getMatchingNounsFromDB(req.app.locals.languagesPerRequest.fromLang, 
                         req.app.locals.languagesPerRequest.toLang)
  .then((result) => {
    res.send(result);
  })
  .catch((reason) => {
    res.send(reason);
  });

}

function getMatchingNounsFromDB(fromLang: string, toLang: string[], 
                                      wordStartsWith:string = '',
                                      wordsWithSimilarRoot:string = '',
                                      limit:number = 5,
                                      offset:number = 0): Promise<ObjectWrapper<Noun[]>> {
  return new Promise<ObjectWrapper<Noun[]>>((resolve, reject) => {      
    
    console.log('Nouns Promise');

    const wrapper: ObjectWrapper<Noun[]> = new ObjectWrapper<Noun[]>();

    let wordPart = '';
    let wordPattern = '';
    let tmpStr = wordsWithSimilarRoot.trim();
    let offsetStr = '';

    if (wordStartsWith.trim().length > 0) {

      wordPart = ` and ( singular like'${wordStartsWith.trim()}%' or 
                          plural like '${wordStartsWith.trim()}%' )`;

    } else if (tmpStr.length > 0) {

      for (let i = 0; i < tmpStr.length; i++) {
        
        wordPattern += `%${tmpStr.charAt(i)}`;
      }
      wordPattern += '%';        

      wordPart = ` and ( singular like'${wordPattern}' or 
                          plural like '${wordPattern}' )`;
    }

    if (offset > 0) {
      offsetStr = `offset ${offset}`;
    }

    const sql = `select * from noun
                    where lang='${fromLang}' 
                    ${wordPart}
                    order by singular 
                    limit ${limit}
                    ${offsetStr}`;
    executeSQLOnDB<Noun[]>(sql,
            (results: {
                        lang: string, 
                        singular:string,
                        plural:string, 
                        singularFullForm:string, 
                        pluralFullForm:string, 
                        gender:string, 
                        animate:string, 
                        declination_type: string,
                      }[]
            ) => {

              const foundNouns: Noun[] = [];

              results.forEach((el) => {
                const noun: Noun = new Noun();
                noun.lang = el.lang; 
                noun.singular = el.singular;
                noun.plural = el.plural;
                noun.singularFullForm = el.singularFullForm;
                noun.pluralFullForm = el.pluralFullForm;
                noun.gender = el.gender;
                noun.animate = el.animate;
                noun.declination_type = el.declination_type;
                foundNouns.push(noun);
              });

              return foundNouns;
            })
          .then((foundNouns) => {

            wrapper.objectOfInterest = foundNouns;

            const wordsArr = foundNouns.map(el => el.singular);

            console.log('Words->');
            console.log(wordsArr);

            let translPromis = getTranslationsFromDB(fromLang, toLang, wordsArr);

            let examplesPromis = getExamplesFromDB(fromLang, toLang, wordsArr);

            Promise.allSettled([translPromis, examplesPromis])
            .then((results) => {
              results.forEach((el, index) => {
                switch (index) {
                  case 0: {
                    switch (el.status) {
                      case "fulfilled": {

                        const translationsMap: Map<string, WordTranslations[]> = (el.value as Map<string, WordTranslations[]>);
                        foundNouns.forEach( elem => {
                          elem.translations = translationsMap.get(elem.singular)!;
                        });
                        break;
                      }
                      case "rejected": {
                        wrapper.errors.push(new ErrorWrapper(CONTEXTS.TRANSLATIONS, el.reason));
                        break;
                      }
                    }
                    break;
                  }
                  case 1: {
                    switch (el.status) {
                      case "fulfilled": {
                        const examplesMap:Map<string, Example[]> = (el.value as Map<string, Example[]>);
                        foundNouns.forEach( elem => {
                          elem.examples = examplesMap.get(elem.singular)!;
                        });
                        break;
                      }
                      case "rejected": {
                        wrapper.errors.push(new ErrorWrapper(CONTEXTS.EXAMPLES, el.reason));
                        break;
                      }
                    }
                    break;
                  }
                }
              });
            });

            resolve(wrapper);
          })
          .catch((error) => {
            wrapper.errors.push(new ErrorWrapper(CONTEXTS.NOUN, error));

            reject(wrapper);
          });
  });
}


function saveNouns(req:any, res:any) {
  console.log(req.body);

  const noun: Noun = req.body;    

  insertNounInDB(noun)
  .then((result) => {
    res.send(result);
  })
  .catch((reason) => {
    res.send(reason);
  });
  
}

async function insertNounInDB(noun:Noun) {
  return new Promise((resolve, reject) => {

    const objWrapper = new ObjectWrapper(noun.getKey());
    
    let sql = `insert into noun set 
                ?? = ? ?? = ? ?? = ? ?? = ? ?? = ?
                ?? = ? ?? = ? ?? = ?`;
    const inserts = ['lang', noun.lang, 'singular', noun.singular, 'plural', noun.plural,
                     'singularFullForm', noun.singularFullForm, 'pluralFullForm', noun.pluralFullForm,
                     'gender', noun.gender, 'animate', noun.animate, 'declination_type', noun.declination_type];
    sql = format(sql, inserts);

    executeSQLOnDB(sql, (results) => {
      return results;
    })
    .then((results) => {

      const translPromis = saveTranslationsInDB(noun.lang, noun.singular, noun.translations, objWrapper.errors);

      const examplesPromis = new Promise((resolve, reject) => {

        ConnectionManager.getPool().getConnection((error: MysqlError, connection: PoolConnection) => {

          if (error) {
            
            reject(error);

            return;
          }

          saveExamplesInDB(noun.lang, noun.singular, noun.examples, objWrapper.errors, connection)
          .finally(() => {
            connection.release();

            resolve(objWrapper);
          })
    
        });

      });

      Promise.allSettled([translPromis, examplesPromis])
      .then((result) => {

        resolve(objWrapper);

      });
  
    })
    .catch((reason) => {

      objWrapper.errors.push(new ErrorWrapper(CONTEXTS.NOUN, reason));

      resolve(objWrapper);
    });

  });
}

export {getNouns, saveNouns};
