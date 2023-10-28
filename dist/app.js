"use strict";
// Dada Ki Jay Ho
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const public_1 = __importDefault(require("./routes/public"));
const blog_1 = __importDefault(require("./routes/blog"));
const redisConfig_1 = require("./config/redisConfig");
const data_source_1 = require("./data-source");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const is_auth_1 = require("./middlewares/is-auth");
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    name: "node-js-app-session-name",
    secret: process.env.SESSION_SECRET,
    store: redisConfig_1.redisSessionStore,
    resave: false,
    saveUninitialized: false,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(public_1.default);
app.use(is_auth_1.isAuth);
app.use("/blog", blog_1.default);
app.listen(process.env.PORT, () => {
    data_source_1.AppDataSource.initialize().then((value) => {
        console.log("Database is ready to rock ...");
    });
    console.log(`App is listening on port ${process.env.PORT}...`);
});
