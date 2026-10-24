'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.MODEL_URL||'file:///'+path.join(root,'dist/index.html').replaceAll('\\','/'));await page.waitForFunction(()=>!!window.CASA_BUILDING);
 for(const phase of ['avant','apres']){
 const result=await page.evaluate(phase=>{
 const A=CASA_BUILDING,W=A.walk;A.setPhase(phase);W.start('landing');W.capture();
 function go(x,z){for(let i=0;i<700;i++){const p=W.state,dx=x-p.x,dz=z-p.z,d=Math.hypot(dx,dz);if(d<.12)return true;W.step(dx/d*Math.min(d,3),dz/d*Math.min(d,3));if(Math.hypot(W.state.x-p.x,W.state.z-p.z)<.001)return false;}return false;}
 const entry=[[404,335],[404,235],[404,135],[404,40]].every(([x,z])=>go(x,z)),height=W.state.feet;
 const groundRay=new THREE.Raycaster(new THREE.Vector3(404,500,135),new THREE.Vector3(0,-1,0));const floor=groundRay.intersectObject(A.root.getObjectByName('landing_recess.floor'))[0]?.point.y;
 go(404,135);go(340,135);const guardStop=W.state.x;go(404,135);go(480,135);const wallStop=W.state.x;
 const returnToStair=go(404,335)&&go(300,335);
 W.setSpawn('recess');
 return {entry,height,floor,guardStop,wallStop,returnToStair,version:A.data.version};},phase);
 assert(result.entry&&result.returnToStair,JSON.stringify(result));assert.equal(result.height,312);assert(Math.abs(result.floor-312.3)<.01);
 assert(result.guardStop>=390&&result.guardStop<404,'guard contains visitor '+JSON.stringify(result));assert(result.wallStop>404&&result.wallStop<=416,'partition contains visitor '+JSON.stringify(result));
 await page.waitForTimeout(300);await page.screenshot({path:path.join(root,'test-results/recess-'+phase+'-walk.png')});
 await page.evaluate(()=>{CASA_BUILDING.walk.stop();CASA_BUILDING.setView('interior');CASA_BUILDING.state.level='r1';CASA_BUILDING.state.walls='cut';CASA_BUILDING.state.labels=false;CASA_BUILDING.apply();target.set(300,330,180);theta=-.75;phi=.7;radius=1100;cam();});
 await page.waitForTimeout(300);await page.screenshot({path:path.join(root,'test-results/recess-'+phase+'-cutaway.png')});
 console.log(phase,result);
 }
 for(const lang of ['fr','ro','en']){await page.evaluate(lang=>{CASA_I18N.setLanguage(lang);CASA_BUILDING.walk.start('recess');CASA_BUILDING.walk.capture();},lang);await page.waitForTimeout(180);const label=await page.locator('#walkSpawn option[value=recess]').textContent();assert(!label.includes('undefined'));if(lang!=='fr')assert(!label.includes('Renfoncement'));await page.evaluate(()=>{CASA_BUILDING.walk.stop();document.querySelector('#photoButtons').lastElementChild.click();});await page.waitForFunction(()=>document.querySelector('#referencePhoto').naturalWidth>0);const observation=await page.locator('#photoObservation').textContent(),assumption=await page.locator('#assumptionsList .assumption').last().textContent();assert(observation.includes('50 cm'));if(lang!=='fr'){assert(!observation.includes('largeur annotée'));assert(!assumption.includes('renfoncement longeant'));}await page.evaluate(()=>document.querySelector('#photoDialog').close());}
 assert.deepEqual(errors,[]);console.log('Landing recess walk, geometry, containment and language checks passed.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
