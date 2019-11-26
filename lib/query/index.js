"use strict";
/**
 * @module @steelbreeze/linq
 * generation, iteration and aggregation with deferred iterators.
 * Copyright 2019 David Mesquita-Morris
 * Licensed under the MIT licence; see LICENCE.md
 *
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./predicates"));
__export(require("./aggregators"));
__export(require("./generators"));
__export(require("./iterators"));
__export(require("./Enumerable"));
