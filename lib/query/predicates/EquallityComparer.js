"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function EquallityComparer(arg1, arg2) {
    return arg1 instanceof Date && arg2 instanceof Date ? arg1.toUTCString() === arg2.toUTCString() : Object.is(arg1, arg2);
}
exports.EquallityComparer = EquallityComparer;
