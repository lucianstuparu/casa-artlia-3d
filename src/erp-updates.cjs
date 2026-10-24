'use strict';
// July PMR revision. Apply after the original May traces and corrections C01/C02.
module.exports=function applyERPUpdate(data){
 const copy=x=>structuredClone(x),round=n=>+n.toFixed(2);
 const urls={folder:'https://drive.google.com/drive/folders/197evJeGbnI_7cGR3R8y6wHf2G_1grLCr',floor:'https://drive.google.com/file/d/13iDKXBmPUDx07YoeOx8Z2mP_ZeK9BOGT/view',detail:'https://drive.google.com/file/d/16cxmhmHztsbILyhYSHwjtHFROszrH4A8/view',note:'https://drive.google.com/file/d/1HAkXxrmgoFXWkKd0WE2OIZj5DNzRyLfU/view'};
 const oldRooms=data.rooms.filter(r=>['toilet','wc','circulation','info'].includes(r.id)).map(copy);
 const oldWalls=data.walls.filter(w=>['toilet_top','toilet_left','toilet_wc','wc_info','info_left'].includes(w.id)).map(copy);
 const before=id=>data.rooms.find(r=>r.id===id);
 const after=id=>{const r=before(id),a=copy(r);r.state='avant';a.state='apres';a.geometryStatus+='; C03 dimensioned PMR revision, local registration A15';data.rooms.push(a);return a;};
 // Fix the existing façade inner face and northern partition; do not scale either axis.
 const eastWall=data.walls.find(w=>w.id==='east_rear'),northWall=data.walls.find(w=>w.id==='toilet_top');
 const E=round(eastWall.a[0]-eastWall.thicknessCm/2),N=round(northWall.a[1]+3.5),S=round(N+275),W=round(E-150),X=round(W-20),Z=round(N+60);
 const toilet=after('toilet');before('wc').state='avant';
 Object.assign(toilet,{names:{avant:'Toilette',apres:'Sanitaire adapté PMR'},printedAreaM2:4.55,polygonCm:[[W,N],[E,N],[E,S],[X,S],[X,Z],[W,Z]],labelCm:[round((X+E)/2),round(N+153)],sourceDimensionLabelsCm:{baseWidth:150,widenedWidth:170,depth:275,westOffset:20,offsetLength:215,doorLeaf:90,doorClear:83,turningDiameter:150},dimensionStatus:'ERP8b explicit finished internal cm; globally registered at retained east inner face / north partition; A15',adaptedToilet:true,geometryStatus:'ERP8b explicit finished internal dimensions; global placement locally registered, C03/A15'});
 const circulation=after('circulation');circulation.printedAreaM2=22.14;
 circulation.polygonCm=[...oldRooms.find(r=>r.id==='circulation').polygonCm.slice(0,3),[774.87,round(N-7)],[round(W-7),round(N-7)],[round(W-7),round(Z-7)],[round(X-7),round(Z-7)],[round(X-7),S],[625.86,S],[625.86,1066.02],[479.14,1066.02],[479.14,407],[270.52,407]];
 circulation.sourceDimensionLabelsCm={residualCorridorWidth:210};circulation.dimensionStatus='210cm clearance and22.14m2 are source values, not a claim that the unverified global trace reproduces them; A03/A15';
 const info=after('info');info.polygonCm[0][1]=round(S+7);info.polygonCm[1][1]=round(S+7);info.geometryStatus+='; northern connection extended locally to dimensioned PMR south wall; original printed area retained';
 for(const wall of data.walls)if(oldWalls.some(w=>w.id===wall.id))wall.state='avant';
 const wall=(id,a,b,openings=[])=>{const w={id,a,b,thicknessCm:7,state:'apres',openings,sourceStatus:'ERP8b/10a finished dimensions; retained north/east registration A15'};data.walls.push(w);return w;};
 wall('pmr_north',[northWall.a[0],round(N-3.5)],[eastWall.a[0],round(N-3.5)]);
 wall('pmr_west_upper',[round(W-3.5),round(N-3.5)],[round(W-3.5),round(Z-3.5)]);
 wall('pmr_west_step',[round(X-3.5),round(Z-3.5)],[W,round(Z-3.5)]);
 const doorStart=round(N+90),doorEnd=round(doorStart+90),westStart=round(Z-3.5);
 wall('pmr_west_lower',[round(X-3.5),westStart],[round(X-3.5),round(S+3.5)],[{id:'pmr_sliding_door',type:'door',motion:'sliding',from:round(doorStart-westStart),to:round(doorEnd-westStart),widthCm:90,nominalWidthCm:90,clearWidthCm:83,heightCm:210,sillCm:0,between:['circulation','toilet'],slideDirection:1,slideTravelCm:94,wallSide:'corridor',sourceStatus:'90cm nominal /83cm useful from8b/10a; vertical height210cm and frame detailing assumed A07/A15'}]);
 wall('pmr_info_boundary',[oldWalls.find(w=>w.id==='wc_info').a[0],round(S+3.5)],[eastWall.a[0],round(S+3.5)]);
 const oldInfoWall=oldWalls.find(w=>w.id==='info_left'),shift=round(oldInfoWall.a[1]-(S+3.5));
 const revisedInfo=copy(oldInfoWall);revisedInfo.id='info_left_apres';revisedInfo.state='apres';revisedInfo.a[1]=round(S+3.5);revisedInfo.openings.forEach(o=>{o.from=round(o.from+shift);o.to=round(o.to+shift);});revisedInfo.sourceStatus+='; C03 north endpoint reconciled locally, existing door world position retained';data.walls.push(revisedInfo);
 const toiletUsage=[[E-130,N+50],[E,N+50],[E,N+130],[E-130,N+130]].map(p=>p.map(round));
 const basinUsage=[[E-130,S-80],[E,S-80],[E,S],[E-130,S]].map(p=>p.map(round));
 data.pmr={phase:'apres',source:urls,documentDate:'2026-07-25',internal:{northZ:N,southZ:S,eastX:E,westBaseX:W,westWidenedX:X,stepZ:Z,baseWidthCm:150,widenedWidthCm:170,depthCm:275,offsetCm:20,offsetLengthCm:215},door:{id:'pmr_sliding_door',northZ:doorStart,southZ:doorEnd,nominalWidthCm:90,clearWidthCm:83,heightCm:210,heightStatus:'assumed A07',slideTravelCm:94},fixtures:{toilet:{centerCm:[round(E-27.5),round(N+30)],sizeCm:[55,40],seatHeightCm:47.5,seatHeightRangeCm:[45,50],placementSource:'east wall; axis30cm from north, ERP8b/10a'},basin:{centerCm:[round(E-20),round(S-20)],sizeCm:[40,40],topHeightCm:85,placementStatus:'south-east corner from8b; simplified body/tap assumed'},grabRail:{heightCm:75,heightRangeCm:[70,80],placementStatus:'east wall per source; elbow detail simplified'}},zones:{turning:{centerCm:[round(X+85),round(N+155)],diameterCm:150,placementStatus:'traced relative placement from8b; dimensions explicit'},toiletUsageCm:toiletUsage,basinUsageCm:basinUsage},printed:{toiletAreaM2:4.55,circulationAreaM2:22.14,residualCorridorWidthCm:210},registration:{eastInnerFaceFixed:true,northPartitionFixed:true,wallThicknessCm:7,infoNorthAdjustmentCm:-shift,globalCorridorWidthReproduced:false,status:'A15: dimensional detail governs toilet; adjacent floor connections remain interpreted'},complianceStatus:'source design represented; not a compliance certification'};
 data.sources.updatedERP={...urls,detailDate:'2026-07-25',driveUploadDate:'2026-10-22'};
 data.sources.originalMayApres=data.sources.apres;data.sources.apres=urls.floor;
 data.sources.planByPhaseLevel={avant0:data.sources.avant,avant1:data.sources.avant,apres0:data.sources.originalMayApres,apres1:urls.floor};
 data.assumptions.find(a=>a.id==='A10').description='Après travaux: ERP8a/8b et notice10a révisent les deux sanitaires en un seul local PMR de4,55m². Cloison et deux anciennes portes supprimées; largeur150/170cm, profondeur275cm, décroché20cm sur215cm, porte coulissante90cm / passage83cm. Avant travaux conservé depuis le dossier de mai.';
 data.assumptions.push({id:'A15',affects:'Raccord du sanitaire révisé',status:'explicit_dimensions_with_local_registration_conflict',description:'Le détail8b du25/07/2026 gouverne les dimensions intérieures du sanitaire. Le tracé global8a et le relevé v10 ne concordent pas à la même échelle locale. Face intérieure de façade est et cloison nord conservées; limite nord du Local info raccordée localement, porte info maintenue en position. Les210cm du dégagement et22,14m² sont des cotes/surfaces source, distinctes du contour global calculé. Hauteur de porte210cm, détails des appareils et position exacte des zones restent interprétés; aucune certification de conformité.'});
 data.differences=data.differences.filter(x=>!x.startsWith('Toilette marquée'));
 data.differences.push('Toilette et WC réunis en un sanitaire adapté PMR de4,55m²; cloison et deux portes supprimées.','Décroché20cm sur215cm dans Dgt2; porte coulissante90cm, passage83cm. Dgt2:22,14m² au plan.');
 data.reconstructionCorrections.push({id:'C03_july_PMR_revision',appliesTo:['apres'],source:urls,action:'merge_toilets_remove_partition_replace_two_hinged_doors_with_west_sliding_door_and_widen_lower_wall',originalRooms:oldRooms,originalWalls:oldWalls,registration:data.pmr.registration,preserved:['avant May layout','v10 entrance/stairs/GTLE','façade/east wall','C01/C02','info door world position']});
 for(const r of data.rooms){if(r.state!=='apres'||!['toilet','circulation','info'].includes(r.id))continue;const a=r.polygonCm;r.computedPolygonAreaM2=+Math.abs(a.reduce((s,v,i)=>{const b=a[(i+1)%a.length];return s+v[0]*b[1]-b[0]*v[1];},0)/20000).toFixed(3);}
 return data;
};
