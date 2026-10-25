
// Downstairs-only revision: one shared check-in/coffee counter, one operator.
const cafe=group(ground,'coffee');groups.coffee=cafe;
const C=V.downstairs,queuePeople=[],queueBodies=[],queueCells=[],coffeeStudy=group(ground,'coffee.space_study');
const clearMaterial=new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});
const cafeBodies=group(ground,'coffee.people_collision');
const registerTop=group(cafe,'registration.lift_up_top',265,78,285.5);
rounded(registerTop,60,5,55,2,'oak',-30,0,0,'registration.top');
box(cafe,102,89,55,'oak',316,44.5,285.5,'coffee.base');
rounded(cafe,106,5,57,2,'charcoal',316,92.5,285.5,'coffee.worktop');
for(let x=268;x<368;x+=7)box(cafe,2,76,1.5,'cream',x,44,257.2,'counter.flute');
box(cafe,4,77,55,'oak',267,38.5,285.5,'registration.hinge_support');
sign(cafe,'ACCUEIL · CAFÉ',145,20,286,241,267.5,Math.PI,'#f4edda','#3e5047');
sign(cafe,'INSCRIPTIONS',51,13,234,60,256,Math.PI,'#cda572','#34453d');
sign(cafe,'CAFÉ · RETRAIT',82,13,316,58,256,Math.PI,'#cda572','#34453d');
// Compact commercial-style one-group machine, controls towards the operator.
const machine=group(cafe,'espresso',330,95,283);
rounded(machine,39,34,34,4,'cream',0,19,0,'espresso.body');
box(machine,42,4,38,'charcoal',0,3,3,'espresso.tray');
box(machine,31,14,2,'charcoal',0,21,18,'espresso.controls');
for(const x of[-10,10]){cyl(machine,2.5,2,'charcoal',x,22,20,'espresso.dial').rotation.x=Math.PI/2;}
rod(machine,[0,16,20],[0,16,35],1.8,'charcoal','espresso.portafilter');
cyl(machine,3.5,7,'cream',0,7,25,'espresso.cup');
rod(machine,[17,22,20],[19,8,30],.9,'charcoal','espresso.steam_wand');
for(const x of[-10,0,10])cyl(machine,3.5,7,'cream',x,40,0,'espresso.warming_cup');
cyl(cafe,7,26,'charcoal',291,108,285,'grinder');
cyl(cafe,7,18,new T.MeshLambertMaterial({color:0x6e4f35,transparent:true,opacity:.8}),291,130,285,'grinder.hopper',6);
cyl(cafe,4.8,1,'charcoal',306,95.5,272,'rinser');
cyl(cafe,3,2,'charcoal',306,97,272,'rinser.center');
// One till handles admissions and coffee. Its fixed mounting leaves the access hatch usable.
const pos=group(cafe,'registration.POS',275,96,277);
box(pos,12,3,16,'charcoal',0,0,0,'POS.base');
rod(pos,[0,0,0],[0,13,0],1.6,'charcoal','POS.stand');
const screen=rounded(pos,15,21,2.5,2,'charcoal',0,19,1,'POS.screen');screen.rotation.x=-.35;
box(pos,12,2,11,'cream',0,5,-10,'POS.card_reader');
for(let i=0;i<3;i++){cyl(cafe,4.4,12,'cream',314+i*16,102,264,'takeaway.cup');cyl(cafe,4.8,1.5,'charcoal',314+i*16,108.7,264,'takeaway.lid');}
box(registerTop,28,1,20,'cream',-32,3.5,2,'registration.clipboard');
box(cafe,26,6,23,'oak',351,98,300,'coffee.bean_bag_tray');
for(const x of[343,351,359])rounded(cafe,6,16,5,1,'terra',x,108,300,'coffee.bean_bag');
box(cafe,100,2,48,'charcoal',316,7,285,'counter.kickboard');
rounded(cafe,43,63,2,2,'cream',337,40,314,'fridge.door');
box(cafe,12,2,3,'charcoal',337,66,316,'fridge.handle');
// Shallow overhead cup shelf on the rear wall; the staff floor aisle remains85cm.
box(cafe,148,3,12,'oak',286,185,393,'back.cup_shelf');
for(let i=0;i<10;i++)cyl(cafe,3.7,8,'cream',223+i*13,190,393,'back.cup');
const hatchBody=box(cafeBodies,60,81,55,clearMaterial,235,40.5,285.5,'staff_hatch.standing_collision');
const staffBodies=[],adultBoxes=[];
function adult(spec,parent,index){
 const q=person(parent,spec.x,spec.z,168,spec.color,index,'stand',0,0,spec.role);
 // Normalize actual mesh bounds independently: stature does not determine breadth.
 q.scale.setScalar(1);q.updateMatrixWorld(true);
 const b=new T.Box3().setFromObject(q),size=b.getSize(new T.Vector3());
 q.scale.set(spec.width/size.x,spec.height/size.y,spec.depth/size.z);
 q.position.y=-b.min.y*q.scale.y;q.rotation.y=spec.yaw;
 Object.assign(q.userData,{role:spec.role||'waiting_customer',heightCm:spec.height,widthCm:spec.width,depthCm:spec.depth,queueNumber:spec.number});
 q.name='v1.coffee.'+(spec.role||'customer')+'.'+(spec.number||0);
 q.updateMatrixWorld(true);const bodyBox=new T.Box3().setFromObject(q),bodySize=bodyBox.getSize(new T.Vector3()),bodyCenter=bodyBox.getCenter(new T.Vector3());
 const proxy=box(cafeBodies,bodySize.x,bodySize.y,bodySize.z,clearMaterial,bodyCenter.x,bodyCenter.y,bodyCenter.z,'person.collision');proxy.userData.role=spec.role||'waiting_customer';
 scene.updateMatrixWorld(true);const measured=new T.Box3().setFromObject(q);
 adultBoxes.push({id:spec.number||'staff',group:q,proxy,spec,measuredHeightCm:measured.max.y-measured.min.y});
 return {q,proxy};
}
const staff=adult(C.operator,groundPeople,29);staffBodies.push(staff.proxy);
for(const [i,spec]of C.customers.entries()){
 const a=adult(spec,groundPeople,30+i);queuePeople.push(a.q);queueBodies.push(a.proxy);
 const cell=box(coffeeStudy,60,.7,60,new T.MeshBasicMaterial({color:i===5?0xc8816b:0xa2b5a1,transparent:true,opacity:.2,depthWrite:false}),spec.x,.7,spec.z,'waiting.cell');
 cell.userData.queueNumber=i+1;queueCells.push(cell);
}
// Reserved walking strip and the entrance turning study are planning targets, not a compliance certificate.
box(coffeeStudy,90,.8,182,new T.MeshBasicMaterial({color:0x77aaa5,transparent:true,opacity:.22,depthWrite:false}),180,.9,161,'route.90cm');
const turn=group(coffeeStudy,'entrance.turn',277,0,45);
const disk=new T.Mesh(new T.CircleGeometry(45,60),new T.MeshBasicMaterial({color:0x77aaa5,transparent:true,opacity:.24,side:T.DoubleSide,depthWrite:false}));disk.rotation.x=-Math.PI/2;disk.position.y=1;turn.add(disk);
const boarding=group(coffeeStudy,'platform.boarding');
const circle150=new T.Mesh(new T.RingGeometry(73.5,75,64),new T.MeshBasicMaterial({color:0x4a7f96,side:T.DoubleSide,depthWrite:false}));circle150.rotation.x=-Math.PI/2;circle150.position.set(260,1.4,155);boarding.add(circle150);
const dock=box(boarding,105,.8,90,new T.MeshBasicMaterial({color:0x4a7f96,transparent:true,opacity:.2,depthWrite:false}),195,1,58,'platform.lower_station');
function floorWord(text,w,x,z,color='#456156'){
 const o=sign(coffeeStudy,text,w,18,x,1.8,z,0,'#f0eee4',color);o.rotation.x=-Math.PI/2;return o;
}
floorWord('PASSAGE 90 cm',105,180,170);floorWord('ACCUEIL',59,258,188);floorWord('CAFÉ',51,339,188);
function pointRectDistance(x,z,r){const dx=Math.max(r.x0-x,0,x-r.x1),dz=Math.max(r.z0-z,0,z-r.z1);return Math.hypot(dx,dz);}
function overlaps(a,b){return a.x0<b.x1&&a.x1>b.x0&&a.z0<b.z1&&a.z1>b.z0;}
function boxPlan(o){const b=new T.Box3().setFromObject(o);return{x0:b.min.x,x1:b.max.x,z0:b.min.z,z1:b.max.z,y0:b.min.y,y1:b.max.y};}
function downstairsMetrics(){
 scene.updateMatrixWorld(true);
 const active=adultBoxes.filter(a=>a.spec.role!=='operator'&&a.spec.number<=downstairsCount);
 const actual=active.map(a=>({...boxPlan(a.group),number:a.spec.number}));
 const customerOverlap=actual.some((a,i)=>actual.slice(i+1).some(b=>overlaps(a,b)));
 const turnDistances=actual.map(a=>pointRectDistance(277,45,a));
 return{waitingCustomers:downstairsCount,staff:1,totalAdults:downstairsCount+1,adults:adultBoxes.map(a=>({id:a.id,heightCm:a.measuredHeightCm,widthCm:a.spec.width,depthCm:a.spec.depth})),bodyOverlap:customerOverlap,turnTargetDiameterCm:90,minimumTurnBodyDistanceCm:Math.min(...turnDistances,Infinity),turnClear:turnDistances.every(d=>d>=45),sidePassageCm:Math.min(...actual.filter(a=>a.z1>=90).map(a=>a.x0),Infinity)-135,counterFrontZCm:258,staffAisleCm:85,alcoveCeilingCm:211.5,gateWidthCm:60};
}
let downstairsCount=5,downstairsMode='3d',downstairsDimensions=false,staffGateOpen=false,coffeeLastMode=null;
const coffeeUi=document.createElement('div');coffeeUi.id='coffeeStudyControls';coffeeUi.hidden=true;
coffeeUi.innerHTML='<label>Attente<select id="coffeeQueue"><option value="5">5 clients + 1 équipier</option><option value="6">6 clients + 1 équipier</option><option value="0">Libérer pour la plateforme</option></select></label><label>Vue<select id="coffeeStudyView"><option value="3d">Café en 3D</option><option value="plan">Plan et emprises</option></select></label><label class="coffeeCheck"><input type="checkbox" id="coffeeDimensions">Espaces</label><button id="coffeeStaffGate" aria-pressed="false">Accès équipe</button><span id="coffeeQueueStatus" role="status"></span>';
// Installed after the common concept controls exist, without altering upstairs views.
const coffeeOrtho=new T.OrthographicCamera(-300,300,250,-250,1,2000);coffeeOrtho.position.set(186,1000,200);coffeeOrtho.up.set(0,0,-1);coffeeOrtho.lookAt(186,0,200);
const previousActiveCamera=Object.getOwnPropertyDescriptor(A,'activeCamera').get;Object.defineProperty(A,'activeCamera',{get(){return downstairsMode==='plan'&&window.CASA_VARIANT?.current==='coffee'&&A.state.level==='rdc'&&A.state.phase==='apres'&&!A.walk.active?coffeeOrtho:previousActiveCamera.call(A);}});
const studyOverhead=[];ROOM_GROUP.updateMatrixWorld(true);ROOM_GROUP.traverse(o=>{if(!o.isMesh||o.name.startsWith('v1.'))return;const b=new T.Box3().setFromObject(o);if(b.min.y>=200&&b.min.x>=199&&b.max.z>=270)studyOverhead.push({o,visible:o.visible});});
function resizeCoffeePlan(){const r=$('workspace').getBoundingClientRect(),w=500*r.width/r.height;coffeeOrtho.left=-w/2;coffeeOrtho.right=w/2;coffeeOrtho.updateProjectionMatrix();}
new ResizeObserver(resizeCoffeePlan).observe($('workspace'));
renderer.domElement.addEventListener('wheel',e=>{if(downstairsMode==='plan'&&window.CASA_VARIANT?.current==='coffee'&&A.state.level==='rdc'&&!A.walk.active){e.preventDefault();coffeeOrtho.zoom=Math.max(.65,Math.min(2.5,coffeeOrtho.zoom*Math.exp(-e.deltaY*.001)));coffeeOrtho.updateProjectionMatrix();}},{passive:false});
const coffeeClip=new T.Plane(new T.Vector3(0,-1,0),210),studyMaterials=[],studyCeilings=[];
function facadeMesh(o){for(let p=o;p;p=p.parent)if(p===archGroup)return true;return String(o.userData.assembly||'').startsWith('room.facade');}
ROOM_GROUP.traverse(o=>{
 if(!o.isMesh||o.name.startsWith('v1.')||!o.geometry)return;
 const p=o.geometry.parameters;
 const ceil=p?.width===172&&p?.height===3&&p?.depth===128;
 const jamb=p?.width===78&&p?.height===298&&p?.depth===4;
 const lintel=p?.width===172&&p?.height===85&&p?.depth===4;
 if(ceil){studyCeilings.push({o,visible:o.visible});return;}
 if(facadeMesh(o)||jamb||lintel){const original=o.material,clipped=original.clone();clipped.clippingPlanes=[coffeeClip];studyMaterials.push({o,original,clipped});}
});
function updateCoffeeStudy(){
 if(!coffeeUi.isConnected)return;
 const inCoffee=window.CASA_VARIANT?.current==='coffee'&&A.state.level==='rdc',visible=inCoffee&&!A.walk.active&&A.state.phase==='apres';
 coffeeUi.hidden=!visible;document.body.classList.toggle('coffeeStudyActive',visible);
 const study=visible;for(const r of studyMaterials)r.o.material=study?r.clipped:r.original;
 for(const r of studyCeilings)r.o.visible=study?false:r.visible;
 for(const r of studyOverhead)r.o.visible=study&&downstairsMode==='plan'?false:r.visible;upperBalustradeGroup.visible=!(study&&downstairsMode==='plan');
 coffeeStudy.visible=visible&&downstairsDimensions;
 boarding.visible=downstairsCount===0;
 const peopleOn=$('v1People').checked&&$('v1Furniture').checked&&A.state.phase==='apres'&&A.state.level!=='r1';
 for(let i=0;i<queuePeople.length;i++){queuePeople[i].visible=i<downstairsCount;queueBodies[i].visible=peopleOn&&i<downstairsCount;queueCells[i].visible=i<downstairsCount;}
 staff.proxy.visible=peopleOn;hatchBody.visible=!staffGateOpen;
 registerTop.rotation.z=staffGateOpen?-Math.PI/2:0;
 const metrics=downstairsMetrics(),status=downstairsCount===0?'Aire libérée · déplacer la file pendant l’embarquement':metrics.turnClear?'5 en attente · file serrée · plateforme : libérer l’entrée':'6 en attente · le virage d’entrée est encombré';
 if($('coffeeQueueStatus').dataset.source!==status){$('coffeeQueueStatus').dataset.source=status;$('coffeeQueueStatus').textContent=status;$('coffeeQueueStatus').dataset.crowded=downstairsCount===6;}
}
function coffeeCamera(mode=downstairsMode){
 downstairsMode=mode;$('coffeeStudyView').value=mode;
 if(mode==='plan'){resizeCoffeePlan();target.set(240,25,200);radius=620;theta=-Math.PI/2;phi=.001;}
 else{target.set(252,87,214);radius=580;theta=-1.45;phi=.72;}
 radius*=Math.max(1,1.05/($('workspace').clientWidth/$('workspace').clientHeight));cam();
 downstairsDimensions=mode==='plan'||$('coffeeDimensions').checked;$('coffeeDimensions').checked=downstairsDimensions;updateCoffeeStudy();
}
function setCoffeeQueue(count){downstairsCount=[0,5,6].includes(Number(count))?Number(count):5;$('coffeeQueue').value=String(downstairsCount);A.walk.invalidate();updateCoffeeStudy();}
function installCoffeeStudy(){
 $('conceptNav').after(coffeeUi);
 $('coffeeQueue').onchange=e=>setCoffeeQueue(e.target.value);
 $('coffeeStudyView').onchange=e=>coffeeCamera(e.target.value);
 $('coffeeDimensions').onchange=e=>{downstairsDimensions=e.target.checked;updateCoffeeStudy();};
 $('coffeeStaffGate').onclick=()=>{staffGateOpen=!staffGateOpen;$('coffeeStaffGate').setAttribute('aria-pressed',String(staffGateOpen));A.walk.invalidate();updateCoffeeStudy();};
 setCoffeeQueue(Number(new URL(location.href).searchParams.get('queue')||5));
}
