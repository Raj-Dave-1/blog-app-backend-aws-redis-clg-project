"use strict";
// Dada Ki Jay Ho
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = exports.signup = void 0;
const bcrypt = __importStar(require("bcrypt"));
const data_source_1 = require("../data-source");
const user_1 = require("../entities/user");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get data from req.body
    const user = req.body;
    // check if user exists with given email or not
    if (yield data_source_1.AppDataSource.manager
        .getRepository(user_1.User)
        .findOneBy({ email: user.email }))
        throw new Error("User with this email aleady exists");
    // create newUser
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    user.salt = salt;
    // save data
    const result = yield data_source_1.AppDataSource.manager.getRepository(user_1.User).save(user);
    if (!result)
        return res.status(500).send({
            status: "fail",
            message: "something went wrong while creating user",
            data: null,
        });
    // generate the session and store it
    req.session.userId = result.id;
    return res.status(201).send({
        status: "success",
        message: "user signup successfull",
        data: result,
    });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // check if user exists or not
    const user = yield data_source_1.AppDataSource.getRepository(user_1.User).findOneBy({ email });
    if (!user)
        return res.status(404).send({
            status: "fail",
            message: "user does not found with this email",
            data: null,
        });
    // check if password matches or not
    if ((yield bcrypt.compare(password, user.password)) === false)
        return res.status(404).send({
            status: "fail",
            message: "unauthorized access! credentials does not match!",
            data: null,
        });
    // store user id in session
    req.session.userId = user.id;
    // send response to user
    return res.status(200).send({
        status: "success",
        message: "user login successfull",
        data: user,
    });
});
exports.login = login;
