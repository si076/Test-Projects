import { FieldInfo, MysqlError } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { Example, getExamples } from "./examples_ctrl.mjs";
import {languages} from "../index.mjs";
import { getTranslations } from "./translations_ctrl.mjs";

  class Noun {
    lang: string = ''; 
    singular:string = '';
    plural:string = ''; 
    singularFullForm:string = ''; 
    pluralFullForm:string = ''; 
    gender:string = ''; 
    animate:string = ''; 
    declination_type: string  = '';
    translations: string[] = [];
    examples: Example[] = [];
  };

  export const getNouns = (req: any, res: any) => {
    console.log('getNouns from lang:' + languages.fromLang + ' to lang:' + languages.toLang);

    execSQLQuery(languages.fromLang, languages.toLang).then((result) => {
      res.send(result);
    }).catch((reason) => {
      // if (reason instanceof MysqlError) {
        res.send(reason);
    //   } else {
    //     res.send([]);
    //   }
    });

  }

  async function execSQLQuery(fromLang: string, toLang: string) {
    return await new Promise((resolve, reject) => {
      console.log('First Promise');

      const sql = `select * from lang.noun where lang='${fromLang}'`;
      ConnectionManager.getPool().query(sql, (err:MysqlError | null, nounsResult:any, fields: FieldInfo[]) => {

          if (err) reject(err);

          if (!nounsResult || nounsResult.length === 0) {
            reject(nounsResult);
          }

          resolve(nounsResult);

      });

    }).then((res1) => {

      const firstQueryResult: Noun[]= res1 as Noun[];
      console.log('res1->');
      console.log(res1);
      console.log('firstQueryResult->');
      console.log(firstQueryResult);
      
      return new Promise((resolve, reject) => {
        console.log('Second Promise');

        const wordsArr = firstQueryResult.map(el => el.singular);

        console.log('Words->');
        console.log(wordsArr);
  
        const pendPromise = getTranslations(fromLang, toLang, wordsArr);
        
        pendPromise.then((res3) => {
          const translationsMap = res3 as Map<string, string[]>;
          // console.log(examplesMap);
                
          firstQueryResult.forEach( el => {
            el.translations = translationsMap.get(el.singular)!;
          });
  
  
          resolve(firstQueryResult);
        });
        
      });

    }).then((res2) => {

       const resultWithTranslations: Noun[] = res2 as Noun[];

       return new Promise((resolve, reject) => {

      const wordsArr = resultWithTranslations.map(el => el.singular);

      console.log('Words->');
      console.log(wordsArr);

      const pendPromise = getExamples(fromLang, toLang, wordsArr);

      pendPromise.then((res3) => {
        const examplesMap = res3 as Map<string, Example[]>;
        // console.log(examplesMap);
              
        resultWithTranslations.forEach( el => {
          el.examples = examplesMap.get(el.singular)!;
        });


          resolve(resultWithTranslations);
        });
      });

    });
    
  }


  export const saveNouns = (req:any, res:any) => {
    console.log(req.body);

    const nouns: Noun[] = req.body;    


  }