const CACHE='leitor-office-v8-renderers';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(CORE);await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{const cached=await caches.match(e.request);if(cached)return cached;try{const r=await fetch(e.request);if(r.ok||r.type==='opaque'){const c=await caches.open(CACHE);c.put(e.request,r.clone()).catch(()=>{})}return r}catch(_){return new Response('Este recurso ainda não foi carregado neste aparelho. Conecte-se à internet e abra o Leitor Office novamente.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}})}})())});
