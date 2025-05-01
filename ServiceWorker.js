const cacheName = "efuyegela-Busara-1.0";
const contentToCache = [
    "Build/d9da49f08bfb7ef6796844ace0549776.loader.js",
    "Build/21e762c16e10316bf0cf5ec04bc081f0.framework.js.unityweb",
    "Build/50f83a0f7d446a5057c4fcacb19e53d8.data.unityweb",
    "Build/7e6cac0d96e0919807d77c2105986af5.wasm.unityweb",
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
