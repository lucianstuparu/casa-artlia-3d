
// Occupied upstairs furnishing study. Downstairs code and geometry stay unchanged.
const U=V.upstairs,upActors=[],adultSeats=[],upFurniture=[],upperBodies=group(upper,'upstairs.body_collisions'),upperStudyLayer=group(upper,'upstairs.space_study');
const invisibleBody=new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});
let upperPairs=30,upperMode='3d',upperMarks=false,upperLastKey='';
function recordFurniture(o,room,id,rect){upFurniture.push({o,room,id,rect});return o;}
function parentBench(room,positions,id){
 const alongX=Math.abs(Math.sin(positions[0].yaw))<.5,ps=positions,first=ps[0],last=ps[ps.length-1],g=group(upper,id,(first.x+last.x)/2,312,(first.z+last.z)/2);
 const length=Math.hypot(last.x-first.x,last.z-first.z)+60;
 if(!alongX)g.rotation.y=Math.PI/2;
 rounded(g,length,10,52,4,'oak',0,33,0,'parent_bench.seat');
 const backZ=alongX?(first.yaw===0?24:-24):(first.yaw<0?-24:24);
 rounded(g,length,36,7,3,'sage',0,58,backZ,'parent_bench.back');
 for(let i=0;i<ps.length;i++)rounded(g,56,7,46,3,'cream',alongX?ps[i].x-g.position.x:-(ps[i].z-g.position.z),40.5,0,'parent_bench.cushion');
 for(const x of[-length/2+12,length/2-12])box(g,7,28,38,'oak',x,14,0,'parent_bench.leg');
 const rect=alongX?[g.position.x-length/2,g.position.x+length/2,g.position.z-28,g.position.z+28]:[g.position.x-28,g.position.x+28,g.position.z-length/2,g.position.z+length/2];
 recordFurniture(g,room,id,rect);
 ps.forEach((p,i)=>adultSeats.push({room,x:p.x,z:p.z,yaw:p.yaw,seatHeight:44,seatFrontageCm:60,id:id+'.'+i}));
 return g;
}
function occupiedPerson(spec){
 const {x,z,stature,width,room,role,pose='stand',yaw=0}=spec,y=spec.y??312,k=stature/(role==='child'?115:175),isChild=role==='child',sitting=pose==='sit',floor=pose==='floor';
 const g=group(upperPeople,'upstairs.'+role+'.'+upActors.length,x,0,z);
 const sk=new T.MeshLambertMaterial({color:skin[(upActors.length+1)%skin.length]}),ha=new T.MeshLambertMaterial({color:hair[upActors.length%hair.length]}),shirt=['sage','terra','blue','butter','cream','green','pink'][upActors.length%7];
 const seat=isChild?30:44,hip=floor?10:sitting?seat+(isChild?4:6):stature*.5,torsoH=stature*(isChild?.28:.26),shoulder=hip+torsoH,headR=isChild?13*Math.sqrt(stature/110):stature*.085,headY=shoulder+stature*.105;
 rounded(g,isChild?27:37,torsoH,18+(isChild?0:5),6,shirt,0,hip+torsoH/2,0,'body');
 sphere(g,headR,sk,0,headY,0,'head',[.87,1,.9]);sphere(g,headR,ha,0,headY+headR*.4,3,'hair',[.9,.65,.9]);cyl(g,4.5*k,9*k,sk,0,shoulder+4*k,0,'neck');
 for(const side of[-1,1]){
  const thigh=isChild?4.5:6.5,legX=isChild?8:10,knee=[side*legX,floor?8:sitting?seat-3:hip*.5,floor?-15:sitting?-34:0],foot=[side*(floor?15:legX),4,floor?-16:sitting?-40:0];
  rod(g,[side*legX,hip,0],knee,thigh,'charcoal','thigh');rod(g,knee,foot,thigh*.8,'charcoal','shin');rounded(g,isChild?10:13,8,isChild?19:24,3,'cream',foot[0],4,foot[2]-7,'shoe');
  const elbow=[side*(isChild?20:27),shoulder-torsoH*.45,sitting||floor?-18:0],hand=[side*(isChild?16:22),sitting||floor?hip+6:hip+5,sitting||floor?-31:-4];
  rod(g,[side*(isChild?16:21),shoulder-4,0],elbow,isChild?4:5,shirt,'sleeve');rod(g,elbow,hand,isChild?3:3.8,sk,'arm');sphere(g,isChild?3.2:4,sk,...hand,'hand');
 }
 g.updateMatrixWorld(true);const original=new T.Box3().setFromObject(g),size=original.getSize(new T.Vector3());
 const depth=pose==='stand'?(isChild?27:36):floor?48:isChild?50:74;
 g.scale.set(width/size.x,pose==='stand'?stature/size.y:1,depth/size.z);g.position.y=y-original.min.y*g.scale.y;g.rotation.y=yaw;
 g.updateMatrixWorld(true);const body=new T.Box3().setFromObject(g),bodySize=body.getSize(new T.Vector3()),center=body.getCenter(new T.Vector3());
 const proxy=box(upperBodies,bodySize.x,bodySize.y,bodySize.z,invisibleBody,center.x,center.y,center.z,'occupied.body');
 Object.assign(g.userData,{room,role,standingStatureCm:stature,pose,bodyWidthCm:width,actorNumber:spec.number,location:spec.location||'floor'});
 const record={group:g,proxy,spec:{...spec,pose,y},bounds:{min:body.min.toArray(),max:body.max.toArray()}};
 upActors.push(record);people.push(g);return record;
}
// Thirty real adult places, at perimeter benches rather than large sofas.
parentBench('main',U.rooms.main.seats.slice(0,8),'main.parent_north');
parentBench('main',U.rooms.main.seats.slice(8),'main.parent_south');
parentBench('play',U.rooms.play.seats,'play.parent_north');
parentBench('atelier',U.rooms.atelier.seats,'atelier.parent_north');
parentBench('bureau3',U.rooms.bureau3.seats.slice(0,4),'reading.parent_west');
parentBench('bureau3',U.rooms.bureau3.seats.slice(4),'reading.parent_east');
recordFurniture(table(upper,1230,210,150,80,54),'main','main.shared_table',[1155,1305,170,250]);
for(const p of U.rooms.main.children.filter(p=>p.pose==='sit'))stool(upper,p.x,p.z,'butter',30);
rug(upper,1065,225,150,150,0xc7cfb8);
recordFurniture(shelf(upper,1530,37,70,70,34,0),'main','main.toy_shelf',[1495,1565,20,54]);
wallSigns.push(sign(upper,'IMAGINER · JOUER · GRANDIR',230,27,1370,500,14,0));
// Shallower playhouse; steps and slide retain full dimensions and follow the front. Its upper deck is not extra usable room area.
recordFurniture(house,'main','playhouse',[1808,1928,64,346]);
recordFurniture(stairs,'main','house_stairs',[1685,1815,70,135]);
recordFurniture(slide,'main','slide',[1615,1865,241,313]);
const village=group(upper,'village');groups.play=village;
const kitchenToy=group(village,'pretend_kitchen',495,312,180);kitchenToy.rotation.y=-Math.PI/2;
box(kitchenToy,140,68,42,'oak',0,34,0,'kitchen.base');rounded(kitchenToy,144,4,46,1,'cream',0,70,0,'kitchen.top');
for(const x of[-35,-10])cyl(kitchenToy,8,1,'charcoal',x,73,0,'kitchen.hob');box(kitchenToy,30,2,24,'charcoal',40,73,0,'kitchen.sink');
recordFurniture(kitchenToy,'play','pretend_kitchen',[472,518,110,250]);
const market=group(village,'market',840,312,180);market.rotation.y=Math.PI/2;
const marketStorage=shelf(market,0,0,140,70,44);marketStorage.position.y=0;
for(const x of[-67,67])box(market,5,143,5,'oak',x,71.5,0,'market.post');box(market,145,6,50,'cream',0,146,0,'market.canopy');
for(let i=0;i<9;i++)box(market,15,2,50,i%2?'sage':'cream',-60+i*15,150,0,'market.stripe');
sign(market,'LE PETIT MARCHÉ',120,18,0,132,-26,Math.PI);
for(let i=0;i<10;i++)sphere(market,5,i%2?'terra':'butter',-50+i%5*23,77,-4+Math.floor(i/5)*12,'market.fruit');
recordFurniture(market,'play','pretend_market',[815,865,108,252]);
rug(village,650,220,200,130,0xd8c8a4);
const atelier=group(upper,'atelier');groups.atelier=atelier;
recordFurniture(table(atelier,205,650,130,80,54),'atelier','creative_table',[140,270,610,690]);
for(const p of U.rooms.atelier.children)stool(atelier,p.x,p.z,'sage',30);
wallSigns.push(sign(atelier,'PETITS CRÉATEURS',220,26,205,500,482));
for(let i=0;i<4;i++){box(atelier,22,1,29,'cream',164+i*28,367,650,'art.paper');cyl(atelier,4,10,'butter',164+i*28,373,625,'art.pencils');}
const build=group(upper,'build_read');groups.bureau3=build;
recordFurniture(table(build,235,1200,160,110,54),'bureau3','construction_table',[155,315,1145,1255]);
for(const p of U.rooms.bureau3.children.filter(p=>p.pose==='sit'))stool(build,p.x,p.z,'blue',30);
rug(build,230,1460,240,210,0xc7cfb8);
recordFurniture(shelf(build,235,1550,225,65,28,0),'bureau3','low_books',[122.5,347.5,1536,1564]);
for(let i=0;i<10;i++)box(build,5,24,20,['sage','terra','butter','blue'][i%4],145+i*18,390,1550,'reading.book');
for(let i=0;i<12;i++)box(build,12,10,12,['sage','terra','butter'][i%3],185+i%5*23,371+Math.floor(i/5)*10,1180+Math.floor(i/5)*17,'building.block');
wallSigns.push(sign(build,'UNE HISTOIRE, MILLE IDÉES',240,26,235,480,1593,Math.PI));
// Populate the target with seated parents, children in activities and three separate staff.
let parentNo=0,childNo=0;
for(const [room,r]of Object.entries(U.rooms)){
 r.seats.forEach((p,i)=>occupiedPerson({...p,room,role:'parent',pose:'sit',number:++parentNo,stature:160+(parentNo*7)%29,width:50+(parentNo%5)*2}));
 r.children.forEach((p,i)=>occupiedPerson({...p,stature:p.h,room,role:'child',number:++childNo,localNumber:i+1,width:30+(i%4)*3}));
}
U.staffPositions.forEach((p,i)=>occupiedPerson({...p,stature:p.h,width:54,room:p.room,role:'staff',number:i+1}));
// No visitor seating or overflow is placed in corridors, toilets or the exterior landing.
for(const [id,r]of Object.entries(U.rooms)){
 const [x0,x1,z0,z1]=r.compactRect,points=[[x0,314,z0],[x1,314,z0],[x1,314,z1],[x0,314,z1],[x0,314,z0]],geo=new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p))),ln=new T.Line(geo,new T.LineDashedMaterial({color:0x9b7654,dashSize:12,gapSize:7}));ln.computeLineDistances();upperStudyLayer.add(ln);
}
for(const route of U.routes)for(let i=1;i<route.points.length;i++){
 const a=route.points[i-1],b=route.points[i],len=Math.hypot(b[0]-a[0],b[1]-a[1]),o=box(upperStudyLayer,route.width,.7,len,new T.MeshBasicMaterial({color:0x6caaa5,transparent:true,opacity:.16,depthWrite:false}),(a[0]+b[0])/2,313.8,(a[1]+b[1])/2,'reserved.route');o.rotation.y=Math.atan2(b[0]-a[0],b[1]-a[1]);
}
function roomLimit(room){const r=U.rooms[room];return upperPairs===30?r.target:upperPairs===24?r.comparison24:r.comparison20;}
function visibleUpActors(){return upActors.filter(a=>a.spec.role==='staff'||(a.spec.role==='parent'?U.rooms[a.spec.room].seats.findIndex(p=>p.x===a.spec.x&&p.z===a.spec.z)<roomLimit(a.spec.room):a.spec.localNumber<=roomLimit(a.spec.room)));}
function upstairsMetrics(){
 scene.updateMatrixWorld(true);const current=visibleUpActors(),bodies=current.map(a=>{const b=new T.Box3().setFromObject(a.group);return{...a.spec,min:b.min.toArray(),max:b.max.toArray(),poseHeightCm:b.max.y-b.min.y};});
 const overlaps=[];for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){const a=bodies[i],b=bodies[j];if(a.min[0]<b.max[0]-.5&&a.max[0]>b.min[0]+.5&&a.min[2]<b.max[2]-.5&&a.max[2]>b.min[2]+.5&&a.min[1]<b.max[1]-.5&&a.max[1]>b.min[1]+.5)overlaps.push([a.role+a.number,b.role+b.number]);}
 const outside=bodies.filter(a=>{const r=U.rooms[a.room].compactRect;return a.min[0]<r[0]||a.max[0]>r[1]||a.min[2]<r[2]||a.max[2]>r[3];}).map(a=>a.role+a.number);
 return{children:bodies.filter(a=>a.role==='child').length,parents:bodies.filter(a=>a.role==='parent').length,staff:3,adultSeats:adultSeats.length,printedRoomAreaM2:U.printedActivityAreaM2,tracedRoomAreaM2:U.tracedActivityAreaM2,compactStudyAreaM2:Object.values(U.rooms).reduce((n,r)=>n+(r.compactRect[1]-r.compactRect[0])*(r.compactRect[3]-r.compactRect[2])/10000,0),grossPrintedM2PerVisitor:U.printedActivityAreaM2/(upperPairs*2),rooms:Object.fromEntries(Object.entries(U.rooms).map(([id,r])=>[id,{children:roomLimit(id),parents:roomLimit(id),adultSeats:r.seats.length,printedAreaM2:r.printedAreaM2,tracedAreaM2:r.tracedAreaM2}])),overlaps,outside,bodies,verdict:'busy_conditional_study; site areas and final fitout require verification'};
}
const upperUi=document.createElement('div');upperUi.id='upperStudyControls';upperUi.hidden=true;
upperUi.innerHTML='<label>Fréquentation<select id="upperOccupancy"><option value="30">Pic : 30 enfants + 30 parents</option><option value="24">24 enfants + 24 parents</option><option value="20">20 enfants + 20 parents</option></select></label><label>Vue<select id="upperStudyView"><option value="3d">Espaces en 3D</option><option value="plan">Plan et parcours</option></select></label><label class="upperCheck"><input id="upperMarks" type="checkbox">Emprises</label><button id="upperSummary">Répartition et surfaces</button><span id="upperOccupancyStatus" role="status"></span>';
const upperDialog=document.createElement('dialog');upperDialog.id='upperStudyDialog';upperDialog.innerHTML='<div class="dialogHead"><h2>30 enfants par jour, avec une pointe possible</h2><button id="upperDialogClose">Fermer</button></div><div class="conceptContent"><p>Objectif : 30 enfants par jour, répartis dans la journée. Le sélecteur représente les personnes présentes simultanément ; 30 familles est une pointe possible. Trois équipiers à l’étage sont comptés en plus.</p><div id="upperRoomTable"></div><p class="areaCaution">Les quatre salles font 96,27 m² au plan, contre 129,41 m² dans le tracé actuel. Les rectangles pointillés limitent l’étude du mobilier à des surfaces inférieures aux surfaces imprimées. Ils ne remplacent pas un relevé du bâtiment.</p><p>Le scénario de pointe montre 30 enfants et 30 parents présents en même temps. Les scénarios 20 et 24 sont des comparaisons, pas une prévision de fréquentation. Le modèle ne certifie ni le confort ni l’effectif autorisé à l’ouverture.</p><p>Les couloirs, le sanitaire et le palier extérieur restent sans places d’attente. La cabane est conservée ; son étage ne crée pas de surface supplémentaire dans ce calcul.</p><a href="https://drive.google.com/file/d/1Qj401UmMJVD3-M9Kdfd2UkMioZepjgdw/view" target="_blank" rel="noopener">Décision ERP du 18 septembre 2026</a></div>';
document.body.append(upperDialog);
const upperOrtho=new T.OrthographicCamera(-1100,1100,900,-900,1,4000);upperOrtho.position.set(960,2000,800);upperOrtho.up.set(0,0,-1);upperOrtho.lookAt(960,312,800);
const cameraBeforeUpper=Object.getOwnPropertyDescriptor(A,'activeCamera').get;
Object.defineProperty(A,'activeCamera',{get(){return upperMode==='plan'&&window.CASA_VARIANT?.current!=='coffee'&&A.state.level==='r1'&&!A.walk.active&&A.state.phase==='apres'?upperOrtho:cameraBeforeUpper.call(A);}});
function resizeUpperPlan(){const r=$('workspace').getBoundingClientRect(),aspect=r.width/r.height,h=Math.max(900,1100/aspect);upperOrtho.top=h;upperOrtho.bottom=-h;upperOrtho.left=-h*aspect;upperOrtho.right=h*aspect;upperOrtho.updateProjectionMatrix();}
new ResizeObserver(resizeUpperPlan).observe($('workspace'));
function upperTable(){
 const names={main:'La grande salle',play:'Le petit village',atelier:'L’atelier',bureau3:'Construire et lire'};
 $('upperRoomTable').innerHTML='<table><thead><tr><th>Pièce</th><th>Enfants</th><th>Parents</th><th>Places adultes</th><th>Plan · m²</th></tr></thead><tbody>'+Object.entries(U.rooms).map(([id,r])=>'<tr><td>'+names[id]+'</td><td>'+roomLimit(id)+'</td><td>'+roomLimit(id)+'</td><td>'+r.seats.length+'</td><td>'+r.printedAreaM2.toFixed(2)+'</td></tr>').join('')+'</tbody></table>';
}
function updateUpstairsStudy(){
 if(!upperUi.isConnected)return;
 const visible=window.CASA_VARIANT?.current!=='coffee'&&A.state.level==='r1'&&!A.walk.active&&A.state.phase==='apres';upperUi.hidden=!visible;document.body.classList.toggle('upperStudyActive',visible);
 const key=[upperPairs,A.state.phase,A.state.level,$('v1People').checked,$('v1Furniture').checked,upperMarks,A.walk.active,visible].join(':');if(key===upperLastKey)return;upperLastKey=key;
 const active=new Set(visibleUpActors()),show=$('v1People').checked&&$('v1Furniture').checked&&A.state.phase==='apres'&&A.state.level!=='rdc';
 for(const a of upActors){a.group.visible=active.has(a);a.proxy.visible=active.has(a)&&show;}
 upperStudyLayer.visible=visible&&upperMarks;
 $('upperOccupancyStatus').textContent='30 enfants/jour · '+upperPairs+' enfants · '+upperPairs+' parents assis · 3 équipiers · surfaces à confirmer';
 upperTable();A.walk.invalidate();
}
function setUpperPairs(n){upperPairs=[20,24,30].includes(Number(n))?Number(n):30;$('upperOccupancy').value=String(upperPairs);upperLastKey='';updateUpstairsStudy();}
function upperCamera(mode){upperMode=mode;$('upperStudyView').value=mode;if(mode==='plan'){resizeUpperPlan();upperMarks=true;$('upperMarks').checked=true;}updateUpstairsStudy();}
function installUpstairsStudy(){
 $('conceptNav').after(upperUi);$('upperOccupancy').onchange=e=>setUpperPairs(e.target.value);$('upperStudyView').onchange=e=>upperCamera(e.target.value);$('upperMarks').onchange=e=>{upperMarks=e.target.checked;upperLastKey='';updateUpstairsStudy();};
 $('upperSummary').onclick=()=>{upperTable();upperDialog.showModal();};$('upperDialogClose').onclick=()=>upperDialog.close();setUpperPairs(Number(new URL(location.href).searchParams.get('families')||30));
}
