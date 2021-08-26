"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cart_1 = require("../controllers/cart");
var router = express_1.Router();
router.get('/listar/:id_producto?', cart_1.cartController.getProducts);
router.post('/agregar/:id_producto', cart_1.cartController.addProducts);
router.delete('/borrar/:id_producto', cart_1.cartController.deleteProducts);
exports.default = router;
