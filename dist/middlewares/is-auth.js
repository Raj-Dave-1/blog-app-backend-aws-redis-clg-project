"use strict";
// Dada Ki Jay Ho
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const redisConfig_1 = require("../config/redisConfig");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).send({
            stauts: "fail",
            message: "Unathorized Access",
            data: null,
        });
    }
    // check if store contains the session with this userId or not
    const data = yield redisConfig_1.redisClient.get("blog_app_raj_dave_node_js:" + req.sessionID);
    if (!data) {
        return res.status(401).send({
            stauts: "fail",
            message: "Unathorized Access",
            data: null,
        });
    }
    next();
});
exports.isAuth = isAuth;
