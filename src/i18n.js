/* French source labels remain canonical; presentation translations are local and offline. */
(()=>{
'use strict';
const catalog=CASA_TRANSLATIONS,allowed=['fr','ro','en'],canvasPainters=new Set(),bindings=new WeakMap(),attributes=new WeakMap();
let language='fr',observer;
let saved,query;try{saved=localStorage.getItem('casa-artlia-language');}catch{}try{query=new URL(location.href).searchParams.get('lang');}catch{}language=allowed.includes(query)?query:allowed.includes(saved)?saved:'fr';
const escape=s=>s.replace(/[.*+?^$()|[\]{}\\]/g,'\\$&');
const terms=Object.keys(catalog).sort((a,b)=>b.length-a.length);
const phrasePattern=new RegExp(terms.map(k=>(/^[\p{L}\p{N}]/u.test(k)?'(?<![\\p{L}\\p{N}])':'')+escape(k)+(/[\p{L}\p{N}]$/u.test(k)?'(?![\\p{L}\\p{N}])':'')).join('|'),'gu');
function t(source,lang=language){
 const text=String(source??'');if(lang==='fr')return text;
 const key=text.trim(),entry=catalog[key];let result;
 if(entry)result=text.replace(key,()=>entry[lang]);
 else result=text.replace(phrasePattern,k=>catalog[k][lang]);
 if(lang==='en')result=result.replace(/(\d),(\d+)(?=\s*(?:m²|cm|m\b))/g,'$1.$2');
 return result;
}
function translateNode(node){
 const current=node.nodeValue;if(!current?.trim())return;
 let b=bindings.get(node);if(!b||current!==b.rendered)b={source:current};
 const rendered=t(b.source);if(current!==rendered)node.nodeValue=rendered;b.rendered=rendered;bindings.set(node,b);
}
function translateElement(el){
 if(el.closest('script,style,svg,canvas,[data-no-i18n]'))return;
 let record=attributes.get(el);if(!record){record={};attributes.set(el,record);}
 for(const name of ['aria-label','title','alt','placeholder']){if(!el.hasAttribute(name))continue;const current=el.getAttribute(name);let b=record[name];if(!b||current!==b.rendered)b={source:current};const rendered=t(b.source);if(current!==rendered)el.setAttribute(name,rendered);b.rendered=rendered;record[name]=b;}
}
function translateTree(root){
 if(root.nodeType===Node.TEXT_NODE){if(!root.parentElement?.closest('script,style,svg,canvas,[data-no-i18n]'))translateNode(root);return;}
 if(root.nodeType!==Node.ELEMENT_NODE)return;
 translateElement(root);
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode(n){if(n.nodeType===Node.ELEMENT_NODE&&n.matches('script,style,svg,canvas,[data-no-i18n]'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}});
 let node;while(node=walker.nextNode())node.nodeType===Node.TEXT_NODE?translateNode(node):translateElement(node);
}
const options={subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','alt','placeholder']};
function observe(){if(language!=='fr')observer?.observe(document.body,options);}
function flush(roots){observer?.disconnect();for(const root of roots)if(root.isConnected)translateTree(root);observe();}
function setLanguage(next,{persist=true}={}){
 if(!allowed.includes(next))return false;language=next;document.documentElement.lang=next;
 document.title='Casa Artlia — '+t('Bâtiment complet avant / après');const description=document.querySelector('meta[name=description]');if(description)description.content=t('Explorez Casa Artlia en 3D : plans avant et après travaux, visite à pied et plateforme Ganser GTLE.');
 if(document.body)flush([document.body]);
 const select=document.getElementById('languageSelect');if(select)select.value=next;
 for(const paint of canvasPainters)paint();
 if(persist){try{localStorage.setItem('casa-artlia-language',next);}catch{}try{const url=new URL(location.href);url.searchParams.set('lang',next);history.replaceState(null,'',url);}catch{}}
 window.dispatchEvent(new CustomEvent('casa-language-change',{detail:{language:next}}));return true;
}
window.CASA_I18N={get language(){return language;},supported:allowed,t,setLanguage,registerCanvas(paint){canvasPainters.add(paint);paint();},get canvasLabelCount(){return canvasPainters.size;},sourceText(node){return bindings.get(node)?.source??node.textContent;},catalog};
document.addEventListener('DOMContentLoaded',()=>{
 observer=new MutationObserver(records=>{const roots=new Set();for(const r of records){if(r.type==='childList')for(const n of r.addedNodes)roots.add(n);else roots.add(r.target);}if(roots.size)flush(roots);});
 document.getElementById('languageSelect').addEventListener('change',e=>setLanguage(e.target.value));setLanguage(language,{persist:false});
});
})();
