'use strict';
const {chromium}=require('playwright'),path=require('path'),assert=require('node:assert/strict'),fs=require('fs');
const root=path.resolve(__dirname,'..');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.MODEL_URL||require('node:url').pathToFileURL(path.join(root,'dist/index.html')).href);await page.waitForFunction(()=>!!window.CASA_BUILDING);
 for(const phase of ['avant','apres']){
 const closed=await page.evaluate(phase=>{
 const A=CASA_BUILDING,W=A.walk;A.setPhase(phase);W.start('main');
 const wall=A.data.walls.find(w=>w.id==='main_corridor'),op=wall.openings.find(o=>o.id==='main_door'),z=wall.a[1]+(op.from+op.to)/2;
 const doors=A.doors.filter(d=>d.phase===phase&&d.id==='main_door');if(doors.length!==1)throw Error('Main access must have one door per phase');
 const d=doors[0],leaf=d.pivot.getObjectByName('door_leaf.main_door');scene.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(leaf);
 const correction=A.data.reconstructionCorrections.find(c=>c.id==='C06_main_room_access'),old=correction.originalWalls[0],L=Math.hypot(old.b[0]-old.a[0],old.b[1]-old.a[1]),u=[(old.b[0]-old.a[0])/L,(old.b[1]-old.a[1])/L],n=[-u[1],u[0]],mid=(old.openings[0].from+old.openings[0].to)/2,c=[old.a[0]+u[0]*mid,old.a[1]+u[1]*mid],meshes=[];
 A.phases[phase].walls.traverse(o=>{if(o.isMesh&&o.name.startsWith('main_angle.'))meshes.push(o);});
 const ray=new THREE.Raycaster(new THREE.Vector3(c[0]+n[0]*80,412,c[1]+n[1]*80),new THREE.Vector3(-n[0],0,-n[1]),0,160),oldOpeningClosed=ray.intersectObjects(meshes,false).length>0;
 function go(x,tz){for(let i=0;i<800;i++){const p=W.state,dx=x-p.x,dz=tz-p.z,d=Math.hypot(dx,dz);if(d<.1)return true;W.step(dx/d*Math.min(d,3),dz/d*Math.min(d,3));if(Math.hypot(W.state.x-p.x,W.state.z-p.z)<.001)return false;}return false;}
 const approach=go(wall.a[0]+70,z),blocked=!go(wall.a[0]-70,z),x=W.state.x;window.mainDoorTestGo=go;window.mainDoorTestZ=z;
 return{approach,blocked,x,wallX:wall.a[0],z,oldOpeningClosed,leafX:bounds.max.x-bounds.min.x,leafZ:bounds.max.z-bounds.min.z,version:A.data.version};
 },phase);
 assert(closed.approach&&closed.blocked&&closed.x>closed.wallX&&closed.oldOpeningClosed,JSON.stringify(closed));assert(closed.leafX<4&&closed.leafZ>90,'Door leaf must lie along the straight wall');
 await page.evaluate(()=>CASA_BUILDING.doors.find(d=>d.phase===CASA_BUILDING.state.phase&&d.id==='main_door').target=1);
 await page.waitForFunction(()=>CASA_BUILDING.doors.find(d=>d.phase===CASA_BUILDING.state.phase&&d.id==='main_door').open>.999);
 const walk=await page.evaluate(()=>{const A=CASA_BUILDING,W=A.walk,x=A.data.walls.find(w=>w.id==='main_corridor').a[0],z=window.mainDoorTestZ;return{out:window.mainDoorTestGo(x-70,z),back:window.mainDoorTestGo(x+70,z),feet:W.state.feet};});assert(walk.out&&walk.back&&walk.feet===312,JSON.stringify(walk));
 await page.evaluate(()=>{CASA_BUILDING.walk.stop();const d=CASA_BUILDING.doors.find(d=>d.phase===CASA_BUILDING.state.phase&&d.id==='main_door');d.target=0;CASA_BUILDING.setView('plan');CASA_BUILDING.state.labels=false;CASA_BUILDING.apply();});
 await page.waitForTimeout(700);
 await page.evaluate(()=>{const c=CASA_BUILDING.activeCamera;c.left=-350;c.right=350;c.top=181;c.bottom=-181;c.position.set(800,3200,450);c.up.set(0,0,-1);c.lookAt(800,312,450);c.updateProjectionMatrix();});
 await page.waitForTimeout(120);await page.screenshot({path:path.join(root,'test-results/main-door-'+phase+'-plan.png')});
 console.log(phase,{...closed,...walk});
 }
 assert.deepEqual(errors,[]);console.log('Main access checks passed: diagonal closed, straight door blocks/opens, both-way walking in both phases.');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});
