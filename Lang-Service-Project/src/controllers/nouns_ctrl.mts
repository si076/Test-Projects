import { FieldInfo, MysqlError } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { getExamples } from "./examples_ctrl.mjs";
import {languages} from "../index.mjs";
import { getTranslations } from "./translations_ctrl.mjs";
import { CONTEXTS, ErrorWrapper, Examples, Noun, Translations, Wrapper } from "./TransfferedObjectsClasses.mjs";

  

  export const getNouns = (req: any, res: any) => {
    console.log('getNouns from lang:' + languages.fromLang + ' to lang:' + languages.toLang);

    const wrapper: Wrapper = new Wrapper();

    execSQLQuery(wrapper, languages.fromLang, languages.toLang)
    .then((result) => {
      res.send(wrapper);
    })
    .catch((reason) => {
      res.send(wrapper);
    });

  }

  async function execSQLQuery(wrapper: Wrapper,
                              fromLang: string, toLang: string, 
                              wordStartsWith:string = '',
                              wordsWithSimilarRoot:string = '',
                              limit:number = 5,
                              offset:number = 0) {
    return await new Promise((resolve, reject) => {
      console.log('Nouns Promise');
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

      const sql = `select * from lang.noun
                      where lang='${fromLang}' 
                      ${wordPart}
                      order by singular 
                      limit ${limit}
                      ${offsetStr}`;
      ConnectionManager.getPool().query(sql, (err:MysqlError | null, nounsResult:any, fields: FieldInfo[]) => {

          if (err) {
            const errorWrapper: ErrorWrapper = 
                    new ErrorWrapper(CONTEXTS.NOUN, err);
            wrapper.errors.push(errorWrapper);

            reject(err);
          }

          wrapper.objectOfInterest = nounsResult;
          resolve(nounsResult);

      });

    }).then((res1) => {

      const firstQueryResult: Noun[]= res1 as Noun[];
      console.log('res1->');
      console.log(res1);
      console.log('firstQueryResult->');
      console.log(firstQueryResult);

      return new Promise((resolve, reject) => {
        console.log('Translations Promise');

        if (firstQueryResult.length === 0) {

          resolve(firstQueryResult);
  
        } else {
  
          const wordsArr = firstQueryResult.map(el => el.singular);

          console.log('Words->');
          console.log(wordsArr);
    
          const pendPromise = getTranslations(wrapper, fromLang, toLang, wordsArr);
          
          pendPromise.then((res3) => {
            const translationsMap = res3 as Map<string, Translations[]>;
            // console.log(examplesMap);
                  
            firstQueryResult.forEach( el => {
              el.translations = translationsMap.get(el.singular)!;
            });
    
            wrapper.objectOfInterest = firstQueryResult;
            resolve(firstQueryResult);

          }).catch((error) => {

            reject(error);

          });

        }
        
      });

    }).then((res2) => {

       const resultWithTranslations: Noun[] = res2 as Noun[];

       return new Promise((resolve, reject) => {
        console.log('Examples Promise');

        if (resultWithTranslations.length === 0) {

          resolve(resultWithTranslations);
  
        } else {
  
          const wordsArr = resultWithTranslations.map(el => el.singular);

          console.log('Words->');
          console.log(wordsArr);

          const pendPromise = getExamples(wrapper, fromLang, toLang, wordsArr);

          pendPromise.then((res3) => {
            const examplesMap = res3 as Map<string, Examples[]>;
            // console.log(examplesMap);
                  
            resultWithTranslations.forEach( el => {
              el.examples = examplesMap.get(el.singular)!;
            });

            wrapper.objectOfInterest = resultWithTranslations;
            resolve(resultWithTranslations);

          }).catch((error) => {

            reject(error);

          });

        }

      });

    });
    
  }


  export const saveNouns = (req:any, res:any) => {
    console.log(req.body);

    const nouns: Noun[] = req.body;    


  }