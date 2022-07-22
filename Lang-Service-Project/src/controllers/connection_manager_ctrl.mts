// import {createConnection, ConnectionConfig, Connection, MysqlError} from 'mysql';
import mysql from 'mysql';

export class ConnectionManager {

    private static pool: mysql.Pool | null = null;

    constructor() {}

    static getPool(): mysql.Pool {
        
        if (!this.pool) {

            this.pool = mysql.createPool({
                connectionLimit : 10,
                host: "localhost",
                user: "test",
                password: "test2020_",
                multipleStatements: true
            });

        }
        return this.pool;
    }
}
