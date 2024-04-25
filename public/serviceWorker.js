const cacheKey = "version_0.12";

const data = [
  "./",
  "./serviceWorker.js",
  "./robots.txt",
  "./manifest.json",
  "./logo512.png",
  "./logo192.png",
  "./index.html",
  "./favicon.ico",
  "./asset-manifest.json",
  "./static/js/main.364fa700.js",
  "./static/js/main.364fa700.js.LICENSE.txt",
  "./static/js/main.364fa700.js.map",
  "./static/css/main.ace3a1a1.css",
  "./static/css/main.ace3a1a1.css.map",
];

self.addEventListener("install", async (event) => {
  try {
    console.log("Install...");

    const cache = await caches.open(cacheKey);

    return await cache.addAll(data);
  } catch (err) {
    console.error(err);
  }
});

self.addEventListener("activate", async (event) => {
  try {
    console.log("Service worker is activate...");

    await event.waitUntil(
      caches.keys().then((_key) => {
        return Promise.all(
          _key.map((_key) => {
            if (_key !== cacheKey) return caches.delete(_key);
          })
        );
      })
    );
  } catch (err) {
    console.error(err);
  }
});

const cacheFirst = async (request) => {
  const cached = await caches.match(request);

  return cached ?? (await fetch(request));
};

self.addEventListener("fetch", async (event) => {
  try {
    console.log("Fetch event working...");

    await event.respondWith(cacheFirst(event.request));
  } catch (err) {
    console.error(err);
  }
});
