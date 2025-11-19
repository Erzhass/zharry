🟤 Coffee Order Web App

Website pemesanan kopi dengan tampilan responsif, sistem pemesanan interaktif, dan backend sederhana untuk menyimpan data pesanan. Dibangun menggunakan HTML, TailwindCSS, dan JavaScript untuk frontend, serta Node.js + Express untuk backend.

Aplikasi ini dapat digunakan untuk simulasi sistem pemesanan kopi, tugas sekolah/kampus, atau proyek web pemula.

⭐ Fitur Utama

Form Pemesanan Kopi
Pengguna dapat memilih jenis kopi, jumlah pesanan, dan mengirimkan data secara langsung.

Pilihan Menu Lengkap
Menu kopi disimpan dalam opsi dinamis dengan harga otomatis.

Konfirmasi via Popup/Modal
Setelah pengguna mengirim pesanan, muncul popup konfirmasi yang elegan.

Halaman Admin
Admin dapat melihat daftar seluruh pesanan, termasuk nama, item, jumlah, dan total harga.

Penyimpanan ke Database
Data pesanan disimpan menggunakan database SQL sederhana (MySQL).

Desain Responsif
Tampilan rapi dan dapat dibuka dari HP, tablet, maupun desktop.

LocalStorage Support (opsional)
Menyimpan draft pesanan di browser.

Dark Mode Support
Mengambil preferensi dari halaman utama / root page.

🧰 Tech Stack
Frontend

HTML5

TailwindCSS

JavaScript (DOM Manipulation)

Backend

Node.js + Express
(PHP dapat digunakan, tetapi template ini menggunakan Node.js karena lebih umum di project modern.)

Database

MySQL (MariaDB)

🔧 Cara Instalasi (Local Development)

1. Clone Repository
   git clone https://github.com/username/coffee-order-web.git
   cd coffee-order-web

2. Instal Dependencies Backend
   npm install

3. Setup Database

Buat database baru:

CREATE DATABASE coffee_order;
USE coffee_order;

4. Buat Tabel Pesanan
   CREATE TABLE orders (
   id INT AUTO_INCREMENT PRIMARY KEY,
   customer_name VARCHAR(100) NOT NULL,
   coffee_name VARCHAR(100) NOT NULL,
   quantity INT NOT NULL,
   price INT NOT NULL,
   total INT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

5. Buat File .env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=coffee_order

6. Jalankan Server Local
   npm start

Server akan berjalan di:

http://localhost:3000

☕ Cara Menggunakan Website

Buka halaman utama.

Pilih jenis kopi dari menu dropdown.

Masukkan jumlah (quantity).

Tekan tombol “Pesan”.

Muncul popup konfirmasi → pengguna menekan OK.

Data pesanan dikirim ke server dan masuk database.

Admin dapat membuka halaman /admin untuk melihat seluruh pesanan:

nama pelanggan

menu kopi

jumlah

total harga

waktu pemesanan

📁 Struktur Folder Proyek

Struktur rapi untuk web sederhana:

coffee-order-web/
│
├── public/
│ ├── css/
│ │ └── style.css
│ ├── js/
│ │ ├── main.js
│ │ └── order.js
│ ├── img/
│ └── index.html
│
├── views/
│ ├── admin.html
│ └── confirm.html
│
├── server/
│ ├── db.js
│ ├── routes.js
│ └── controller.js
│
├── .env
├── package.json
├── README.md
└── server.js

🛠️ Tips Pengembangan
✔ Validasi Input

Pastikan pengguna tidak mengirim data kosong atau jumlah pesanan kurang dari 1.

✔ Penggunaan Modal Popup

Gunakan komponen modal Tailwind untuk konfirmasi pesanan agar lebih profesional.

✔ Keamanan Dasar Backend

Gunakan prepared statement untuk mencegah SQL Injection.

Validasi setiap request di server.

Jangan commit file .env.

✔ Responsivitas

Tailwind membantu memastikan tampilan tetap konsisten di semua perangkat.

🤝 Contributing Guide

Jika ingin berkontribusi:

1. Buat Branch Baru
   git checkout -b fitur-baru

2. Commit Perubahan
   git commit -m "Menambahkan fitur baru"

3. Push ke Repo
   git push origin fitur-baru

4. Buat Pull Request

Jelaskan fitur yang ditambahkan

Sertakan screenshot bila perlu

🖼️ Screenshot Section

Tambahkan screenshot di folder screenshots/, lalu tampilkan seperti berikut:

![Homepage](img/homepage.png)
![Form Order](/order-form.png)

📄 License

Proyek ini menggunakan MIT License, sehingga bebas digunakan, dimodifikasi, dan dikembangkan kembali.

📬 Contact

Nama: Erzha Noverico Ardheva
Email: falzagaming12@gmail.com
GitHub: https://github.com/Erzhass

Nama: Ferry Ferdianto
Email: ferryferdianto1624@gmail.com
Github: https://github.com/FerryFerdianto24
