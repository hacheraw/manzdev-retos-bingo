const v=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}};v();function N(e){let t=e.length,s,i;for(;t;)i=Math.floor(Math.random()*t--),s=e[t],e[t]=e[i],e[i]=s;return e}function h(e=3,t=9,s=4){const i=[];for(let n=0;n<t;n++){const c=[];for(;c.length<e;){const r=Math.floor(Math.random()*10),l=Number(`${n}${r}`);l>0&&c.indexOf(l)===-1&&c.push(l)}i.push(c.sort())}const o=[];for(let n=0;n<e;n++){const c=[];for(let r=0;r<t;r++)c.push(i[r][n]);o.push(c)}return L(o,e,t,s)}function L(e,t,s,i){const o=[];let n=[...Array(s).keys()],c=0;for(let r=0;r<t;r++){const l=[];if(r<t-1)for(let u=0;u<i;u++)[c,n]=g(n),l.push(c);else{l.push(n[0]),n=[...Array(s).keys()];for(let u=0;u<i-1;u++)[c,n]=g(n),l.push(c)}o.push(l)}for(let r=0;r<t;r++)for(let l=0;l<i;l++)e[r][o[r][l]]=null;return e}function g(e){const t=Math.round(Math.random()*(e.length-1)),s=e[t];return e.splice(t,1),[s,e]}function x(e){const t=[...Array(e).keys()].map(r=>r+1),s=h();let i=[];const o=[],n=[];let c=!0;for(;c;)i=h(),s.map(r=>r.filter(l=>l).map(l=>o.push(l))),i.map(r=>r.filter(l=>l).map(l=>n.push(l))),o.sort((r,l)=>r-l),n.sort((r,l)=>r-l),c=JSON.stringify(o)===JSON.stringify(n);return[t,s,i,o,n]}const C=document.querySelector("#player .numbers"),E=document.querySelector("#computer .numbers"),y=document.getElementById("drum"),d=y.querySelector("div"),M=document.getElementById("picked-numbers");let[p,O,S,f,a]=x(89),m=!0;b(O,C);b(S,E);y.addEventListener("click",()=>{if(m){const e=q();d.textContent=e,d.classList.add("playing"),D(e)}else p.length||alert("No quedan n\xFAmeros en el bombo"),d.classList.remove("playing"),d.textContent="Fin del juego"});function b(e,t){for(let s=0;s<e.length;s++)for(let i=0;i<e[s].length;i++)t.appendChild(k(e[s][i]))}function j(){p=N(p)}function q(){j();const e=p.shift();return A(e),e}function D(e){document.querySelectorAll(`.number-${e}`).forEach(t=>{t.classList.add("picked")}),f.includes(e)&&(f=f.filter(t=>t!==e),f.length===0&&(m=!1,console.log("Has ganado"))),a.includes(e)&&(a=a.filter(t=>t!==e),a.length===0&&(m=!1,console.log("Has perdido")))}function A(e){M.appendChild(k(e))}function k(e){const t=document.createElement("div");return e!==null&&(t.classList.add("cell",`number-${e}`),t.textContent=e),t}
