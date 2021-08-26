"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
var isAdmin = true;
var checkAdmin = function (req, res, next) {
    //If admin is true access to the next method, else return a response
    isAdmin ? next() : res.status(401).json({ error: -1, descripcion: "Ruta " + req.originalUrl + ", metodo " + req.method + " no autorizado" });
};
exports.checkAdmin = checkAdmin;
