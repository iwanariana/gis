
self.addEventListener('install', function(e) {
    console.log('install');
    e.waitUntil(
        caches.open('myonsenuiapp').then(cache => {
            return cache.addAll([
              '/gis',
              '/gis/index.html',
              '/gis/home.html',
              '/gis/pelanggan.html',
              '/gis/sumber.html',
              '/gis/accesories.html',
              'https://unpkg.com/onsenui/css/onsenui.min.css',
              'https://unpkg.com/onsenui/css/onsen-css-components.min.css',
              'https://unpkg.com/onsenui/js/onsenui.min.js'
            ]);
          })   
    );
  });
  

  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request)
        .then(response => response || fetch(e.request))
    );
  });