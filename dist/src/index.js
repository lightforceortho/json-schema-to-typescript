"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.compile = exports.compileFromFile = exports.DEFAULT_OPTIONS = void 0;
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var path_1 = require("path");
var formatter_1 = require("./formatter");
var generator_1 = require("./generator");
var normalizer_1 = require("./normalizer");
var optimizer_1 = require("./optimizer");
var parser_1 = require("./parser");
var resolver_1 = require("./resolver");
var utils_1 = require("./utils");
var validator_1 = require("./validator");
var util_1 = require("util");
var linker_1 = require("./linker");
exports.DEFAULT_OPTIONS = {
    $refOptions: {},
    bannerComment: "/* tslint:disable */\n/**\n* This file was automatically generated by json-schema-to-typescript.\n* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,\n* and run json-schema-to-typescript to regenerate this file.\n*/",
    cwd: process.cwd(),
    declareExternallyReferenced: true,
    enableConstEnums: true,
    format: true,
    ignoreMinAndMaxItems: false,
    strictIndexSignatures: false,
    style: {
        bracketSpacing: false,
        printWidth: 120,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false
    },
    unreachableDefinitions: false,
    unknownAny: true
};
function compileFromFile(filename, options) {
    if (options === void 0) { options = exports.DEFAULT_OPTIONS; }
    var contents = utils_1.Try(function () { return fs_1.readFileSync(filename); }, function () {
        throw new ReferenceError("Unable to read file \"" + filename + "\"");
    });
    var schema = utils_1.Try(function () { return JSON.parse(contents.toString()); }, function () {
        throw new TypeError("Error parsing JSON in file \"" + filename + "\"");
    });
    // NB: added mwhearty - support for tsImports property
    var bannerComment = __spreadArray([options.bannerComment], (schema['tsImports'] || [])).join('\n');
    return compile(schema, utils_1.stripExtension(filename), __assign(__assign({ cwd: path_1.dirname(filename) }, options), { bannerComment: bannerComment }));
}
exports.compileFromFile = compileFromFile;
function compile(schema, name, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        function time() {
            return "(" + (Date.now() - start) + "ms)";
        }
        var _options, start, errors, alwaysExported, dereferenced, linked, normalized, parsed, optimized, generated, formatted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _options = lodash_1.merge({}, exports.DEFAULT_OPTIONS, options);
                    start = Date.now();
                    errors = validator_1.validate(schema, name);
                    if (errors.length) {
                        errors.forEach(function (_) { return utils_1.error(_); });
                        throw new ValidationError();
                    }
                    if (process.env.VERBOSE) {
                        utils_1.log('green', 'validator', time(), '✅ No change');
                    }
                    // normalize options
                    if (!lodash_1.endsWith(_options.cwd, '/')) {
                        _options.cwd += '/';
                    }
                    alwaysExported = new Set(schema['tsAlwaysCreate'] || []);
                    return [4 /*yield*/, resolver_1.dereference(schema, _options)];
                case 1:
                    dereferenced = _a.sent();
                    if (process.env.VERBOSE) {
                        if (util_1.isDeepStrictEqual(schema, dereferenced)) {
                            utils_1.log('green', 'dereferencer', time(), '✅ No change');
                        }
                        else {
                            utils_1.log('green', 'dereferencer', time(), '✅ Result:', dereferenced);
                        }
                    }
                    linked = linker_1.link(dereferenced);
                    if (process.env.VERBOSE) {
                        utils_1.log('green', 'linker', time(), '✅ No change');
                    }
                    normalized = normalizer_1.normalize(linked, name, _options);
                    if (process.env.VERBOSE) {
                        if (util_1.isDeepStrictEqual(linked, normalized)) {
                            utils_1.log('yellow', 'normalizer', time(), '✅ No change');
                        }
                        else {
                            utils_1.log('yellow', 'normalizer', time(), '✅ Result:', normalized);
                        }
                    }
                    parsed = parser_1.parse(normalized, _options);
                    utils_1.log('blue', 'parser', time(), '✅ Result:', parsed);
                    optimized = optimizer_1.optimize(parsed);
                    if (process.env.VERBOSE) {
                        if (util_1.isDeepStrictEqual(parsed, optimized)) {
                            utils_1.log('cyan', 'optimizer', time(), '✅ No change');
                        }
                        else {
                            utils_1.log('cyan', 'optimizer', time(), '✅ Result:', optimized);
                        }
                    }
                    generated = generator_1.generate(optimized, alwaysExported, _options);
                    utils_1.log('magenta', 'generator', time(), '✅ Result:', generated);
                    formatted = formatter_1.format(generated, _options);
                    utils_1.log('white', 'formatter', time(), '✅ Result:', formatted);
                    return [2 /*return*/, formatted];
            }
        });
    });
}
exports.compile = compile;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
//# sourceMappingURL=index.js.map