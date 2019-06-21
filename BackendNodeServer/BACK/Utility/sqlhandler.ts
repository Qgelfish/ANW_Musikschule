import pack_sql = require("mysql");
import { Utility } from "./utility";
import { Settings } from "../Settings/settings";

/**
 * Contains methods to deal with SQL Interactions
 * */
export class SQLHandler {

    /**
     * Creates a SQL Connection and returns the connection
     * */
    private static CreateConnection(): any {
        let con = pack_sql.createConnection({
            host: Settings.SQL_HOST,
            user: Settings.SQL_USER,
            password: Settings.SQL_PASS,
            database: Settings.SQL_DB
        });

        return con;
    }

    /**
     * Checks if the SQL Server is Online and returns a boolean
     * */
    public static CheckIsServerAvailable(): boolean {
        let con = this.CreateConnection();

        con.connect((err) => {
            if (err) {
                Utility.makeStatusObjectAndConsole("3-01", "SQLHandler.CheckIsServerOnline()");
                return false;
            }
            else {
                Utility.makeStatusObjectAndConsole("2-01", "SQLHandler.CheckIsServerOnline()");
                return true;
            }
        });

        return false;
    }

    /**
     * Calls the StoredProcedure associated with the JSON Object.
     * Returns a Promise containing the resultset with errors
     * @param req_json The JSON Request Object
     */
    public static async SP_Dispatcher(req_json: string): Promise<string> {
        let jsonresult = await new Promise<string>((resolve, reject) => {

            let con = this.CreateConnection();

            let sql = this.GetSQLQuery(req_json);
            let resultset = {
                response: [],
                error: []
            }

            con.connect((err) => {
                if (err) {
                    resultset.error.push(Utility.makeStatusObjectAndConsole("4-01", "SQLHandler.SP_Dispatcher(string)"));
                }
            });

            con.query(sql, (err, rs) => {
                if (err) {
                    resultset.error.push(Utility.makeStatusObjectAndConsole("4-02", "SQLHandler.SP_Dispatcher(string)"));
                }
                else {
                    for (let i = 0; i < rs[0].length; i++) {
                        let tempDataObj = {};
                        for (let value in rs[0][i]) {
                            tempDataObj[value] = rs[0][i][value];
                        }
                        resultset.response.push(tempDataObj);
                    }
                }
                resolve(JSON.stringify(resultset));
            });
        });

        return jsonresult;
    }

    /**
     * Builds the SQL Query from the JSON Object. Returns a SQL Statement
     * @param req_json the Request JSON Object
     */
    private static GetSQLQuery(req_json: string): string {
        let obj = JSON.parse(req_json);
        let sql = "CALL" + " " + obj.procedure;

        sql += "(";
        for (let value in obj.param) {
            sql += "'" + obj.param[value] + "',";
        }
        sql += ")";

        sql = sql.replace(",)", ")");
        sql = sql.replace("()", "");

        return sql;
    }
}