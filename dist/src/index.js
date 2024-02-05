#! /usr/bin/env node
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
// @ts-ignore
import yargs from "yargs/yargs";
// @ts-ignore
import { fields, parse } from "git-log-parser";
// @ts-ignore
import { array } from "get-stream";
// @ts-ignore
import { analyzeCommits } from "@semantic-release/commit-analyzer";
Object.assign(fields, {
    hash: "H",
    message: "B",
    gitTags: "d",
    committerDate: {
        key: "ci",
        type: Date
    }
});
var getCommits = function() {
    var _ref = _async_to_generator(function(from) {
        var to, paths, result;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    to = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : "HEAD", paths = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : [
                        "--",
                        "../commerce"
                    ];
                    if (!from) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        array(parse({
                            _: [
                                "".concat(from ? from + ".." : "").concat(to)
                            ].concat(_to_consumable_array(paths))
                        }))
                    ];
                case 1:
                    result = _state.sent();
                    return [
                        2,
                        result.map(function(commit) {
                            var message = commit.message, gitTags = commit.gitTags, rest = _object_without_properties(commit, [
                                "message",
                                "gitTags"
                            ]);
                            if (typeof message === "string" && typeof gitTags === "string") {
                                return _object_spread_props(_object_spread({}, rest), {
                                    message: message.trim(),
                                    gitTags: gitTags.trim()
                                });
                            } else {
                                throw new Error("Invalid commit data");
                            }
                        })
                    ];
                case 2:
                    return [
                        2,
                        []
                    ];
            }
        });
    });
    return function getCommits(from) {
        return _ref.apply(this, arguments);
    };
}();
var argv = yargs(process.argv.slice(2)).scriptName("pipeline-detect-changes").usage("$0 <cmd> [args]").command("detect", "Detect changes", function(yargs) {
    yargs.option("from", {
        describe: "The commit hash to start from",
        type: "string"
    }).option("to", {
        describe: "The commit hash to end at",
        default: "HEAD",
        type: "string"
    }).option("path", {
        describe: "The path to search for changes",
        type: "string"
    });
}, function() {
    var _ref = _async_to_generator(function(argv) {
        var paths, from, to, commits, result;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    // @ts-ignore
                    paths = argv.path ? [
                        "--",
                        argv.path
                    ] : [];
                    from = argv.from, to = argv.to;
                    return [
                        4,
                        getCommits(from, to, paths)
                    ];
                case 1:
                    commits = _state.sent();
                    return [
                        4,
                        analyzeCommits({}, {
                            commits: commits,
                            logger: console
                        })
                    ];
                case 2:
                    result = _state.sent();
                    if (result === null) {
                        return [
                            2,
                            process.exit(0)
                        ];
                    }
                    return [
                        2,
                        process.exit(1)
                    ];
            }
        });
    });
    return function(argv) {
        return _ref.apply(this, arguments);
    };
}()).parse();
