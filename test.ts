import { selectMany, toArray } from './lib/query';
import * as layout from './layout';

const applications = layout.getDemoData();

const scenarios = layout.optimise(applications, "product", "capability", layout.bruteForce);

//if(scenarios.length !== 0) {
//	const scenario = scenarios[0];
//	const matrix = layout.prepare(applications, scenario);

//	for (const row of matrix) {
//		console.log(toArray(selectMany(row, cell => cell, (cell, app) => app.name)));
//	}
//}
