'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
(async()=>{let server,browser;const results=path.resolve(__dirname,'../test-results');fs.mkdirSync(results,{recursive:true});
try{
 const catalog=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../src/i18n-catalog.json'),'utf8'));for(const [key,value] of Object.entries(catalog))for(const locale of ['ro','en'])assert(typeof value[locale]==='string'&&value[locale].length>0,'Missing '+locale+': '+key);
 let url=process.env.APP_URL;if(!url){server=spawn(process.execPath,[path.resolve(__dirname,'../scripts/serve.cjs')],{env:{...process.env,PORT:'0'},stdio:['ignore','pipe','pipe'],windowsHide:true});url=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Preview server did not start')),10000);server.once('error',reject);server.stdout.on('data',b=>{const m=String(b).match(/http:\/\/127\.0\.0\.1:\d+/);if(m){clearTimeout(timer);resolve(m[0]);}});});}
 browser=await chromium.launch({headless:true,...(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH}:{})});
 const p=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(url);await p.waitForFunction(()=>!!window.CASA_BUILDING);
 const before=await p.evaluate(()=>JSON.stringify(CASA_BUILDING.data));await p.selectOption('#viewSelect','interior');await p.click('#buildingToggle');
 const words={fr:{room:'Jeu principal',visit:'Visiter',sources:'Sources'},ro:{room:'Sala principală de joacă',visit:'Vizitează',sources:'Surse'},en:{room:'Main playroom',visit:'Walk through',sources:'Sources'}};
 for(const lang of ['ro','en','fr','ro','en']){
  await p.selectOption('#languageSelect',lang);await p.waitForTimeout(120);
  assert.equal(await p.evaluate(()=>document.documentElement.lang),lang);
  assert((await p.locator('[data-view=walk]').textContent()).includes(words[lang].visit));
  assert((await p.locator('#roomInventory').textContent()).includes(words[lang].room));
  const labels=await p.evaluate(()=>{const labels=[];scene.traverse(o=>{if(o.userData.sourceLabelLines)labels.push({source:o.userData.sourceLabelLines,lines:o.userData.labelLines,language:o.userData.labelLanguage});});return labels;});
  assert(labels.length>40);assert(labels.every(x=>x.language===lang));assert(labels.some(x=>x.lines.includes(words[lang].room)));
  await p.click('#tabSources');await p.locator('#assumptionsDetail summary').click();
  assert(!(await p.locator('#assumptionsList').textContent()).includes(lang==='fr'?'_missing_':'ERP et relevé v10 diffèrent'));
  await p.click('#planSourceBtn');await p.waitForFunction(()=>document.querySelector('#sourcePlan').naturalWidth>0);assert((await p.locator('#planTitle').textContent()).includes(lang==='ro'?'După':lang==='en'?'After':'Après'));await p.keyboard.press('Escape');await p.click('#tabRooms');
 }
 const count=await p.evaluate(()=>CASA_I18N.canvasLabelCount);assert.equal(await p.evaluate(()=>JSON.stringify(CASA_BUILDING.data)),before,'Translation must not alter source geometry/evidence');
 await p.selectOption('#roomSelect','main');await p.waitForTimeout(60);assert((await p.locator('#roomCardContent').textContent()).includes('Printed ERP area:'));
 await p.click('#panelClose');await p.selectOption('#viewSelect','rdc');await p.click('#equipmentToggle');await p.waitForTimeout(180);assert((await p.locator('#liftReadout').textContent()).includes('Current zone'));
 await p.locator('#liftPos').fill('500');await p.locator('#liftPos').dispatchEvent('input');await p.waitForTimeout(150);assert((await p.locator('#liftReadout').textContent()).includes('Lower')||(await p.locator('#liftReadout').textContent()).includes('Upper'));
 await p.selectOption('#liftModel','ascendor_plk8');await p.waitForTimeout(200);assert((await p.locator('#liftModelInfo').textContent()).includes('distributed by Altica'));await p.selectOption('#liftModel','ganser_gtle');await p.click('#liftToggle');
 await p.click('[data-view=walk]');await p.click('#walkStart');const position=await p.evaluate(()=>{const s=CASA_BUILDING.walk.state;return [s.x,s.z,s.yaw,s.feet,s.engaged];});
 await p.selectOption('#languageSelect','ro');await p.waitForTimeout(120);assert.deepEqual(await p.evaluate(()=>{const s=CASA_BUILDING.walk.state;return [s.x,s.z,s.yaw,s.feet,s.engaged];}),position);assert((await p.locator('#walkPause').textContent()).includes('Pauză'));await p.click('#walkPause');assert((await p.locator('#walkIntro').textContent()).includes('Trage'));await p.click('#walkExit');await p.reload();await p.waitForFunction(()=>!!window.CASA_BUILDING);assert.equal(await p.evaluate(()=>document.documentElement.lang),'ro');assert.equal(new URL(p.url()).searchParams.get('lang'),'ro');
 await p.goto(url+(url.includes('?')?'&':'?')+'lang=en');await p.waitForFunction(()=>!!window.CASA_BUILDING);assert.equal(await p.evaluate(()=>document.documentElement.lang),'en');
 const viewports=[];for(const [w,h] of [[320,480],[375,812],[844,390],[1440,900]])for(const lang of ['fr','ro','en']){
  const page=await browser.newPage({viewport:{width:w,height:h},hasTouch:w<800});page.on('pageerror',e=>errors.push(e.message));await page.goto(url+'?lang='+lang);await page.waitForFunction(()=>!!window.CASA_BUILDING);
  for(const state of ['overview','inspector','walking']){
   if(state==='inspector')await page.click('#buildingToggle');if(state==='walking'){await page.click('#panelClose');await page.click('[data-view=walk]');await page.click('#walkStart');}
   const m=await page.evaluate(()=>{const c=renderer.domElement.getBoundingClientRect(),region=document.querySelector('#actionRegion').getBoundingClientRect(),main=document.querySelector('body.walkMode #walkPause,body:not(.walkMode) [data-view=walk]').getBoundingClientRect(),lang=document.querySelector('#languageSelect').getBoundingClientRect();return{overflow:document.documentElement.scrollWidth>innerWidth,stage:c.height,buttonVisible:main.x>=0&&main.right<=innerWidth&&main.bottom<=innerHeight&&main.y>=region.y,languageVisible:lang.x>=0&&lang.right<=innerWidth&&lang.bottom<c.top};});
   assert(!m.overflow&&m.stage>80&&m.buttonVisible&&m.languageVisible,JSON.stringify({w,h,lang,state,...m}));viewports.push({w,h,lang,state});
  }
  if([375,1440].includes(w))await page.screenshot({path:path.join(results,'language-'+lang+'-'+w+'.png')});await page.close();
 }
 const offline=await browser.newContext({offline:true});await offline.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new Error('Storage unavailable');};Storage.prototype.setItem=()=>{throw new Error('Storage unavailable');};});const file=await offline.newPage();file.on('pageerror',e=>errors.push(e.message));await file.goto(require('node:url').pathToFileURL(path.resolve(__dirname,'../dist/index.html')).href+'?lang=ro');await file.waitForFunction(()=>!!window.CASA_BUILDING);assert.equal(await file.evaluate(()=>document.documentElement.lang),'ro');await file.selectOption('#languageSelect','en');assert((await file.locator('[data-view=walk]').textContent()).includes('Walk through'));await offline.close();assert.equal(errors.length,0,errors.join('\n'));fs.writeFileSync(path.join(results,'i18n-report.json'),JSON.stringify({passed:true,canvasLabels:count,languageViewportStates:viewports.length,errors},null,2));console.log('Language checks passed: FR/RO/EN, '+count+' canvas labels, dynamic diagnostics, room details, evidence dialogs, persistence, preserved walk/data and '+viewports.length+' viewport states.');
}finally{if(browser)await browser.close();if(server)server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
