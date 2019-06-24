import pack_express = require("express");
import pack_http = require("http");
import pack_io = require("socket.io");
import expresshbs = require("express-handlebars");
import { Utility } from "./BACK/Utility/utility";
import { SQLHandler } from "./BACK/Utility/sqlhandler";
import { Settings } from "./BACK/Settings/settings";

let app = pack_express();
let http = pack_http.createServer(app);
let io = pack_io(http);

app.use(pack_express.static("FRONT"));
app.use(pack_express.static("TEST"));

app.engine('handlebars', expresshbs({
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/FRONT/TEMPLATES/LAYOUTS'
}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/FRONT/TEMPLATES/')

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/user", (req, res) => {
    res.render('user');
})

app.get("/test", (req, res) => {
    res.sendFile(__dirname + "/TEST/test.html");
});

io.on("connection", (socket) => {

    Utility.makeStatusObjectAndConsole("1-01", "Server");

    socket.on("disconnect", () => {
        Utility.makeStatusObjectAndConsole("1-02", "Server");
    });

    socket.on("reqDBCall", (message: string) => {
        SQLHandler.SP_Dispatcher(message).then((response) => {
            Utility.makeStatusObjectAndConsole("1-03", "Server", message)
            Utility.makeStatusObjectAndConsole("1-04", "Server", response)

            socket.emit("resDBCall", response);
        });
    });

});

http.listen(Settings.SERVER_PORT, () => {
    Utility.makeStatusObjectAndConsole("2-02", "Server", Settings.SERVER_PORT.toString());
    Utility.makeStatusObjectAndConsole("2-03", "Server", Settings.SERVER_VERSION + ", last Update on " + Settings.SERVER_LAST_UPDATE);
    SQLHandler.CheckIsServerAvailable();
});

