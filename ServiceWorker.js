const cacheName = "efuyegela-Busara-1.0";
const contentToCache = [
    "Build/b8f9f5c33bec68a3f6770df9e16319c3.loader.js",
    "Build/21e762c16e10316bf0cf5ec04bc081f0.framework.js.unityweb",
    "Build/1bab08455cd714f5c85685b8402d8767.data.unityweb",
    "Build/9985ee82f677792329fd7618f9f1996c.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
