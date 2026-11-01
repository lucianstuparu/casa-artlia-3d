// Geometry regression tests exercise retained controls through their new drawer location.
exports.control=async(page,selector,method,value)=>{
 const section=selector==='#viewSelect'?'explore':'study';
 await page.evaluate(section=>CASA_INTERFACE.openDrawer(section,section==='explore'?'displayPane':undefined),section);
 await page[method](selector,...(value===undefined?[]:[value]));
 if(await page.locator('#studyDrawer').evaluate(d=>d.open))await page.locator('#studyDrawer').evaluate(d=>d.close());
};
