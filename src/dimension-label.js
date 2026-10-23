function mkLabel(txt,x,y,z,sc){const c=document.createElement('canvas');c.width=256;c.height=64;
 const g=c.getContext('2d'),sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));
 sp.scale.set(46*(sc||1),11.5*(sc||1),1);sp.position.set(x,y,z);dimGroup.add(sp);sp.userData.sourceLabelLines=[txt];
 CASA_I18N.registerCanvas(()=>{g.clearRect(0,0,256,64);g.fillStyle='rgba(20,20,22,.72)';g.fillRect(0,0,256,64);g.font='bold 34px Arial';g.fillStyle='#ffd9a0';g.textAlign='center';g.textBaseline='middle';const label=CASA_I18N.t(txt);g.fillText(label,128,34,244);sp.userData.labelLines=[label];sp.userData.labelLanguage=CASA_I18N.language;sp.material.map.needsUpdate=true;});
}
