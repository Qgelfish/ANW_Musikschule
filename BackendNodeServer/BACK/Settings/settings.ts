/**
 * Contains variables e.g. version or sql hostname
 * */
export class Settings {

    /**
     * Hostname being used for SQL Connection
     * */
    public static readonly SQL_HOST: string = "localhost";

    /**
     * Username being used for SQL Connection
     * */
    public static readonly SQL_USER: string = "visitor";

    /**
     * Password being used for SQL Connection
     * */
    public static readonly SQL_PASS: string = "123";

    /**
     * Database being used by SQL Connection
     * */
    public static readonly SQL_DB: string = "musikschule";

    /**
     * Port the server is listening on for HTTP Requests
     * */
    public static readonly SERVER_PORT: number = 4711;

    /**
     * Development Version of this server
     * */
    public static readonly SERVER_VERSION: string = "0.4.1";

    /**
     * Date, this server was last updated on
     * */
    public static readonly SERVER_LAST_UPDATE: string = "2019-06-24";
}