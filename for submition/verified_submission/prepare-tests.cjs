const fs=require('fs'),path=require('path');
const root=__dirname,dir=path.join(root,'validation','fixtures');fs.mkdirSync(dir,{recursive:true});
const source=fs.readFileSync(path.join(root,'savannah_extended.gaml'),'utf8');
const cases=[
 {name:'movement_cost',lions:1,zebras:0,energy:50,steps:3},
 {name:'multiple_prey',lions:1,zebras:2,energy:50,steps:1},
 {name:'starvation',lions:1,zebras:0,energy:0.025,steps:2},
 {name:'grazing',lions:0,zebras:2,energy:50,steps:2},
 {name:'unbounded_grass',lions:0,zebras:0,energy:50,steps:110}
];
for(const c of cases){
 let code=source.replace('int nb_lions <- 20;',`int nb_lions <- ${c.lions};`).replace('int nb_zebras <- 20;',`int nb_zebras <- ${c.zebras};`);
 code=code.replace('create zebra number: nb_zebras;',`create zebra number: nb_zebras;\n        ask lion { location <- {51,51}; speed <- 0.0; energy <- ${c.energy}; }\n        ask zebra { location <- {51,51}; speed <- 0.0; }\n        ask vegetation_cell { biomass <- 0.5; }`);
 code=code.replace('monitor "Lions"', 'monitor "TotalGrass" value: sum(vegetation_cell collect each.biomass);\n        monitor "Cells" value: length(vegetation_cell);\n        monitor "Lions"');
 fs.writeFileSync(path.join(dir,c.name+'.gaml'),code);
}
let smoke=source.replace('monitor "Lions"', 'monitor "Outside" value: length(lion where (each.location.x < 0 or each.location.x > 100 or each.location.y < 0 or each.location.y > 100)) + length(zebra where (each.location.x < 0 or each.location.x > 100 or each.location.y < 0 or each.location.y > 100));\n        monitor "Lions"');
fs.writeFileSync(path.join(dir,'smoke.gaml'),smoke);
cases.push({name:'smoke',steps:200});
const names=['Lions','Zebras','Grass','MinGrass','Energy','TotalGrass','Cells'];
fs.writeFileSync(path.join(root,'validation','acceptance.xml'),`<?xml version="1.0"?><Experiment_plan>${cases.map(c=>`<Simulation experiment="savannah_sim" finalStep="${c.steps}" id="${c.name}" seed="42.0" sourcePath="fixtures/${c.name}.gaml"><Parameters/><Outputs>${(c.name==='smoke'?['Lions','Zebras','Grass','MinGrass','Energy','Outside']:names).map((n,i)=>`<Output framerate="1" id="${i}" name="${n}"/>`).join('')}${c.name==='smoke'?'<Output framerate="199" id="20" name="main_display"/><Output framerate="199" id="21" name="population_chart"/><Output framerate="199" id="22" name="grass_chart"/>':''}</Outputs></Simulation>`).join('')}</Experiment_plan>`);
console.log('Prepared deterministic fixtures by changing initialization only; behavior is copied verbatim from final model.');
