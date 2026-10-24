'use strict';
const {chromium}=require('playwright'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.MODEL_URL||require('node:url').pathToFileURL(path.join(root,'dist/index.html')).href);await page.waitForFunction(()=>!!window.CASA_BUILDING);
for(const phase of ['avant','apres']){
const closed=await page.evaluate(phase=>{const A=CASA_BUILDING,W=A.walk;A.setPhase(phase);W.start('landing');
function go(x,z){for(let i=0;i<800;i++){const p=W.state,dx=x-p.x,dz=z-p.z,l=Math.hypot(dx,dz);if(l<.1)return true;W.step(dx/l*Math.min(3,l),dz/l*Math.min(3,l));if(Math.hypot(W.state.x-p.x,W.state.z-p.z)<.001)return false;}return false;}
const exit=[[400,335],[400,365],[560,365]].every(([x,z])=>go(x,z)),wallBlocks=!go(560,280),stoppedZ=W.state.z;
const wall=A.data.walls.find(w=>w.id==='play_angle'),op=wall.openings.find(o=>o.id==='play_door'),L=Math.hypot(wall.b[0]-wall.a[0],wall.b[1]-wall.a[1]),u=[(wall.b[0]-wall.a[0])/L,(wall.b[1]-wall.a[1])/L],n=[-u[1],u[0]],k=(op.from+op.to)/2,c=[wall.a[0]+u[0]*k,wall.a[1]+u[1]*k],outer=[c[0]+n[0]*65,c[1]+n[1]*65],inner=[c[0]-n[0]*65,c[1]-n[1]*65];
const approach=go(640,440)&&go(...outer),doorBlocks=!go(...inner);window.playWallGo=go;window.playWallInner=inner;window.playWallOuter=outer;
const landing=A.data.stairEnclosure.upperLandingCm,xMax=Math.max(...landing.map(p=>p[0]));scene.updateMatrixWorld(true);const intrusions=[];A.phases[phase].walls.traverse(o=>{if(o.isMesh&&o.name.startsWith('play_boundary')){const b=new THREE.Box3().setFromObject(o);if(b.min.x<xMax-.01&&b.max.z>270+.01&&b.min.z<400)intrusions.push(o.name);}});
return{exit,wallBlocks,stoppedZ,approach,doorBlocks,intrusions,version:A.data.version};},phase);
assert(closed.exit&&closed.wallBlocks&&closed.stoppedZ>340&&closed.approach&&closed.doorBlocks,JSON.stringify(closed));assert.deepEqual(closed.intrusions,[]);
await page.evaluate(()=>CASA_BUILDING.doors.find(d=>d.phase===CASA_BUILDING.state.phase&&d.id==='play_door').target=1);await page.waitForFunction(()=>CASA_BUILDING.doors.find(d=>d.phase===CASA_BUILDING.state.phase&&d.id==='play_door').open>.999);
const pass=await page.evaluate(()=>({inside:window.playWallGo(...window.playWallInner),outside:window.playWallGo(...window.playWallOuter)}));assert(pass.inside&&pass.outside,JSON.stringify(pass));
await page.evaluate(()=>{CASA_BUILDING.walk.stop();CASA_BUILDING.setView('plan');CASA_BUILDING.state.labels=false;CASA_BUILDING.apply();});await page.waitForTimeout(150);
await page.evaluate(()=>{const c=CASA_BUILDING.activeCamera;c.left=-500;c.right=500;c.top=259;c.bottom=-259;c.position.set(550,3200,340);c.up.set(0,0,-1);c.lookAt(550,312,340);c.updateProjectionMatrix();});await page.waitForTimeout(150);await page.screenshot({path:path.join(root,'test-results/play-wall-'+phase+'-plan.png')});
console.log(phase,{...closed,...pass});
}
assert.deepEqual(errors,[]);console.log('Play wall checks passed: solid separator, landing clear, existing doorway works both ways in both phases.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});