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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
require("regenerator-runtime/runtime");
var cartclass_1 = require("../persistence/cartclass");
var CartController = /** @class */ (function () {
    function CartController() {
    }
    CartController.prototype.getProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id_producto, singleProduct, get, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        id_producto = req.params.id_producto;
                        if (!id_producto) return [3 /*break*/, 2];
                        return [4 /*yield*/, cartclass_1.cart.get(id_producto)];
                    case 1:
                        singleProduct = _a.sent();
                        if (singleProduct.length === 0) {
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ error: 'No existe un producto con este id' })];
                        }
                        return [2 /*return*/, res.json({ product: singleProduct })];
                    case 2: return [4 /*yield*/, cartclass_1.cart.get()];
                    case 3:
                        get = _a.sent();
                        if (get.length === 0) {
                            return [2 /*return*/, res.status(404).json({ error: 'No hay un carrito creado' })];
                        }
                        return [2 /*return*/, res.json({ cart: get })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CartController.prototype.addProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id_producto, productAdded, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id_producto = req.params.id_producto;
                        if (!id_producto) return [3 /*break*/, 2];
                        return [4 /*yield*/, cartclass_1.cart.add(id_producto)];
                    case 1:
                        productAdded = _a.sent();
                        return [2 /*return*/, productAdded.length === 0
                                ? res.status(404).json({ error: 'No existe producto con ese id' })
                                : res.json({ productAdded: productAdded })];
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CartController.prototype.deleteProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id_producto, deletedProduct, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id_producto = req.params.id_producto;
                        return [4 /*yield*/, cartclass_1.cart.delete(id_producto)];
                    case 1:
                        deletedProduct = _a.sent();
                        return [2 /*return*/, deletedProduct === -1
                                ? res.status(404).json({ error: 'Producto no encontrado o ya eliminado' })
                                : res.json({ deletedProduct: deletedProduct })];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CartController;
}());
exports.cartController = new CartController();