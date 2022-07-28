import { FieldInfo, MysqlError, Pool, PoolConnection } from "mysql";
import { ConnectionManager } from "./connection_manager_ctrl.mjs";
import { CONTEXTS, ErrorWrapper, ObjectWrapper } from "./TransfferedObjectsClasses.mjs";

function getAsListForSQL(words:string[]) {
    const asString = words.join("','");
    return  "'" + asString + "'";
}

async function executeSQLOnDB<T>(sql:string, funcProcessingResult: (results: any) => T, connection?: PoolConnection): Promise<T> {
    return new Promise<T>((resolve, reject) => {

        let conn: Pool | PoolConnection | undefined = connection;

        if (!conn) {
            conn = ConnectionManager.getPool();
        }

        conn.query(sql, (err:MysqlError | null, 
                         res:any, 
                         fields: FieldInfo[]) => {

            if (err) {
                
                reject(err);
                return;
            }

            resolve(funcProcessingResult(res));

        });

    })
    
}

function handleRequest(req:any, res:any,
                       sql:string, contextForErrors: CONTEXTS,
                       funcProcessingResult: (results: any) => any) {
    executeSQLOnDB(sql, funcProcessingResult)
    .then((result) => {

        const objWrapper = new ObjectWrapper(result);

        res.send(objWrapper);
    })
    .catch((error) => {

        const objWrapper = new ObjectWrapper(null, [new ErrorWrapper(contextForErrors, error)]);

        res.send(objWrapper);
    });
}

export {getAsListForSQL, executeSQLOnDB, handleRequest};
