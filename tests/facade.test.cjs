'use strict';
const {chromium}=require('playwright'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH});try{
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.MODEL_URL||require('node:url').pathToFileURL(path.join(root,'dist/index.html')).href);await page.waitForFunction(()=>!!window.CASA_BUILDING);
 for(const phase of ['avant','apres']){
 const measured=await page.evaluate(phase=>{
 const A=CASA_BUILDING;A.setPhase(phase);A.setView('global');A.state.labels=false;A.apply();scene.updateMatrixWorld(true);
 const masonry=[];
 scene.traverse(o=>{if(!o.isMesh)return;let visible=true;for(let p=o;p;p=p.parent)if(!p.visible)visible=false;if(!visible)return;
 if(o.material===matWallS||o.material===matExteriorArch||o.name.startsWith('north.')||['context.bookshop.pier','context.bookshop.end_pier','attic.profiled_masonry'].includes(o.name)||o.name.startsWith('facade.continuous_'))masonry.push(o);});
 const samples=[];for(const [x,ys] of [[-12,[100,305,330,570,587]],[60,[100,305,330,570,587]],[385,[100,305,330,570,587]],[430,[100,305,330,570,587]],[900,[100,305,330,570,587]]])for(const y of ys){const ray=new THREE.Raycaster(new THREE.Vector3(x,y,-300),new THREE.Vector3(0,0,1));const hit=ray.intersectObjects(masonry,false)[0];samples.push({x,y,z:hit?.point.z,name:hit?.object.name});}
 const paint=ROOM_GROUP.getObjectByName('Entrance painted arch surround'),bounds=new THREE.Box3().setFromObject(paint);
 return {samples,paintDepth:bounds.max.z-bounds.min.z,paintFront:bounds.min.z,version:A.data.version};
 },phase);
 for(const p of measured.samples)assert(Math.abs(p.z+4)<.1,'Continuous street face: '+JSON.stringify(p));
 assert(measured.paintDepth<.1,'Entrance paint must not be a projecting frame');assert(Math.abs(measured.paintFront+4)<.1);
 await page.evaluate(()=>{target.set(380,290,0);theta=-1.05;phi=1.38;radius=690;cam();});await page.waitForTimeout(300);await page.screenshot({path:path.join(root,'test-results/facade-'+phase+'-junction.png')});
 await page.evaluate(()=>{target.set(930,290,0);theta=-1.8;phi=1.45;radius=1770;cam();});await page.waitForTimeout(300);await page.screenshot({path:path.join(root,'test-results/facade-'+phase+'-street.png')});
 console.log(phase,{samples:measured.samples.length,paintDepthCm:measured.paintDepth,version:measured.version});
 }
 assert.deepEqual(errors,[]);console.log('Street façade rays, flush painted surround and both phase checks passed.');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});
