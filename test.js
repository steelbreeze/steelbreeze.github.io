"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const layout = __importStar(require("./layout"));
const applications = layout.getDemoData();
const scenarios = layout.optimise(applications, "product", "capability", layout.bruteForce);
//if(scenarios.length !== 0) {
//	const scenario = scenarios[0];
//	const matrix = layout.prepare(applications, scenario);
//	for (const row of matrix) {
//		console.log(toArray(selectMany(row, cell => cell, (cell, app) => app.name)));
//	}
//}
