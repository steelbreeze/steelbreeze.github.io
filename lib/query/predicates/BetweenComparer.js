"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BetweenComparer(value, span) {
    return (!span.from || value >= span.from) && (!span.to || value <= span.to);
}
exports.BetweenComparer = BetweenComparer;
