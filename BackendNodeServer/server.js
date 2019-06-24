"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pack_express = require("express");
const pack_http = require("http");
const pack_io = require("socket.io");
const utility_1 = require("./BACK/Utility/utility");
const sqlhandler_1 = require("./BACK/Utility/sqlhandler");
const settings_1 = require("./BACK/Settings/settings");
const expresshbs = require("express-handlebars");
let app = pack_express();
let http = pack_http.createServer(app);
let io = pack_io(http);
app.use(pack_express.static("FRONT"));
app.use(pack_express.static("FRONT/CSS"));
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
app.get("/test", (req, res) => {
    res.sendFile(__dirname + "/TEST/test.html");
});
io.on("connection", (socket) => {
    utility_1.Utility.makeStatusObjectAndConsole("1-01", "Server");
    socket.on("disconnect", () => {
        utility_1.Utility.makeStatusObjectAndConsole("1-02", "Server");
    });
    socket.on("reqDBCall", (message) => {
        sqlhandler_1.SQLHandler.SP_Dispatcher(message).then((response) => {
            utility_1.Utility.makeStatusObjectAndConsole("1-03", "Server", message);
            utility_1.Utility.makeStatusObjectAndConsole("1-04", "Server", response);
            socket.emit("resDBCall", response);
        });
    });
});
http.listen(settings_1.Settings.SERVER_PORT, () => {
    utility_1.Utility.makeStatusObjectAndConsole("2-02", "Server", settings_1.Settings.SERVER_PORT.toString());
    utility_1.Utility.makeStatusObjectAndConsole("2-03", "Server", settings_1.Settings.SERVER_VERSION + ", last Update on " + settings_1.Settings.SERVER_LAST_UPDATE);
    sqlhandler_1.SQLHandler.CheckIsServerAvailable();
});
//# sourceMappingURL=server.js.map