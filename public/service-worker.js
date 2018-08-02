var CACHE_NAME = 'static-cache';
var urlsToCache = [
  '.',
  'issuelist.html',
  'sample_detail_page'
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});