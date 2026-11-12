# Game Fisika XII

Game merakit rangkaian listrik dan transistor. Bisa dipasang sebagai aplikasi (PWA) dan dimainkan offline.

## Isi
- `index.html`  game
- `manifest.webmanifest`  data aplikasi (nama, ikon, layar penuh)
- `sw.js`  service worker (cache offline)
- `icons/`  ikon aplikasi
- `.nojekyll`  agar GitHub Pages menyajikan file apa adanya

## Pasang di GitHub Pages
1. Unzip, lalu push **isi folder ini** (bukan folder luarnya) ke repository GitHub, di cabang `main`.
2. Buka Settings, Pages, pilih Source: Deploy from a branch, Branch: `main`, folder `/ (root)`, lalu Save.
3. Tunggu satu sampai dua menit, buka `https://USERNAME.github.io/NAMA-REPO/`.
4. Pasang aplikasi:
   - Android Chrome: tombol Pasang aplikasi di menu game, atau menu titik tiga lalu Instal aplikasi.
   - Desktop Chrome/Edge: ikon pasang di kolom alamat.
   - iPhone Safari: tombol Bagikan lalu Tambah ke Layar Utama.

## Catatan
- Harus lewat HTTPS (GitHub Pages sudah HTTPS). Membuka `index.html` langsung dari folder tetap bisa main, tetapi tidak bisa dipasang.
- Buka game sekali dengan internet agar three.js dan font tersimpan, setelah itu bisa offline.
- Setelah mengubah file game, naikkan `VERSI` di `sw.js` (misalnya `fisika-xii-v2`) supaya pemain mendapat versi baru.
