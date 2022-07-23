import { FieldInfo, MysqlError } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { CONTEXTS, ErrorWrapper, Example, Examples, Wrapper } from "./TransfferedObjectsClasses.mjs";
import { getAsListForSQL } from "./utils.mjs";



export async function getExamples(wrapper: Wrapper,
                                  fromLang:string, toLang:string, 
                                  words:string[]) {

    return await new Promise((resolve, reject) => {
        const wordsAsString = getAsListForSQL(words);

        const sql = `select ew.word, et.to_lang, e.text, et.translation,  from 
                        lang.example as e inner join
                        lang.example_word as ew inner join
                        lang.example_translation as et
                        on e.uuid = ew.example_uuid and
                           e.uuid = et.example_uuid
                        where e.lang='${fromLang}' and
                              ew.word in (${wordsAsString})
                        order by ew.word et.to_lang`;

        ConnectionManager.getPool().query(sql, (err: MysqlError, res: any, fields:FieldInfo[]) => {
            // console.log('Examples->');
            // console.log(examplesResult);
            const examplesResult: 
                    {word:string, to_lang:string, text:string, translation:string}[] = 
                    res as {word:string, to_lang:string, text:string, translation:string}[];
            
            if (err) {
                const errorWrapper: ErrorWrapper = 
                        new ErrorWrapper(CONTEXTS.NOUN, err);
                wrapper.errors.push(errorWrapper);
                
                reject(err);
            }

            const resultMap = new Map<string, Examples[]>();

            let examples: Examples[] = [];
            let examplesLang: Examples = new Examples();
            let word: string = '';
            let lang: string = '';
            for (let i = 0; i < examplesResult.length; i++) {
  
                if (word === '') {
                  word = examplesResult[i].word;
                } else if ( word !== examplesResult[i].word) {
                  examples.push(examplesLang);
                  resultMap.set(word, examples);

                  examples = [];
  
                  word = examplesResult[i].word;
                }
  
                if (lang === '') {
                  lang = examplesResult[i].to_lang;
                }
                else if (lang !== examplesResult[i].to_lang) {
                   
                  examples.push(examplesLang);
  
                  lang = examplesResult[i].to_lang;
                    
                  examplesLang = new Examples(lang);
                }
                
                const example: Example = new Example(examplesResult[i].text,
                                                     examplesResult[i].translation);

                examplesLang.examples.push(example);
            }
            examples.push(examplesLang);
            resultMap.set(word, examples);
  
            resolve(resultMap);          
          });
    });
    // .then((res) => {
    //     const examplesResult: {text:string, uuid:string, word:string}[] = 
    //             res as {text:string, uuid:string, word:string}[];

    //     return new Promise((resolve, reject) => {

    //         const uuidsAsString = getAsListForSQL(examplesResult.map(el => el.uuid));

    //         const sqlTranslations = `select example_uuid, to_lang, translation from lang.example_translation 
    //                                     where from_lang='${fromLang}' and
    //                                           to_lang='${toLang}' and 
    //                                           example_uuid in (${uuidsAsString})`;
                    
    //         ConnectionManager.getPool().query(sqlTranslations, (err: MysqlError, 
    //                                                             result: {example_uuid:string, 
                                                                         
    //                                                                      translation:string}[], 
    //                                                             fields:FieldInfo[]) => {
    //             // console.log('Example translations->');
    //             // console.log(result);

    //             if (err) reject(err);

    //             const finalResult = new Map<string, Examples[]>();

    //             for (let index = 0; index < examplesResult.length; index++) {
    //                 const element = examplesResult[index];

    //                 let translation = '';

    //                 if (result) {
    //                     const translationArr = 
    //                         result.filter(el => el.example_uuid === element.uuid).map(el => el.translation); 
    //                     if (translationArr) {
    //                         translation = translationArr[0];
    //                     }
    //                 }
                    
    //                 let examples = finalResult.get(element.word);
    //                 if (!examples) {
    //                     examples = [];
    //                 }

    //                 const obj: Example = new Example();
    //                 obj.text = element.text;
    //                 obj.translation = translation;
                    
    //                 examples.push(obj);

    //                 finalResult.set(element.word, examples);
    //             }

    //             // console.log('Examples result->');
    //             // console.log(finalResult);
                
    //             resolve(finalResult);
    //         });
    //     });

    // });
}