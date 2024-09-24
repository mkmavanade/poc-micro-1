self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('home-cache-v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/bundle.js',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registrado com sucesso na aplicação About:', registration);
        })
        .catch(error => {
          console.error('Falha ao registrar o Service Worker:', error);
        });
    });
  }

  caches.open('about-cache-v1').then(function(cache) {
    return cache.addAll([
      'http://localhost:3000/remoteEntry.js' 
    ]);
  });
  