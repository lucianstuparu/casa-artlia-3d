'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('path');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.MODEL_URL||require('node:url').pathToFileURL(path.resolve(__dirname,'../dist/index.html')).href);await page.waitForFunction(()=>!!window.CASA_BUILDING);
for(const phase of ['avant','apres']){
const measured=await page.evaluate(phase=>{const A=CASA_BUILDING,W=A.walk;A.setPhase(phase);W.start('landing');scene.updateMatrixWorld(true);const meshes=[];A.phases[phase].walls.traverse(o=>{if(o.isMesh)meshes.push(o);});
const origin=new THREE.Vector3(470,412,400),sample=dir=>new THREE.Raycaster(origin,new THREE.Vector3(0,0,dir),0,200).intersectObjects(meshes,false)[0],n=sample(-1),f=sample(1);
function go(x,z){for(let i=0;i<800;i++){const p=W.state,dx=x-p.x,dz=z-p.z,d=Math.hypot(dx,dz);if(d<.1)return true;W.step(dx/d*Math.min(3,d),dz/d*Math.min(3,d));if(Math.hypot(W.state.x-p.x,W.state.z-p.z)<.001)return false;}return false;}
const upper=[[400,335],[400,365],[560,365],[400,365]].every(([x,z])=>go(x,z)),lower=[[400,440],[560,440],[400,440],[400,335],[300,335]].every(([x,z])=>go(x,z)),feet=W.state.feet;
go(400,430);const workshopBlocks=!go(300,430);go(400,430);const rearBox=new THREE.Box3().setFromObject(A.stairRearWall);
return{width:f.point.z-n.point.z,near:n.point.z,far:f.point.z,nearWall:n.object.name,farWall:f.object.name,upper,lower,workshopBlocks,feet,rear:{min:rearBox.min.toArray(),max:rearBox.max.toArray()},version:A.data.version};},phase);
assert(Math.abs(measured.width-122)<.01,JSON.stringify(measured));assert(measured.upper&&measured.lower&&measured.workshopBlocks&&measured.feet===312,JSON.stringify(measured));assert.deepEqual(measured.rear,{min:[0,0,400],max:[372,580,407]});
await page.evaluate(()=>{CASA_BUILDING.walk.stop();CASA_BUILDING.setView('plan');CASA_BUILDING.state.labels=false;CASA_BUILDING.apply();});await page.waitForTimeout(120);
await page.evaluate(()=>{const c=CASA_BUILDING.activeCamera;c.left=-430;c.right=430;c.top=222;c.bottom=-222;c.position.set(530,3200,430);c.up.set(0,0,-1);c.lookAt(530,312,430);c.updateProjectionMatrix();});await page.waitForTimeout(120);await page.screenshot({path:path.resolve(__dirname,'../test-results/hall-'+phase+'-plan.png')});
await page.evaluate(()=>{CASA_BUILDING.setView('interior');CASA_BUILDING.state.level='r1';CASA_BUILDING.state.walls='cut';CASA_BUILDING.state.labels=false;CASA_BUILDING.apply();target.set(475,350,410);theta=-1.9;phi=.65;radius=750;cam();});await page.waitForTimeout(150);await page.screenshot({path:path.resolve(__dirname,'../test-results/hall-'+phase+'-cutaway.png')});console.log(phase,measured);
}
assert.deepEqual(errors,[]);console.log('Hall clearance, two walking lanes, workshop enclosure and original stair core passed in both phases.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});