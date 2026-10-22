// Scans works/, optimises images (if sharp is available) and writes dist/. No config needed.
const fs=require('fs'),path=require('path');
let sharp=null;try{sharp=require('sharp')}catch{console.log('[build] sharp not available — images copied unchanged')}
const KEYS=['title','category','year','client','description','services','overview','challenge','strategy','direction','deliverables','results','link','featured','order'];
const IMG=/\.(jpe?g|png|webp|avif|gif|svg)$/i, clean=n=>n.toLowerCase().replace(/[^a-z0-9.]+/g,'-').replace(/^-+|-+$/g,'');
const nat=(a,b)=>a.localeCompare(b,undefined,{numeric:true});
const cp=(a,b)=>{fs.mkdirSync(path.dirname(b),{recursive:true});fs.copyFileSync(a,b)};
function parse(t){const o={};let k=null;for(const l of t.replace(/\r/g,'').split('\n')){if(/^\s*#/.test(l))continue;const m=l.match(/^([A-Za-z]+)\s*:\s*(.*)$/);if(m&&KEYS.includes(m[1].toLowerCase())){k=m[1].toLowerCase();o[k]=m[2]}else if(k)o[k]+='\n'+l}for(const k in o)o[k]=o[k].trim();return o}
async function out(src,dest,w){
  const ext=path.extname(src).toLowerCase();
  if(sharp&&!['.svg','.gif'].includes(ext)){const d=dest.replace(/\.[^.]+$/,'')+'.webp';fs.mkdirSync(path.dirname(d),{recursive:true});await sharp(src).rotate().resize({width:w,withoutEnlargement:true}).webp({quality:82}).toFile(d);return d}
  cp(src,dest);return dest}
(async()=>{
  fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist');
  cp('src/index.html','dist/index.html');if(fs.existsSync('src/robots.txt'))cp('src/robots.txt','dist/robots.txt');
  if(fs.existsSync('assets'))fs.cpSync('assets','dist/assets',{recursive:true});
  const list=[];
  for(const dir of fs.existsSync('works')?fs.readdirSync('works').sort(nat):[]){
    if(/^[_.]/.test(dir)||!fs.statSync('works/'+dir).isDirectory())continue;
    const slug=clean(dir),base='works/'+dir,info=fs.existsSync(base+'/info.txt')?parse(fs.readFileSync(base+'/info.txt','utf8')):{};
    const files=fs.readdirSync(base).filter(f=>IMG.test(f)).sort(nat);
    const ci=files.findIndex(f=>/^cover\./i.test(f)),cover=files[ci>=0?ci:0],rest=files.filter(f=>f!==cover);
    const web=p=>p.replace(/^dist\//,'');
    const p={id:slug,title:info.title||dir.replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),cat:info.category||'Other',year:info.year||'',client:info.client||'',services:info.services||'',blurb:info.description||'',overview:info.overview||'',challenge:info.challenge||'',strategy:info.strategy||'',direction:info.direction||'',deliverables:info.deliverables||'',results:info.results||'',link:/^https?:\/\//.test(info.link||'')?info.link:'',featured:/^(yes|true|1)$/i.test(info.featured||''),order:parseFloat(info.order)||999,gallery:[]};
    if(cover){const n=clean(cover);p.cover=web(await out(`${base}/${cover}`,`dist/works/${slug}/${n.replace(/(\.[^.]+)$/,'-sm$1')}`,900));p.hero=web(await out(`${base}/${cover}`,`dist/works/${slug}/${n}`,1800))}
    for(const f of rest)p.gallery.push(web(await out(`${base}/${f}`,`dist/works/${slug}/${clean(f)}`,1800)));
    if(!cover)console.log(`[build] ${dir}: no images found`);
    list.push(p);console.log(`[build] + ${p.title} (${p.cat}, ${files.length} images)`);
  }
  list.sort((a,b)=>(b.featured-a.featured)||(a.order-b.order)||String(b.year).localeCompare(String(a.year))||a.title.localeCompare(b.title));
  fs.writeFileSync('dist/works.js','window.WORKS='+JSON.stringify(list)+';');
  console.log(`[build] done — ${list.length} project(s)`);
})().catch(e=>{console.error(e);process.exit(1)});
