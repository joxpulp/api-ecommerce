"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./services/server"));
var port = process.env.PORT || 8080;
server_1.default.listen(port, function () { return console.log("Server running in port: " + port); });
server_1.default.on('error', function (error) { return console.error("There was an error: " + error); });
