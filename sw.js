const CACHE='leitor-office-v6-header-icon-embedded';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
const LIBS=[
'https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js',
'
'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js'
];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(CORE);for(const u of LIBS){try{const r=await fetch(u,{mode:'no-cors'});await c.put(u,r)}catch(_){}}await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;e.respondWith((async()=>{const cached=await caches.match(e.request);if(cached)return cached;try{const r=await fetch(e.request);if(u.origin===location.origin){const c=await caches.open(CACHE);c.put(e.request,r.clone())}return r}catch(_){return new Response('Recurso indisponível offline',{status:503})}})())});
