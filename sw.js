const staticCache = 'res-staticStuff-v4';
contentImgsCache = 'res-contentImgStuff';
const allCaches = [
  staticCache,
  contentImgsCache
];


/**
 * Listen to the install event and cache static items
 */
self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(staticCache).then(function(cache) {
      return cache.addAll([
        'css/styles.css',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'js/main.js',
        'js/ServiceWorkerController.js',
        'js/polyfills/picturefill.min.js'
      ]);
    })
  );
});

/**
 * Listen to the activate event and delete older cache versions
 */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cachesNames) {
      return Promise.all(
        cachesNames.filter(function(cacheName) {
          return cacheName.startsWith('res-') && !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


/**
 * Listen to the fetch event and try to get items from the cache if possible
 */
self.addEventListener('fetch', function(event) {

  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin && requestUrl.pathname.startsWith('/img/')) {
    event.respondWith(serveImages(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});


/**
 * Helper function to serve images
 * Image urls look like:
 * img/1-500.jpg
 * But storageUrl has the -500.jpg bit missing
 * We store one copy of each avatar
 */
serveImages = (request) => {

  var storageUrl = request.url.replace(/-\d{3}.jpg$/, '') + '.jpg';

  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      return response || fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
};