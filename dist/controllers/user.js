"use strict";
// Dada Ki Jay Ho
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const signup = (req, res) => {
    // get data from req.body
    // check if user exists with given email or not
    // save data
};
exports.signup = signup;
const login = (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    // check if password matches or not
    // store email in session
    // send response to user
};
exports.login = login;
