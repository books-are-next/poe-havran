/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-b9ce5d2';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./havran_a_jine_basne_split_002.html","./havran_a_jine_basne_split_003.html","./havran_a_jine_basne_split_004.html","./havran_a_jine_basne_split_005.html","./havran_a_jine_basne_split_006.html","./havran_a_jine_basne_split_007.html","./havran_a_jine_basne_split_008.html","./havran_a_jine_basne_split_009.html","./havran_a_jine_basne_split_010.html","./havran_a_jine_basne_split_011.html","./havran_a_jine_basne_split_012.html","./havran_a_jine_basne_split_013.html","./havran_a_jine_basne_split_014.html","./havran_a_jine_basne_split_015.html","./havran_a_jine_basne_split_016.html","./havran_a_jine_basne_split_017.html","./havran_a_jine_basne_split_018.html","./havran_a_jine_basne_split_019.html","./havran_a_jine_basne_split_020.html","./havran_a_jine_basne_split_021.html","./havran_a_jine_basne_split_022.html","./havran_a_jine_basne_split_023.html","./havran_a_jine_basne_split_024.html","./havran_a_jine_basne_split_025.html","./havran_a_jine_basne_split_026.html","./havran_a_jine_basne_split_027.html","./havran_a_jine_basne_split_028.html","./havran_a_jine_basne_split_029.html","./havran_a_jine_basne_split_030.html","./havran_a_jine_basne_split_031.html","./havran_a_jine_basne_split_032.html","./havran_a_jine_basne_split_033.html","./havran_a_jine_basne_split_035.html","./index.html","./havran_a_jine_basne_split_034.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/obalka_havran_a_jine_basne.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
