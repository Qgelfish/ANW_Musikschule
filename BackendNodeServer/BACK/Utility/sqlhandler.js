"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pack_sql = require("mysql");
const utility_1 = require("./utility");
const settings_1 = require("../Settings/settings");
/**
 * Contains methods to deal with SQL Interactions
 * */
class SQLHandler {
    /**
     * Creates a SQL Connection and returns the connection
     * */
    static CreateConnection() {
        let con = pack_sql.createConnection({
            host: settings_1.Settings.SQL_HOST,
            user: settings_1.Settings.SQL_USER,
            password: settings_1.Settings.SQL_PASS,
            database: settings_1.Settings.SQL_DB
        });
        return con;
    }
    /**
     * Checks if the SQL Server is Online and returns a boolean
     * */
    static CheckIsServerAvailable() {
        let con = this.CreateConnection();
        con.connect((err) => {
            if (err) {
                utility_1.Utility.makeStatusObjectAndConsole("3-01", "SQLHandler.CheckIsServerOnline()");
                return false;
            }
            else {
                utility_1.Utility.makeStatusObjectAndConsole("2-01", "SQLHandler.CheckIsServerOnline()");
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
    static SP_Dispatcher(req_json) {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonresult = yield new Promise((resolve, reject) => {
                let con = this.CreateConnection();
                let sql = this.GetSQLQuery(req_json);
                let resultset = {
                    response: [],
                    error: []
                };
                con.connect((err) => {
                    if (err) {
                        resultset.error.push(utility_1.Utility.makeStatusObjectAndConsole("4-01", "SQLHandler.SP_Dispatcher(string)"));
                    }
                });
                con.query(sql, (err, rs) => {
                    if (err) {
                        resultset.error.push(utility_1.Utility.makeStatusObjectAndConsole("4-02", "SQLHandler.SP_Dispatcher(string)"));
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
        });
    }
    /**
     * Builds the SQL Query from the JSON Object. Returns a SQL Statement
     * @param req_json the Request JSON Object
     */
    static GetSQLQuery(req_json) {
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
exports.SQLHandler = SQLHandler;
//# sourceMappingURL=sqlhandler.js.map