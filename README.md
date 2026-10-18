# Anniversary Website — A Letter for You

Website anniversary romantis berbasis **Next.js (App Router) + TypeScript + Tailwind CSS +
Framer Motion + Lucide**. Satu halaman, beberapa section, musik persisten, galeri polaroid,
surat cinta, bunga digital mekar, dan video YouTube sebagai penutup.

## Struktur Proyek

```
anniversary-site/
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── README.md
├── public/
│   ├── images/
│   │   ├── memory-01.jpg ... memory-08.jpg   # ganti dengan foto kalian
│   │   └── album-cover.jpg                   # cover lagu di mini-player
│   └── audio/
│       └── our-song.mp3                      # taruh file lagu di sini
└── src/
    ├── app/
    │   ├── layout.tsx        # font + metadata
    │   ├── page.tsx          # root: MusicPlayer persisten + semua section
    │   └── globals.css       # tekstur kertas, polaroid, efek film
    ├── config/
    │   └── anniversary.ts    # <<< SEMUA TEKS, FOTO, LAGU, VIDEO DI SINI
    ├── lib/
    │   ├── audioBus.ts       # jembatan agar musik bisa di-pause dari video YouTube
    │   └── youtube.ts        # ekstrak video ID dari URL YouTube secara aman
    └── components/
        ├── Envelope.tsx          # amplop pembuka interaktif
        ├── MainNav.tsx           # navigasi sticky + indikator section aktif
        ├── MemoriesGallery.tsx   # galeri polaroid + lightbox (keyboard support)
        ├── LoveLetter.tsx        # surat cinta di atas kertas
        ├── FlowerBloom.tsx       # bunga SVG mekar bertahap
        ├── YouTubeFinale.tsx     # video YouTube (lazy load) + jeda musik otomatis
        ├── MusicPlayer.tsx       # mini-player persisten (play/pause/progress/volume/loop)
        └── ClosingMessage.tsx    # pesan penutup + tombol kembali ke awal
```

## 1. Menjalankan Proyek Secara Lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000 di browser.

## 2. Mengganti Foto

1. Siapkan foto kalian (rasio 4:5 terlihat paling bagus, misal 800x1000 px).
2. Ganti file `public/images/memory-01.jpg` … `memory-08.jpg` **dengan nama yang sama** —
   foto langsung berubah tanpa menyentuh kode.
3. Untuk **menambah** foto: copy file ke `public/images/`, lalu tambahkan satu objek di array
   `photos` pada `src/config/anniversary.ts`:

```ts
{ src: "/images/memory-09.jpg", caption: "...", date: "Feb 2025", alt: "..." }
```

## 3. Mengganti File Musik

1. Taruh file lagu (mp3) di `public/audio/our-song.mp3`.
2. Ubah judul/artis/cover di `anniversaryConfig.song` pada `src/config/anniversary.ts`.
3. Pastikan kamu punya hak pakai lagu tersebut (rekaman sendiri / royalty-free / dengan izin).

## 4. Mengedit Surat, Nama, dan Semua Teks

Buka `src/config/anniversary.ts` — semuanya ada di situ:
`recipientName`, `senderName`, `anniversaryDate`, `letter.body` (array paragraf),
`flowers.hiddenMessage`, `youtube.intro/caption`, `closing.message`, dll.

## 5. Mengganti URL Video YouTube

Di `src/config/anniversary.ts`:

```ts
youtube: {
  url: "https://www.youtube.com/watch?v=GANTI_DENGAN_VIDEO_ID",
}
```

Didukung: `watch?v=`, `youtu.be/`, `/embed/`, `/shorts/`. Tidak perlu mengedit JSX sama sekali.
Video dimuat hanya saat pengunjung menekan tombol play (lazy load).

## 6. Cara Kerja Musik (Penting Dipahami)

- Hanya ada **satu** elemen `Audio`, dibuat sekali di `MusicPlayer` yang di-mount di root —
  musik **tidak pernah restart** saat berpindah section.
- Saat tombol **Open Your Letter** ditekan, website mencoba memutar musik. Gesture klik
  biasanya diizinkan browser.
- Jika browser **memblokir autoplay**, mini-player menampilkan tombol Play yang jelas
  beserta alasan singkatnya. Website tidak memaksa autoplay (sesuai kebijakan browser).
- Saat video YouTube mulai diputar, musik latar **dijeda otomatis** (posisi tersimpan)
  lewat `src/lib/audioBus.ts`, lalu bisa dilanjutkan manual lewat mini-player.

## 7. Deploy ke Vercel (Panduan Pemula)

1. **GitHub**: buat repository baru, lalu jalankan di folder proyek:
   ```bash
   git init
   git add .
   git commit -m "anniversary site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA_REPO.git
   git push -u origin main
   ```
2. **Vercel**: masuk ke vercel.com → *Add New → Project* → import repository GitHub tadi.
3. Vercel otomatis mendeteksi Next.js — biarkan semua setting default → klik **Deploy**.
4. Tunggu 1-2 menit, kamu mendapat link publik, mis. `https://nama-kamu.vercel.app`.
5. **Tes di HP**: buka link tersebut dari ponsel (pakai jaringan seluler, bukan Wi-Fi,
   untuk memastikan bisa diakses publik).
6. **Update konten**: edit `anniversary.ts` atau ganti file di `public/`, lalu
   `git add . && git commit -m "update" && git push` — Vercel akan otomatis re-deploy.

## 8. Checklist Pengujian

- [ ] Amplop terbuka saat tombol ditekan, lalu masuk ke halaman utama.
- [ ] Musik mulai berjalan (atau muncul tombol Play yang jelas jika diblokir).
- [ ] Musik **tidak berhenti/restart** saat scroll atau pindah section.
- [ ] Semua 4 menu navigasi melompat ke section yang benar; indikator aktif berubah.
- [ ] Semua foto tampil; klik foto membuka lightbox; panah kiri/kanan dan tombol X berfungsi.
- [ ] Lightbox bisa dikontrol dengan keyboard (Esc, panah kiri/kanan).
- [ ] Surat muncul dengan animasi halus saat di-scroll.
- [ ] Bunga mekar saat section terlihat; tombol pesan tersembunyi berfungsi.
- [ ] Tekan play video YouTube → musik latar terjeda; tidak ada dua audio bersamaan.
- [ ] Video responsif (rasio 16:9) di HP maupun desktop.
- [ ] Tes di Chrome/Safari Firefox + HP, termasuk mode reduced-motion di OS.
- [ ] Setelah konten diganti: `npm run build` sukses lokal sebelum push.
