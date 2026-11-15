/* Service worker Game Fisika XII. Naikkan VERSI setiap kali file game diubah. */
const VERSI = 'fisika-xii-v3';
const LOKAL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];
const THREE = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const LUAR = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSI);
    await c.addAll(LOKAL);
    try { await c.add(new Request(THREE, { mode: 'cors' })); } catch (_) { /* tetap lanjut, akan disimpan saat pertama dipakai */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSI) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET') return;
  const lokal = u.origin === location.origin;
  if (!lokal && !LUAR.includes(u.hostname)) return;

  if (r.mode === 'navigate') {            // halaman: coba jaringan dulu supaya update cepat, cadangan dari cache
    e.respondWith((async () => {
      try {
        const res = await fetch(r);
        (await caches.open(VERSI)).put('./index.html', res.clone());
        return res;
      } catch (_) {
        return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }
  e.respondWith((async () => {            // aset: pakai cache, perbarui di belakang layar
    const c = await caches.open(VERSI), ada = await c.match(r);
    const baru = fetch(r).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(r, res.clone()); return res; }).catch(() => null);
    return ada || (await baru) || Response.error();
  })());
});
