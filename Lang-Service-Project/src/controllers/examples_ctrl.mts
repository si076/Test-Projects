import { FieldInfo, MysqlError } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { getAsListForSQL } from "./utils.mjs";

export class Example {
    text: string = '';
    translation: string = '';
}

export async function getExamples(fromLang:string, toLang:string, words:string[]) {

    return await new Promise((resolve, reject) => {
        const wordsAsString = getAsListForSQL(words);

        const sql = `select e.text, e.uuid, ew.word from 
                        lang.example as e inner join
                        lang.example_word as ew
                        on e.uuid = ew.example_uuid
                        where e.lang='${fromLang}' and
                              ew.word in (${wordsAsString})`;

        ConnectionManager.getPool().query(sql, (err, examplesResult, fields) => {
            // console.log('Examples->');
            // console.log(examplesResult);
            
            if (err) reject(err);

            resolve(examplesResult);    
        });
    }).then((res) => {
        const examplesResult: {text:string, uuid:string, word:string}[] = 
                res as {text:string, uuid:string, word:string}[];

        return new Promise((resolve, reject) => {

            const uuidsAsString = getAsListForSQL(examplesResult.map(el => el.uuid));

            const sqlTranslations = `select example_uuid, translation from lang.example_translation 
                                        where from_lang='${fromLang}' and
                                              to_lang='${toLang}' and 
                                              example_uuid in (${uuidsAsString})`;
                    
            ConnectionManager.getPool().query(sqlTranslations, (err: MysqlError, result: {example_uuid:string, translation:string}[], fields:FieldInfo[]) => {
                // console.log('Example translations->');
                // console.log(result);

                if (err) reject(err);

                const finalResult = new Map<string, Example[]>();

                for (let index = 0; index < examplesResult.length; index++) {
                    const element = examplesResult[index];

                    let translation = '';

                    if (result) {
                        const translationArr = 
                            result.filter(el => el.example_uuid === element.uuid).map(el => el.translation); 
                        if (translationArr) {
                            translation = translationArr[0];
                        }
                    }
                    
                    let examples = finalResult.get(element.word);
                    if (!examples) {
                        examples = [];
                    }

                    const obj: Example = new Example();
                    obj.text = element.text;
                    obj.translation = translation;
                    
                    examples.push(obj);

                    finalResult.set(element.word, examples);
                }

                // console.log('Examples result->');
                // console.log(finalResult);
                
                resolve(finalResult);
            });
        });

    });
}