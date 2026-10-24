// These functions share the building extension's cm coordinates, materials and interaction lists.
function makeSlidingDoor(parent,w,opening,u){
 const width=opening.to-opening.from,base=-Math.atan2(u[1],u[0]),pivot=group(parent,'door.'+state.phase+'.'+opening.id);
 pivot.position.set(w.a[0]+u[0]*opening.from,312,w.a[1]+u[1]*opening.from);pivot.rotation.y=base;
 const carriage=group(pivot,'sliding_carriage.'+opening.id);
 const leaf=boxTo(carriage,opening.nominalWidthCm,207,3,doorMat,width/2,103.5,8,'door_leaf.'+opening.id,{opening:opening.id,widthCm:90,clearWidthCm:83,between:opening.between,motion:'sliding'});
 pickDoors.push(leaf);leaf.userData.doorId=opening.id;
 boxTo(carriage,2,12,5,frameMat,width-10,103,12,'handle.'+opening.id);
 boxTo(pivot,opening.slideTravelCm+width,3,4,frameMat,(opening.slideTravelCm+width)/2,214,9,'sliding_track.'+opening.id);
 for(const x of [1.75,width-1.75])boxTo(pivot,3.5,210,8,frameMat,x,105,0,'sliding_jamb.'+opening.id);
 const d={id:opening.id,pivot,base,open:0,target:0,phase:state.phase,opening,motion:'sliding',carriage};doorStates.push(d);leaf.userData.doorState=d;
 return d;
}
function makeAccessibleToilet(parent){
 const P=D.pmr,I=P.internal,F=P.fixtures,t=F.toilet;
 boxTo(parent,42,38,30,white,t.centerCm[0]+3,331,t.centerCm[1],'pmr.pan_base',{source:'ERP8b/10a',geometryStatus:'simplified ceramic form'});
 const seat=new THREE.Mesh(new THREE.CylinderGeometry(1,1,6,32),white);seat.scale.set(27.5,1,20);seat.position.set(t.centerCm[0],312+44.5,t.centerCm[1]);parent.add(seat);seat.name='pmr.seat_47_5cm';seat.userData={source:'ERP8b/10a',seatHeightCm:47.5,sizeCm:[55,40]};
 const recess=new THREE.Mesh(new THREE.CylinderGeometry(1,1,.4,32),mat(0x87928c));recess.scale.set(18,1,12);recess.position.set(t.centerCm[0]-3,359.7,t.centerCm[1]);parent.add(recess);recess.name='pmr.pan_recess';
 const basin=F.basin;boxTo(parent,40,12,40,white,basin.centerCm[0],391,basin.centerCm[1],'pmr.basin_85cm',{source:'ERP8b',topHeightCm:85,clearUnderside:true});
 boxTo(parent,4,9,3,steel,I.eastX-5,401,basin.centerCm[1],'pmr.tap');
 beam(parent,[I.eastX-6,387,I.northZ+55],[I.eastX-6,387,I.northZ+90],3,3,steel,'pmr.grab_rail');
 beam(parent,[I.eastX-6,387,I.northZ+90],[I.eastX-18,387,I.northZ+90],3,3,steel,'pmr.grab_rail_elbow');
 const zones=group(parent,'pmr.accessibility_zones');
 const ring=[],circle=[];for(let i=0;i<80;i++){const a=i/80*Math.PI*2;circle.push([P.zones.turning.centerCm[0]+75*Math.cos(a),P.zones.turning.centerCm[1]+75*Math.sin(a)]);}
 flat(zones,circle,314.1,0,mat(0x3d946c,{transparent:true,opacity:.16,depthWrite:false}),'pmr.turning_area');
 line(zones,[...circle,circle[0]].map(([x,z])=>[x,314.35,z]),0x35805f,'pmr.turning_circle',true);
 for(const [id,poly,color] of [['transfer',P.zones.toiletUsageCm,0x438da7],['basin',P.zones.basinUsageCm,0xc18b36]]){flat(zones,poly,314.05,0,mat(color,{transparent:true,opacity:.14,depthWrite:false}),'pmr.'+id+'_usage');line(zones,[...poly,poly[0]].map(([x,z])=>[x,314.3,z]),color,'pmr.'+id+'_outline',true);}
 return zones;
}
