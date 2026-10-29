const fs=require('fs'), path=require('path'), assert=require('assert');
const [stage,folder,log]=process.argv.slice(2);
const xml=fs.readFileSync(path.join(__dirname,'validation',folder,`simulation-outputsF${stage}.xml`),'utf8');
const steps=[...xml.matchAll(/<Step id='(\d+)' >([\s\S]*?)<\/Step>/g)].map(m=>Object.fromEntries([...m[2].matchAll(/<Variable name='([^']+)'[^>]*>(.*?)<\/Variable>/g)].map(v=>[v[1],v[2]])));
assert.equal(steps.length,20,'20 complete output steps required');
if(log) {const b=fs.readFileSync(log); const t=b[0]===255&&b[1]===254?b.toString('utf16le'):b.toString('utf8');assert(!/java\.lang\.|Java error:|Error in|compilation error/i.test(t),'Runtime/compilation error in log');}
for(const s of steps){ assert.equal(+s.Lions,20); assert(+s.Zebras>=0&&+s.Zebras<=20); }
if(+stage===2){
  for(const name of ['LionPosition','ZebraPosition']){
    assert.notEqual(steps[0][name],steps[19][name],`${name} must change`);
    for(const s of steps){const coords=s[name].match(/[-\d.]+/g).map(Number);assert(coords[0]>=0&&coords[0]<=100&&coords[1]>=0&&coords[1]<=100);}
  }
}
if(+stage>=3) {for(let i=1;i<steps.length;i++) assert(+steps[i].Zebras<=+steps[i-1].Zebras);assert(+steps[19].Zebras<20,'at least one kill');}
if(+stage>=4){for(const s of steps) assert(+s.MinGrass>=0);}
if(+stage===4||+stage===5){for(let i=1;i<steps.length;i++) assert(Math.abs((+steps[i].Grass)-(+steps[i-1].Grass)-0.1)<1e-8,'linear grass growth');}
if(+stage===7)assert(+steps[19].Energy>49,'hunting offsets movement costs in this run');
console.log(JSON.stringify({stage,steps:steps.length,first:steps[0],last:steps.at(-1),status:'PASS'},null,2));
