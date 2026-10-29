const fs=require('fs'),path=require('path'),assert=require('assert');
const dir=path.join(__dirname,'validation','acceptance');
function read(n,steps){const x=fs.readFileSync(path.join(dir,`simulation-outputs${n}.xml`),'utf8');const out=[...x.matchAll(/<Step id='(\d+)' >([\s\S]*?)<\/Step>/g)].map(m=>Object.fromEntries([...m[2].matchAll(/<Variable name='([^']+)'[^>]*>(.*?)<\/Variable>/g)].map(v=>[v[1],Number(v[2])])));assert.equal(out.length,steps,n);return out;}
const near=(v,e)=>assert(Math.abs(v-e)<1e-7,`${v} != ${e}`);
const results=[];
let s=read('movement_cost',3);near(s[0].Energy,49.95);near(s[2].Energy,49.85);assert.equal(s[2].Lions,1);results.push({test:'movement_cost',status:'PASS',energy:s.map(x=>x.Energy),note:'One wander action costs 0.05, even with zero speed in controlled fixture.'});
s=read('multiple_prey',1);assert.equal(s[0].Zebras,0);near(s[0].Energy,69.95);results.push({test:'multiple_prey',status:'PASS',...s[0]});
s=read('starvation',2);assert.equal(s[0].Lions,0);assert.equal(s[1].Lions,0);results.push({test:'starvation',status:'PASS',lions:s.map(x=>x.Lions)});
s=read('grazing',2);assert.equal(s[0].Cells,2500);near(s[0].TotalGrass,1499.5);near(s[1].TotalGrass,1749.4);for(const a of s) assert(a.MinGrass>=0);results.push({test:'grazing',status:'PASS',...s[0],secondTotal:s[1].TotalGrass});
s=read('unbounded_grass',110);near(s[0].Grass,0.6);near(s[109].Grass,11.5);results.push({test:'unbounded_grass',status:'PASS',first:s[0].Grass,last:s[109].Grass});
s=read('smoke',200);for(const [i,a] of s.entries()){assert.equal(a.Outside,0);assert(a.MinGrass>=0);assert.equal(a.Lions,20);assert(a.Zebras>=0);near(a.Energy,50-0.05*(i+1)+10*(20-a.Zebras)/20);}for(let i=1;i<s.length;i++)assert(s[i].Zebras<=s[i-1].Zebras);results.push({test:'200_step_smoke',status:'PASS',first:s[0],last:s.at(-1)});
if(process.argv[2]){const b=fs.readFileSync(process.argv[2]);const t=b[0]===255&&b[1]===254?b.toString('utf16le'):b.toString('utf8');assert(!/java\.lang\.|Java error:|Error in|compilation error/i.test(t),'GAMA run log contains an error');}
fs.writeFileSync(path.join(__dirname,'validation','test-results.json'),JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
