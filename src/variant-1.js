
(()=>{
'use strict';
const A=CASA_BUILDING,V=CASA_VARIANT_DATA,T=THREE,$=id=>document.getElementById(id);
const groups={},people=[],wallSigns=[],palette={oak:0xcda572,cream:0xf5f0df,sage:0x81967a,green:0x557765,butter:0xe4c66f,terra:0xc98469,charcoal:0x333b39,pink:0xd8aaa1,blue:0x8eacb6};
const mats={};for(const[k,color]of Object.entries(palette))mats[k]=new T.MeshLambertMaterial({color});
const skin=[0xd4a47b,0x94694b,0xe7bea1,0xb88162],hair=[0x4a3428,0x2e2926,0x94724e];
let visibilityKey='';
const allPeople=new T.Group();allPeople.name='Variant1 illustrative people';A.root.add(allPeople);
function group(parent,id,x=0,y=0,z=0){const g=new T.Group();g.name='v1.'+id;g.position.set(x,y,z);g.userData={concept:true,id};parent.add(g);return g;}
const upper=group(A.phases.apres.fittings,'furniture.r1'),ground=group(ROOM_GROUP,'furniture.rdc');ground.userData.level='RDC';ground.userData.phase='apres';
const upperPeople=group(allPeople,'people.r1'),groundPeople=group(allPeople,'people.rdc');
function box(g,w,h,d,m,x,y,z,id){const o=new T.Mesh(new T.BoxGeometry(w,h,d),typeof m==='string'?mats[m]:m);o.position.set(x,y,z);o.name='v1.'+id;o.userData={concept:true};g.add(o);return o;}
function rounded(g,w,h,d,r,m,x,y,z,id){r=Math.min(r,w/2-.1,h/2-.1);const s=new T.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);const geo=new T.ExtrudeGeometry(s,{depth:d-2,bevelEnabled:true,bevelSize:1,bevelThickness:1,bevelSegments:2,steps:1,curveSegments:5});geo.translate(0,0,-(d-2)/2);const o=new T.Mesh(geo,typeof m==='string'?mats[m]:m);o.position.set(x,y,z);o.name='v1.'+id;o.userData={concept:true};g.add(o);return o;}
function cyl(g,r,h,m,x,y,z,id,r2=r){const o=new T.Mesh(new T.CylinderGeometry(r2,r,h,20),typeof m==='string'?mats[m]:m);o.position.set(x,y,z);o.name='v1.'+id;o.userData={concept:true};g.add(o);return o;}
function sphere(g,r,m,x,y,z,id,scale=[1,1,1]){const o=new T.Mesh(new T.SphereGeometry(r,16,12),typeof m==='string'?mats[m]:m);o.scale.set(...scale);o.position.set(x,y,z);o.name='v1.'+id;o.userData={concept:true};g.add(o);return o;}
function rod(g,a,b,r,m,id){const av=new T.Vector3(...a),bv=new T.Vector3(...b),o=cyl(g,r,av.distanceTo(bv),m,...av.clone().lerp(bv,.5).toArray(),id);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bv.sub(av).normalize());return o;}
function sign(g,text,w,h,x,y,z,rot=0,background='#f4edda',color='#425b4c'){
 const c=document.createElement('canvas');c.width=1024;c.height=256;const ctx=c.getContext('2d'),tex=new T.CanvasTexture(c),o=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:tex,side:T.DoubleSide,transparent:true}));o.position.set(x,y,z);o.rotation.y=rot;o.name='v1.sign.'+text;g.add(o);
 CASA_I18N.registerCanvas(()=>{ctx.clearRect(0,0,1024,256);ctx.fillStyle=background;ctx.fillRect(0,0,1024,256);ctx.font='500 70px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=color;ctx.fillText(CASA_I18N.t(text),512,133,960);tex.needsUpdate=true;});
 return o;
}
function rug(g,x,z,w,d,color){return rounded(g,w,2,d,1,new T.MeshLambertMaterial({color}),x,313.5,z,'rug');}
function table(g,x,z,w,d,h=58){const q=group(g,'table',x,312,z);rounded(q,w,5,d,2,'oak',0,h-2.5,0,'top');for(const a of[-w/2+12,w/2-12])for(const b of[-d/2+12,d/2-12])cyl(q,3,h-5,'oak',a,(h-5)/2,b,'leg');return q;}
function stool(g,x,z,col='sage',h=32){const q=group(g,'stool',x,312,z);cyl(q,17,5,col,0,h-2.5,0,'seat');for(const[a,b]of[[-10,-8],[10,-8],[0,11]])rod(q,[a*1.2,0,b*1.2],[a,h-5,b],2.2,'oak','leg');return q;}
function chair(g,x,z,rot=0){const q=group(g,'chair',x,312,z);q.rotation.y=rot;rounded(q,46,9,45,4,'cream',0,43,0,'seat');rounded(q,46,45,8,6,'sage',0,68,21,'back');for(const a of[-17,17])for(const b of[-16,16])rod(q,[a*1.1,0,b*1.1],[a,39,b],2.3,'oak','leg');return q;}
function sofa(g,x,z,w,rot=0){const q=group(g,'sofa',x,312,z);q.rotation.y=rot;rounded(q,w,34,75,10,'sage',0,29,0,'base');rounded(q,w,58,18,8,'sage',0,63,31,'back');for(const xx of[-w/2+10,w/2-10])rounded(q,20,44,75,8,'sage',xx,46,0,'arm');for(let i=0;i<3;i++){rounded(q,(w-46)/3-2,13,53,5,'cream',-w/3+24+i*(w-46)/3,49,-5,'cushion');}return q;}
function shelf(g,x,z,w,h=82,d=34,rot=0){const q=group(g,'shelf',x,312,z);q.rotation.y=rot;box(q,w,h,3,'oak',0,h/2,d/2,'back');for(const y of[3,h/2,h-3])box(q,w,4,d,'oak',0,y,0,'shelf');for(const xx of[-w/2,w/2,0])box(q,4,h,d,'oak',xx,h/2,0,'side');for(let i=0;i<4;i++)rounded(q,w/2-12,23,d-5,3,i%2?'butter':'sage',(i%2-.5)*w/2,i<2?16:h/2+14,-1,'basket');return q;}
function plant(g,x,z,y=312,scale=1){const q=group(g,'plant',x,y,z);q.scale.setScalar(scale);cyl(q,15,25,'terra',0,12.5,0,'pot',12);for(let i=0;i<5;i++){const a=i*2.4,r=12+4*(i%2);rod(q,[0,20,0],[Math.sin(a)*r,52+i*4,Math.cos(a)*r],.8,'green','stem');const leaf=sphere(q,15,'sage',Math.sin(a)*r,54+i*4,Math.cos(a)*r,'leaf',[.5,1.5,.75]);leaf.rotation.z=Math.sin(a)*.6;}return q;}
function person(parent,x,z,height,shirt,index,pose='stand',yaw=0,y=312){
 const q=group(parent,'person.'+index,x,y,z);q.rotation.y=yaw;q.scale.setScalar(height/168);
 const skinMat=new T.MeshLambertMaterial({color:skin[index%skin.length]}),hairMat=new T.MeshLambertMaterial({color:hair[index%hair.length]});
 const seated=pose==='sit',hip=seated?54:88,shoulder=hip+43,headY=hip+65;
 rounded(q,37,47,23,8,shirt,0,hip+22,0,'torso');sphere(q,15,skinMat,0,headY,0,'head',[.87,1.03,.9]);sphere(q,15,hairMat,0,headY+6,3,'hair',[.9,.75,.9]);cyl(q,5,10,skinMat,0,hip+48,0,'neck');
 for(const side of[-1,1]){
  const knee=[side*10,seated?46:45,seated?-32:2],foot=[side*11,4,seated?-37:0];rod(q,[side*10,hip,0],knee,6.5,'charcoal','thigh');rod(q,knee,foot,5.3,'charcoal','calf');rounded(q,13,8,24,3,'cream',foot[0],4,foot[2]-7,'shoe');
  const elbow=[side*26,shoulder-20,pose==='reach'?-20:seated?-20:0],hand=[side*22,shoulder-40,pose==='reach'?-46:seated?-35:-4];rod(q,[side*21,shoulder,0],elbow,5.3,shirt,'sleeve');rod(q,elbow,hand,3.8,skinMat,'forearm');sphere(q,4,skinMat,...hand,'hand');
 }
 people.push(q);return q;
}
// Warm floor finishes only in this separate concept. No base model data is edited.
const woodCanvas=document.createElement('canvas');woodCanvas.width=256;woodCanvas.height=256;const wc=woodCanvas.getContext('2d');wc.fillStyle='#d9bd94';wc.fillRect(0,0,256,256);for(let i=0;i<8;i++){wc.fillStyle=i%2?'#d4bd9a':'#d8c2a2';wc.fillRect(i*32,0,31,256);wc.strokeStyle='#c7aa80';wc.beginPath();wc.moveTo(i*32,0);wc.lineTo(i*32,256);wc.stroke();for(let k=0;k<8;k++){wc.strokeStyle='rgba(117,88,52,.10)';wc.beginPath();wc.moveTo(i*32+4+k*3,0);wc.bezierCurveTo(i*32+k*3,80,i*32+8+k*3,170,i*32+4+k*3,256);wc.stroke();}}const wood=new T.CanvasTexture(woodCanvas);wood.wrapS=wood.wrapT=T.RepeatWrapping;wood.repeat.set(.006,.006);
for(const g of[A.phases.apres.floors,ROOM_GROUP])g.traverse(o=>{if(o.isMesh&&o.userData.roomId&&o.userData.phase==='apres'){o.material=o.material.clone();o.material.color.setHex(0xd6cfc1);o.material.map=wood;}});
A.phases.apres.walls.traverse(o=>{if(o.isMesh&&/solid|wall/.test(o.name)&&!o.name.includes('glass')){o.material=o.material.clone();o.material.color.setHex(0xf2eee3);}});
// Single-wall coffee counter: no island, no stools in the small entrance.
const cafe=group(ground,'coffee');groups.coffee=cafe;
box(cafe,50,88,220,'oak',342,44,265,'coffee.base');rounded(cafe,54,5,226,2,'charcoal',340,92,265,'coffee.worktop');
for(let z=158;z<375;z+=8)box(cafe,1.4,76,2,'cream',316.4,43,z,'coffee.flute');
box(cafe,51,6,52,'oak',340,76,128,'coffee.low_pickup');
const machine=group(cafe,'espresso',340,95,245);rounded(machine,34,36,58,4,'cream',0,20,0,'machine.body');box(machine,38,4,62,'charcoal',-2,3,0,'machine.tray');box(machine,2,16,46,'charcoal',-18,18,0,'machine.front');
for(const z of[-15,15]){rod(machine,[-20,17,z],[-31,17,z],1.5,'charcoal','portafilter');cyl(machine,3.5,7,'cream',-22,7,z,'espresso.cup');}
cyl(cafe,8,29,'charcoal',340,110,315,'grinder');cyl(cafe,9,18,new T.MeshLambertMaterial({color:0x88694a,transparent:true,opacity:.65}),340,134,315,'hopper',6);
cyl(cafe,8,2,'charcoal',340,96,175,'drip.tray');cyl(cafe,5,10,'cream',340,102,175,'dripper',9);
for(let i=0;i<4;i++)cyl(cafe,3.5,8,'cream',329,100,280+i*8,'cup');
box(cafe,2,4,180,'oak',369,163,265,'coffee.shelf');for(let i=0;i<10;i++)cyl(cafe,4,9,'cream',365,170,185+i*16,'shelf.cup');
sign(cafe,'ARTLIA · CAFÉ',166,27,369,205,265,-Math.PI/2,'#f2eee4','#3e4c45');
sign(cafe,'ESPRESSO · FILTRE · À EMPORTER',176,19,369,187,265,-Math.PI/2,'#f2eee4','#675b4b');
person(groundPeople,280,267,170,'charcoal',0,'reach',-Math.PI/2,0);
person(groundPeople,223,120,167,'terra',1,'stand',-Math.PI/2,0);
// Main room: raised playhouse at the far end, open alcove below instead of a bed.
const house=group(upper,'house',1710,312,70);groups.house=house;

for(const x of[8,202])for(const z of[8,262])rounded(house,10,225,10,2,'cream',x,112.5,z,'house.post');
box(house,210,8,270,'oak',105,111,135,'house.deck');
for(let z=0;z<270;z+=13)box(house,206,1,1,'cream',105,115.5,z,'house.deck_joint');
box(house,7,108,270,'cream',206,170,135,'house.back');
box(house,210,109,6,'cream',105,170,4,'house.side');box(house,135,109,6,'cream',142.5,170,266,'house.side');
for(const z of[68,170,264])box(house,7,109,6,'cream',1,170,z,'house.front_post');
for(const z of[118]){
 box(house,7,23,90,'cream',1,127,z,'house.sill_panel');box(house,7,18,108,'cream',1,215,z,'house.top_panel');
 for(const zz of[z-44,z+44,z])box(house,10,64,5,z<100?'sage':'butter',-1,171,zz,'house.window_vertical');
 for(const yy of[142,171,201])box(house,10,5,92,z<100?'sage':'butter',-1,yy,z,'house.window_horizontal');
}
cyl(house,22,8,'sage',105,4,80,'house.floor_cushion');cyl(house,22,8,'terra',115,4,195,'house.floor_cushion');
rounded(house,130,3,180,1,'sage',105,2,136,'house.alcove_rug');
sign(house,'LA CABANE',120,20,-5,221,135,-Math.PI/2,'#f5f0df','#596d54');
// Pitched roof runs along x. Muted rainbow slats echo the attached reference.
const roofColors=['terra','pink','butter','sage','green','blue'];for(let i=0;i<18;i++){const x=-8+i*13;for(const side of[-1,1]){const o=box(house,12.5,5,146,roofColors[Math.floor(i/3)%6],x,233.5,135+side*68,'house.roof_slat');o.rotation.x=side*.19;}}
box(house,14,26,18,'cream',135,237,90,'house.chimney');
const stairs=group(upper,'house.stairs',1580,312,70);for(let i=0;i<6;i++){const h=(i+1)*115/6;box(stairs,130/6,h,65,i%2?'sage':'oak',(i+.5)*130/6,h/2,32.5,'house.step');}
for(const z of[4,61]){rod(stairs,[0,50,z],[130,165,z],2.5,'butter','house.stair_rail');for(const x of[10,65,120])rod(stairs,[x,x/130*115,z],[x,x/130*115+50,z],2,'cream','house.stair_post');}
const slide=group(upper,'house.slide');const slideShape=new T.Shape();slideShape.moveTo(1510,0);slideShape.lineTo(1510,7);slideShape.bezierCurveTo(1570,4,1600,35,1650,75);slideShape.lineTo(1735,115);slideShape.lineTo(1760,115);slideShape.lineTo(1760,108);slideShape.lineTo(1660,66);slideShape.bezierCurveTo(1600,24,1560,-1,1510,0);
const slideGeo=new T.ExtrudeGeometry(slideShape,{depth:64,bevelEnabled:false,curveSegments:24});slideGeo.translate(0,312,245);const slideMesh=new T.Mesh(slideGeo,mats.sage);slideMesh.name='v1.house.slide.bed';slide.add(slideMesh);
for(const z of[245,309]){rod(slide,[1515,323,z],[1575,336,z],3.3,'butter','slide.edge');rod(slide,[1575,336,z],[1660,396,z],3.3,'butter','slide.edge');rod(slide,[1660,396,z],[1760,437,z],3.3,'butter','slide.edge');}
rug(upper,1470,277,100,110,0xdcbf90);
// Parent seating keeps a view towards the playhouse.
sofa(upper,1110,390,220,0);rounded(upper,120,3,135,1,'cream',1110,313.8,270,'parents.rug');table(upper,1110,270,72,54,48);
for(const x of[1093,1124])cyl(upper,4,9,'cream',x,369,270,'parent.cup');
person(upperPeople,1054,392,167,'cream',2,'sit',0);
person(upperPeople,1150,392,174,'terra',3,'sit',0);
const bench=group(upper,'parent_bench',1200,312,51);rounded(bench,240,12,55,4,'oak',0,43,0,'bench.seat');rounded(bench,240,33,8,4,'cream',0,65,-23,'bench.back');for(const x of[-104,104])box(bench,9,37,40,'oak',x,18.5,0,'bench.leg');
plant(upper,980,50);plant(upper,1880,435,.0+312,.75);
table(upper,1370,180,120,100,52);for(const[x,z,col]of[[1295,180,'butter'],[1445,180,'sage'],[1370,108,'terra'],[1370,252,'blue']])stool(upper,x,z,col);
for(let i=0;i<7;i++)box(upper,12,8,12,i%2?'butter':'terra',1345+(i%3)*17,368+Math.floor(i/3)*8,166+Math.floor(i/3)*14,'main.blocks');
person(upperPeople,1295,180,110,'butter',4,'sit',-Math.PI/2);
person(upperPeople,1470,295,118,'blue',5,'stand',-Math.PI/2);
person(upperPeople,1815,220,100,'terra',6,'stand',Math.PI/2,427);
person(upperPeople,1640,190,166,'green',7,'stand',Math.PI/2);
shelf(upper,1490,35,160,80,34,0);
wallSigns.push(sign(upper,'IMAGINER · JOUER · GRANDIR',230,27,1370,500,14,0));
// Pretend-play room: market, little kitchen, round gathering rug.
const village=group(upper,'village');groups.play=village;
shelf(village,545,56,150,70,48);
for(const x of[475,615])box(village,5,145,5,'oak',x,384,40,'market.post');
box(village,155,7,64,'cream',545,459,50,'market.canopy');for(let i=0;i<10;i++)box(village,15,4,65,i%2?'sage':'cream',477+i*15,464,50,'market.stripe');
sign(village,'LE PETIT MARCHÉ',132,22,545,446,14,0);
for(let i=0;i<12;i++)sphere(village,5,i%2?'butter':'terra',499+(i%6)*17,389,46+Math.floor(i/6)*13,'market.fruit');
box(village,150,70,48,'oak',785,347,55,'kitchen.base');rounded(village,154,4,52,1,'cream',785,384,55,'kitchen.top');
for(const x of[752,777])cyl(village,8,1,'charcoal',x,387,55,'kitchen.hob');box(village,30,3,23,'charcoal',824,386,55,'kitchen.sink');
rounded(village,50,38,3,3,'sage',770,350,29,'kitchen.oven');sign(village,'BONJOUR !',100,22,785,428,14);
rug(village,680,205,230,170,0xd6c6a1);table(village,700,195,78,60,45);stool(village,644,195,'butter',28);stool(village,750,245,'terra',28);
person(upperPeople,644,195,102,'pink',8,'sit',-Math.PI/2);person(upperPeople,800,180,166,'sage',9,'stand',.5);
// Art workshop and construction / reading rooms.
const atelier=group(upper,'atelier');groups.atelier=atelier;
shelf(atelier,45,630,240,88,38,Math.PI/2);
table(atelier,200,590,180,90,58);for(const[x,z,c]of[[140,515,'sage'],[250,515,'butter'],[140,665,'terra'],[250,665,'blue']])stool(atelier,x,z,c);
for(let i=0;i<4;i++){box(atelier,25,1,34,'cream',145+i*35,374,590,'art.paper');cyl(atelier,4,12,'butter',145+i*35,380,568,'pencil.pot');}
wallSigns.push(sign(atelier,'PETITS CRÉATEURS',230,30,180,500,482));
person(upperPeople,140,665,110,'butter',10,'sit',Math.PI);person(upperPeople,250,515,108,'blue',11,'sit',0);person(upperPeople,340,610,170,'terra',12,'reach',Math.PI/2);
const build=group(upper,'build_read');groups.bureau3=build;
rug(build,250,1035,330,280,0xc4cdb7);table(build,215,1155,190,90,55);
for(const[x,z,c]of[[150,1080,'terra'],[270,1080,'sage'],[150,1230,'butter'],[270,1230,'blue']])stool(build,x,z,c);
for(let i=0;i<12;i++)box(build,15,12,15,['sage','butter','terra'][i%3],155+i%5*25,378+Math.floor(i/5)*12,1140+Math.floor(i/5)*20,'construction.block');
sofa(build,58,1450,190,Math.PI/2);shelf(build,230,1575,230,76,32,0);
for(let i=0;i<10;i++)box(build,5,26,20,['sage','terra','butter','blue'][i%4],150+i*15,412,1574,'book');
wallSigns.push(sign(build,'UNE HISTOIRE, MILLE IDÉES',245,28,245,480,1594,Math.PI));
person(upperPeople,67,1435,168,'cream',13,'sit',-Math.PI/2);
person(upperPeople,198,1340,100,'sage',14,'stand',.3);
// Back-of-house remains recognisable and intentionally quiet.
const back=group(upper,'back_of_house');shelf(back,900,1020,210,100,45,Math.PI/2);table(back,765,1090,130,50,74);
box(back,55,90,245,'cream',918,357,1410,'office.kitchen_units');box(back,60,5,250,'oak',915,405,1410,'office.worktop');rounded(back,62,170,64,4,'cream',910,397,1230,'office.fridge');
function sync(){const key=[A.state.phase,A.state.level,A.state.walls,$('v1Furniture')?.checked,$('v1People')?.checked].join(':');if(key===visibilityKey)return;visibilityKey=key;for(const o of wallSigns)o.visible=A.state.walls==='full';const furnishing=$('v1Furniture')?.checked??true,showPeople=$('v1People')?.checked??true;upper.visible=ground.visible=furnishing&&A.state.phase==='apres';ground.visible=ground.visible&&A.state.level!=='r1';upperPeople.visible=showPeople&&furnishing&&A.state.phase==='apres'&&A.state.level!=='rdc';groundPeople.visible=showPeople&&furnishing&&A.state.phase==='apres'&&A.state.level!=='r1';A.walk.invalidate();}
const oldApply=A.apply;A.apply=function(){oldApply();sync();};
const oldTick=A.tick;A.tick=function(now){oldTick(now);sync();};
const oldSetPhase=A.setPhase;A.setPhase=function(p){oldSetPhase(p);sync();};
// Human figures are illustrative and outside physical collision roots.
const ui=document.createElement('nav');ui.id='conceptNav';ui.setAttribute('aria-label','Variante 1');
ui.innerHTML='<label for="conceptView">Découvrir</label><select id="conceptView"><option value="main">La grande salle</option><option value="coffee">Le petit café</option><option value="play">Le petit village</option><option value="atelier">L’atelier</option><option value="bureau3">Construire et lire</option><option value="overview">Vue d’ensemble</option></select><div class="conceptSwitches"><label><input type="checkbox" id="v1Furniture" checked>Mobilier</label><label><input type="checkbox" id="v1People" checked>Personnes</label></div><button id="v1Info" class="conceptInfo" aria-label="À propos du concept">i</button><a id="v1Base" href="index.html">Modèle de base</a>';
const note=document.createElement('div');note.id='conceptNote';note.innerHTML='<strong>Variante 1 · Maison de jeu & café</strong><span id="conceptDescription"></span>';
$('actionRegion').prepend(note);$('actionRegion').prepend(ui);
const dialog=document.createElement('dialog');dialog.id='conceptDialog';dialog.innerHTML='<div class="dialogHead"><h2>Variante 1 · Le concept</h2><button id="v1Close">Fermer</button></div><div class="conceptContent"><p>Une proposition d’ambiance, sur la géométrie après travaux. Le modèle de base reste inchangé.</p><h3>La cabane</h3><p>Une maison surélevée, des marches, un petit toboggan et un espace ouvert dessous. Aucun lit. Bois clair, sauge, jaune doux et toit multicolore.</p><h3>Le café</h3><p>Un seul comptoir mural au RDC, sans tables : café de spécialité à emporter ou pour les parents installés à l’étage. Chêne, métal sombre et céramique blanche, inspirés d’Origo.</p><h3>À préciser</h3><p>Mobilier, positions, raccordements et éclairage sont proposés. La cabane est un concept à développer avec un fabricant ; son étage n’est pas accessible dans la visite virtuelle. Les personnes donnent l’échelle, pas une capacité d’accueil.</p><p>Les plans et hypothèses du bâtiment restent consultables dans Sources.</p><p><a href="https://www.lama.ro/portofolio/origo-coffee-shop/" target="_blank" rel="noopener">Référence café : Origo / LAMA Arhitectura</a></p></div>';document.body.append(dialog);dialog.querySelector('.conceptContent').prepend(ui.querySelector('.conceptSwitches'));ui.querySelector('#v1Info').innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/></svg>';
$('v1Info').onclick=()=>dialog.showModal();$('v1Close').onclick=()=>dialog.close();
let current='main';
const views={main:{room:'main',target:[1430,370,230],radius:1020,theta:-2.20,phi:.65},coffee:{room:'rdc',target:[330,110,265],radius:300,theta:-2.43,phi:1.05},play:{room:'play',target:[680,360,170],radius:650,theta:-1.9,phi:.63},atelier:{room:'atelier',target:[225,355,615],radius:700,theta:-.8,phi:.62},bureau3:{room:'bureau3',target:[240,355,1240],radius:1000,theta:-.8,phi:.58}};
function view(id){current=id;$('conceptView').value=id;if(A.walk.active)A.walk.stop(false);A.setPhase('apres');A.setView('interior');A.state.labels=false;A.state.accessibility=false;$('labelsCheck').checked=false;$('accessibilityCheck').checked=false;A.state.bookshop=false;A.state.upper=false;A.state.roof=false;A.state.walls='cut';$('wallMode').value='cut';if(id!=='overview'){const v=views[id];A.selectRoom(v.room,true);$('roomCard').hidden=true;A.state.selected=null;A.state.walls='cut';target.set(...v.target);radius=v.radius*Math.max(1,1.15/(document.querySelector('#workspace').clientWidth/document.querySelector('#workspace').clientHeight));theta=v.theta;phi=v.phi;cam();}for(const g of[A.phases.apres.floors,ROOM_GROUP])g.traverse(o=>{if(o.isMesh&&o.userData.roomId&&o.material.emissive)o.material.emissive.setHex(0);});A.apply();const z=V.zones.find(z=>z.id===id);$('conceptDescription').textContent=z?z.description[CASA_I18N.language]:({fr:'Jeu, création et moments partagés.',ro:'Joacă, creație și timp împreună.',en:'Play, creativity and time together.'})[CASA_I18N.language];}
for(const z of V.zones){const o=document.createElement('option');o.value='v1_'+z.id;o.textContent='Variante 1 · '+z.title.fr;$('walkSpawn').append(o);}
$('conceptView').onchange=e=>view(e.target.value);
for(const id of['v1Furniture','v1People'])$(id).onchange=sync;
function tour(){const id=current==='coffee'?'entrance':current==='overview'?'main':current;A.setPhase('apres');A.walk.start(id==='play'||id==='atelier'||id==='bureau3'?'main':id);if(current!=='overview')A.walk.setSpawn('v1_'+current);sync();}
for(const b of document.querySelectorAll('[data-view=walk]'))b.onclick=tour;
function language(){document.querySelector('.brand strong').textContent='Casa Artlia · V1';document.querySelector('.brand span').textContent=CASA_I18N.t('Un lieu à imaginer');document.title='Casa Artlia · '+CASA_I18N.t('Variante 1 · Maison de jeu & café');const z=V.zones.find(z=>z.id===current);$('conceptDescription').textContent=z?z.description[CASA_I18N.language]:({fr:'Jeu, création et moments partagés.',ro:'Joacă, creație și timp împreună.',en:'Play, creativity and time together.'})[CASA_I18N.language];$('v1Base').href='index.html?lang='+CASA_I18N.language;}
addEventListener('casa-language-change',language);
window.CASA_VARIANT={data:V,groups:{upper,ground,upperPeople,groundPeople,...groups},people,view,sync,get current(){return current;}};
addEventListener('resize',()=>{if(!A.walk.active&&A.state.view==='room')view(current);});
view('main');language();
})();
