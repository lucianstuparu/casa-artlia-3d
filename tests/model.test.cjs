'use strict';
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),root=path.resolve(__dirname,'..');
const d=JSON.parse(fs.readFileSync(path.join(root,'dist/building-data.json'),'utf8'));
assert.equal(d.units,'cm');assert.equal(d.coordinateSystem.levels['R+1'],312);
assert.equal(d.stairEnclosure.backInnerFaceZ,400);assert.equal(d.stairEnclosure.sideInnerFaceX,0);assert.equal(d.stairEnclosure.wallHeightCm,580);
assert(!d.walls.some(w=>w.id==='play_lower'),'C01: the removed landing obstruction must stay absent');
assert(d.reconstructionCorrections.some(c=>c.id==='C02_stair_wall_contact'));
for(const w of d.walls){const length=Math.hypot(w.b[0]-w.a[0],w.b[1]-w.a[1]);assert(length>0);for(const o of w.openings){assert(o.from>=0&&o.to>o.from&&o.to<=length+.1,w.id+' opening outside wall');}}
assert.equal(d.sources.photoEvidence.length,7);assert.equal(d.exterior.landing.z1-d.exterior.landing.z0,600);
const h=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');assert(!h.includes('<script src="http'),'Standalone app must embed its runtime');assert(h.includes('C02_stair_wall_contact'));
console.log('Model data checks passed ('+d.version+').');
