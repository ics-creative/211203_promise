import"./modulepreload-polyfill.b7f2da20.js";const r=3;let n=[];const s=[],c=async()=>{const e=new Promise(t=>{s.push(t)});return a(),e},d=e=>{n=n.filter(t=>t!==e),a()},a=()=>{if(n.length>=r)return;const e=s.shift();if(!e)return;const t=Symbol();n.push(t),e(()=>{d(t)})},m=async e=>new Promise(t=>{setTimeout(t,e)}),p=document.getElementById("imageWall"),g=async e=>{const t=document.createElement("div");p.appendChild(t);const l=await c();t.classList.add("loading"),await m(Math.random()*1e3);const i=()=>{t.classList.remove("loading"),l()},o=new Image;o.onload=o.onabort=i,o.src=`https://picsum.photos/seed/${e}/300/300`,t.appendChild(o)};for(let e=0;e<36;e++)g(e+1);