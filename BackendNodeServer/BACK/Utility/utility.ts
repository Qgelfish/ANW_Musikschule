import pack_colors = require("colors/safe");
import fs = require("fs");

/**
 * Contains helper methods
 * */
export class Utility {

    /**
     * Dictionary containig descriptions for status codes
     * Key: status_code: string
     * Value: [level: string, message: string]
     * */
    private static readonly STATUS_CODES: { [code: string]: [string, string] } = {
        "1-01": ["INFO", "Client Connected!"],
        "1-02": ["INFO", "Client Disconnected!"],
        "1-03": ["INFO", "INCOMING REQUEST : "],
        "1-04": ["INFO", "OUTGOING RESPONSE: "],
        "2-01": ["SUCCESS", "MySQL Service is Online!"],
        "2-02": ["SUCCESS", "Listening on Port: "],
        "2-03": ["SUCCESS", "Node Server running on Version "],
        "3-01": ["WARNING", "MySQL Service is Offline!"],
        "4-01": ["ERROR", "MySQL Service is not available!"],
        "4-02": ["ERROR", "Bad SQL Query!"]
    }

    /**
     * FileStream to log into a logfile
     * */
    private static readonly LOG_FILE: fs.WriteStream = fs.createWriteStream("log.txt", {flags: "a"});

    /**
     * Writes something to the console
     * @param msg The message being written
     * @param level The severity of the message
     */
    private static write(msg: string, level: string): void {
        switch (level) {
            case "INFO": console.log(pack_colors.cyan("[INFO]") + "    " + msg);
                break;
            case "SUCCESS": console.log(pack_colors.green("[SUCCESS]") + " " + msg);
                break;
            case "WARNING": console.log(pack_colors.yellow("[WARNING]") + " " + msg);
                break;
            case "ERROR":
            case "FAILED": console.log(pack_colors.red("[FAILED]") + "  " + msg);
                break;
        }
    }

    /**
     * Writes something to the console and returns a status object
     * Does also write to the log file
     * @param code the status code
     * @param occurrence occurrence of the call
     * @param param optional parameter, appended to the message
     */
    public static makeStatusObjectAndConsole(code: string, occurrence: string, param?: string): string {
        let output = "[" + code + "] " + this.STATUS_CODES[code][1] + (param != undefined ? param : "");

        this.write(output, this.STATUS_CODES[code][0]);
        this.LOG_FILE.write("[" + (new Date()).toISOString() + "] " + output + "\n");

        return this.makeStatusObject(code, occurrence);
    }

    /**
     * Returns a status object
     * @param code the status code
     * @param occurrence occurrence of the call
     */
    public static makeStatusObject(code: string, occurrence: string): string {
        let statObj: any = new Object;

        statObj.code = code;
        statObj.level = this.STATUS_CODES[code][0];
        statObj.name = this.STATUS_CODES[code][1];
        statObj.occurrence = occurrence; // TODO comment out in production

        return statObj;
    }
}