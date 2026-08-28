const CACHE = "git-stage-lines-v2";
const SHELL = ["/", "/index.html", "/demo/", "/privacy/", "/terms/", "/404.html", "/assets/hero.webp", "/assets/hero-768.webp", "/mark.svg", "/apple-touch-icon.png", "/og-image.jpg", "__BUILD_ASSETS__"];
self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL))));
self.addEventListener("activate", (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))));
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (response.ok && new URL(event.request.url).origin === location.origin) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
    return response;
  }).catch(async () => {
    if (event.request.mode === "navigate") return (await caches.match(event.request)) || caches.match("/404.html");
    return new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
  })));
});
