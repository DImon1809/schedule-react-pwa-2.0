const cacheKey = "version_0.14";

const data = [
  "./",
  "./apple-touch-icon.png",
  "./asset-manifest.json",
  "./favicon-16x16.png",
  "./favicon-32x32.png",
  "./favicon.ico",
  "./index.html",
  "./logo512.png",
  "./logo192.png",
  "./manifest.json",
  "./robots.txt",
  "./serviceWorker.js",
  "./site.webmanifest",
  "./static/js/main.040f5660.js",
  "./static/js/main.040f5660.js.LICENSE.txt",
  "./static/js/main.040f5660.js.map",
  "./static/css/main.4a872a10.css",
  "./static/css/main.4a872a10.css.map",
  "./static/media/cancel-true.5b7862989f6b2361d48f.webp",
  "./static/media/cancel.2eed403a4aeff431e3c1.webp",
  "./static/media/check-true.91fad60184c503b2c280.webp",
  "./static/media/check.5b2bb1ba5a5940048958.webp",
  "./static/media/menu.f99586800c373b309e95.webp",
  "./static/media/minus.e01fd46000df566234b4.webp",
  "./static/media/plus.a3ce247fad0d5391a38d.webp",
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
