const fs = require('fs');
const path = require('path');
const stage = Number(process.argv[2]);
const root = __dirname;
const original = fs.readFileSync(path.resolve(root, '../../..', 'assignement1/savannah (1).gaml'), 'utf8');
let code = original.slice(original.indexOf('model Savannah'));
code = code.replace('model Savannah', 'model SavannahAI');
code = code.replace('global {', 'global {\n    geometry shape <- square(100 #m);');
if (stage < 3) code = code.replace(/\s*\/\/ when a lion[\s\S]*?\n\t}\n/, '\n');
if (stage < 4) {
  code = code.replace(/grid vegetation_cell[\s\S]*?\/\/ ---------- SIMULATION ----------/, '// ---------- SIMULATION ----------');
  code = code.replace(/\s*grid vegetation_cell;/, '');
}
if (stage < 5) {
  code = code.replace(/\s*graphics "Stats"[\s\S]*?\n\t\t\t}/, '');
  code = code.replace(/\s*display population_chart[\s\S]*?\n\t\t}/, '');
} else {
  code = code.replace('display main_display {', 'display main_display axes: false {');
  const at = code.lastIndexOf('\n\t}');
  code = code.slice(0, at) + '\n        display grass_chart {\n            chart "Mean grass biomass (kg per cell)" type: series {\n                data "Biomass" value: mean(vegetation_cell collect each.biomass) color: #green;\n            }\n        }\n' + code.slice(at);
}
if (stage >= 6) {
  code = code.replace('model SavannahAI', 'model SavannahExtended');
  const pos = code.indexOf('species zebra');
  code = code.slice(0, pos) + code.slice(pos).replace('\n\taspect base {', '\n    // Consume only available grass from the cell containing this zebra.\n    reflex eat {\n        vegetation_cell patch <- vegetation_cell first_with (each.shape covers location);\n        if (patch != nil) {\n            float eaten <- min(1.0, patch.biomass);\n            patch.biomass <- patch.biomass - eaten;\n        }\n    }\n\n\taspect base {');
}
if (stage >= 7) {
  code = code.replace('float speed <- 1.0;', 'float speed <- 1.0;\n    float energy <- 50.0;');
  code = code.replace('do wander;', 'do wander;\n        energy <- energy - 0.05;');
  code = code.replace('ask zebra at_distance 2.0 {\n\t\t\tdo die;\n\t\t}', 'list<zebra> prey <- zebra at_distance 2.0;\n        energy <- energy + 10.0 * length(prey);\n        ask prey { do die; }');
  code = code.replace('\n\taspect base {', '\n    // Hunting precedes starvation, so food can rescue a lion this step.\n    reflex starve when: energy <= 0 { do die; }\n\n\taspect base {');
}
const file = stage >= 6 ? 'savannah_extended.gaml' : 'savannah_baseline.gaml';
code = code.replace('    geometry shape', '    // Explicit 100 m world, as required by SPEC.md.\n    geometry shape');
// Monitors expose real GAMA state to the headless acceptance run.
code = code.replace('experiment savannah_sim type: gui {', `experiment savannah_sim type: gui {`);
code = code.replace('\n\toutput {', '\n\toutput {\n        monitor "Lions" value: length(lion);\n        monitor "Zebras" value: length(zebra);' + (stage === 2 ? '\n        monitor "LionPosition" value: lion[0].location;\n        monitor "ZebraPosition" value: zebra[0].location;' : '') + (stage >= 4 ? '\n        monitor "Grass" value: mean(vegetation_cell collect each.biomass);\n        monitor "MinGrass" value: min(vegetation_cell collect each.biomass);' : '') + (stage >= 7 ? '\n        monitor "Energy" value: mean(lion collect each.energy);' : ''));
fs.writeFileSync(path.join(root, file), code, 'utf8');
const out = ['Lions','Zebras', ...(stage===2?['LionPosition','ZebraPosition']:[]), ...(stage >= 4 ? ['Grass','MinGrass'] : []), ...(stage>=7?['Energy']:[])];
fs.mkdirSync(path.join(root,'validation'), {recursive:true});
fs.writeFileSync(path.join(root, 'validation', `F${stage}.xml`), `<?xml version="1.0"?><Experiment_plan><Simulation experiment="savannah_sim" finalStep="20" id="F${stage}" seed="42.0" sourcePath="../${file}"><Parameters/><Outputs>${out.map((name,i)=>`<Output framerate="1" id="${i}" name="${name}"/>`).join('')}</Outputs></Simulation></Experiment_plan>`);
console.log(`Created stage ${stage}: ${file}`);
