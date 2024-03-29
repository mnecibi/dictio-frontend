self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('video-store').then(function(cache) {
        return cache.addAll([
        ]);
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});

// app-based solution
let refreshing = false;

// detect controller change and refresh the page
if(navigator && navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            window.location.reload()
            refreshing = true
        }
    })
}