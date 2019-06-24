"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Contains variables e.g. version or sql hostname
 * */
class Settings {
}
/**
 * Hostname being used for SQL Connection
 * */
Settings.SQL_HOST = "localhost";
/**
 * Username being used for SQL Connection
 * */
Settings.SQL_USER = "root";
/**
 * Password being used for SQL Connection
 * */
Settings.SQL_PASS = "";
/**
 * Database being used by SQL Connection
 * */
Settings.SQL_DB = "musikschule";
/**
 * Port the server is listening on for HTTP Requests
 * */
Settings.SERVER_PORT = 4711;
/**
 * Development Version of this server
 * */
Settings.SERVER_VERSION = "0.4.0";
/**
 * Date, this server was last updated on
 * */
Settings.SERVER_LAST_UPDATE = "2019-06-21";
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map