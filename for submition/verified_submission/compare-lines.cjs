const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=__dirname;
const orig=fs.readFileSync(path.join(root,'reference/savannah_unit1.gaml'),'utf8');
const ai=fs.readFileSync(path.join(root,'savannah_baseline.gaml'),'utf8');
const a=orig.replace(/\r/g,'').split('\n'),b=ai.replace(/\r/g,'').split('\n');
const norm=s=>s.trim();
const dp=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));
for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)dp[i][j]=norm(a[i])===norm(b[j])?1+dp[i+1][j+1]:Math.max(dp[i+1][j],dp[i][j+1]);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\|/g,'&#124;').replace(/`/g,'&#96;')||'(blank)';
let out='# Complete line-by-line baseline comparison\n\nEvery original and baseline line appears once. Matching ignores leading/trailing whitespace only. Added/removed rows expose all changed lines; interpret paired changes using COMPARE.md.\n\n| Unit 1 line | AI baseline line | Status | Content |\n|---|---|---|---|\n';
let i=0,j=0;
while(i<a.length||j<b.length){
 if(i<a.length&&j<b.length&&norm(a[i])===norm(b[j])){out+=`| ${i+1} | ${j+1} | Same | <code>${esc(a[i])}</code> |\n`;i++;j++;}
 else if(j<b.length&&(i===a.length||dp[i][j+1]>=dp[i+1][j])){out+=`| - | ${j+1} | Added | <code>${esc(b[j])}</code> |\n`;j++;}
 else {out+=`| ${i+1} | - | Removed | <code>${esc(a[i])}</code> |\n`;i++;}
}
out+=`\nSource SHA-256: ${crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'reference/savannah_unit1.gaml'))).digest('hex')}\n`;
fs.writeFileSync(path.join(root,'LINE_BY_LINE.md'),out);
console.log(`Compared all ${a.length} handwritten lines with ${b.length} baseline lines.`);
