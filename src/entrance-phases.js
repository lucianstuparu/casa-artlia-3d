// Original lower facade and inclined lift belong only to after works.
const beforeEntranceGroup=group(ROOM_GROUP,'entrance.before_works'),ep=D.entrancePhases.avant;
const beforeLeft=ep.retainedApertureCm[0],beforeRight=ep.retainedApertureCm[1],beforeDoorX0=beforeLeft+ep.registeredFixedPanelsCm[0],beforeDoorX1=beforeDoorX0+ep.leafWidthCm,beforeHeight=ep.leafHeightCm;
function beforeFixedPane(x0,x1){const w=x1-x0,x=(x0+x1)/2;boxTo(beforeEntranceGroup,w-6,beforeHeight-6,2,matFacadeGlass,x,beforeHeight/2,-1,'entrance.before.fixed_glass');for(const a of [x0+1.5,x1-1.5])boxTo(beforeEntranceGroup,3,beforeHeight,4,matDoorFrame,a,beforeHeight/2,-2,'entrance.before.fixed_jamb');for(const y of [1.5,beforeHeight-1.5])boxTo(beforeEntranceGroup,w,3,4,matDoorFrame,x,y,-2,'entrance.before.fixed_crosspiece');}
beforeFixedPane(beforeLeft,beforeDoorX0);beforeFixedPane(beforeDoorX1,beforeRight);
boxTo(beforeEntranceGroup,beforeRight-beforeLeft,DOOR_H-beforeHeight,4,matDoorFrame,(beforeLeft+beforeRight)/2,(DOOR_H+beforeHeight)/2,-2,'entrance.before.head');
const beforePivot=group(beforeEntranceGroup,'entrance.before.hinged_leaf');beforePivot.position.set(beforeDoorX1,0,-4);
boxTo(beforePivot,ep.leafWidthCm-6,beforeHeight-6,2,matDoorGlass,-ep.leafWidthCm/2,beforeHeight/2,0,'entrance.before.leaf_glass');
for(const x of [-ep.leafWidthCm+1.5,-1.5])boxTo(beforePivot,3,beforeHeight,4,matDoorFrame,x,beforeHeight/2,-1,'entrance.before.leaf_side');
for(const y of [1.5,beforeHeight-1.5])boxTo(beforePivot,ep.leafWidthCm,3,4,matDoorFrame,-ep.leafWidthCm/2,y,-1,'entrance.before.leaf_crosspiece');
boxTo(beforePivot,3,20,7,matDoorFrame,-ep.leafWidthCm+10,105,-5,'entrance.before.handle');
boxTo(beforeEntranceGroup,ep.leafWidthCm,2,6,matDoorFrame,(beforeDoorX0+beforeDoorX1)/2,1,-2.4,'entrance.before.threshold');
const beforeArc=[];for(let i=0;i<=24;i++){const t=i/24*Math.PI/2;beforeArc.push([beforeDoorX1-ep.leafWidthCm*Math.cos(t),.8,-4+ep.leafWidthCm*Math.sin(t)]);}line(beforeEntranceGroup,beforeArc,0xb68f63,'entrance.before.swing',true);
const beforeEntrance={group:beforeEntranceGroup,pivot:beforePivot,doorX0:beforeDoorX0,doorX1:beforeDoorX1,centreX:(beforeDoorX0+beforeDoorX1)/2};
beforeEntranceGroup.userData.source=ep.source;beforeEntranceGroup.userData.assumption='A21';LIFT_SYSTEM_GROUP.userData.phase='apres';
const originalLiftVisibility=setLiftSystemVisible;let afterLiftVisible=LIFT_SYSTEM_GROUP.visible;
setLiftSystemVisible=function(on){if(state.phase==='apres')afterLiftVisible=!!on;originalLiftVisibility(state.phase==='apres'&&afterLiftVisible);};CASA_MODEL_API.setLiftSystemVisible=setLiftSystemVisible;CASA_MODEL_API.setLiftVisible=setLiftSystemVisible;
function applyEntrancePhase(){const after=state.phase==='apres';for(const o of AFTER_ENTRANCE_PARTS)o.visible=after;beforeEntranceGroup.visible=!after;originalLiftVisibility(after&&afterLiftVisible);
 $('equipmentToggle').hidden=!after;$('liftController').hidden=!after;for(const id of ['liftSystemVisible','liftVisibilityBtn','liftOnlyToggle','liftFollow'])$(id).disabled=!after;
 $('viewSelect').querySelector('option[value="rdc"]').textContent=after?'Entrée / plateforme':'Entrée existante';
 if(!after){$('liftVisibilityBtn').textContent='Aucune plateforme avant travaux';$('liftOnlyToggle').textContent='Aucune plateforme avant travaux';liftState.direction=0;liftState.follow=false;$('liftFollow').checked=false;$('liftPanel').classList.add('collapsed');$('equipmentToggle').setAttribute('aria-expanded','false');}
}
