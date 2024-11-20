"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignIn = exports.UserSignUp = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_validator_1 = require("../utils/validators/auth.validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const UserSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const isValidData = auth_validator_1.UserSchema.safeParse({ email, password });
        if (!isValidData.success) {
            res.status(411).json({
                message: "Validation Error",
            });
            return;
        }
        const existedUser = yield user_model_1.default.findOne({
            email: email,
        });
        if (existedUser) {
            res.status(403).json({
                message: "User already existed",
            });
            return;
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newUser = new user_model_1.default({
            email: email,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(200).json({
            message: "User Registered Successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.UserSignUp = UserSignUp;
const UserSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const isValidData = auth_validator_1.UserSchema.safeParse({ email, password });
        if (!isValidData.success) {
            res.status(400).json({
                message: "Validation Error",
            });
            return;
        }
        const existedUser = yield user_model_1.default.findOne({
            email: email,
        });
        if (!existedUser) {
            res.status(403).json({
                message: "Wrong email",
            });
        }
        if (existedUser) {
            const isPasswordValid = yield bcrypt_1.default.compare(password, existedUser.password);
            if (!isPasswordValid) {
                res.status(403).json({
                    message: "Invalid Password",
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                id: existedUser._id,
            }, config_1.JWT_PASSWORD);
            res.status(200).json({
                message: "User Logged In Successfully",
                token,
                user: Object.assign(Object.assign({}, existedUser.toObject()), { password: undefined }),
            });
        }
    }
    catch (error) {
        console.error("error during login", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.UserSignIn = UserSignIn;
