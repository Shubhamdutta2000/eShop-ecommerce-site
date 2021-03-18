const CACHE_NAME = "version-1-pwa";
const urlsToCache = ["index.html", "offline.html"];

///    Install ServiceWorker    ///
this.addEventListener("install", (event) => {
  // waiting untill something is done
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

///    Listen for request    ///
this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

///    Activate Service Worker    ///
// (we keep only specific cache version we need
// And others which does not includes in cacheWhitelist delete that cache )
this.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
