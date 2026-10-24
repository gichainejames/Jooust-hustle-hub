const C='jhh-v4';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon.svg','./icon-192.png'])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// Show cached copy instantly, refresh it in the background (stale-while-revalidate)
self.addEventListener('fetch',e=>{
  if(e.request.method!='GET'||new URL(e.request.url).origin!=location.origin)return;
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r.ok){const x=r.clone();caches.open(C).then(c=>c.put(e.request,x))}return r}).catch(()=>hit);
    return hit||net;
  }))
});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
