YourFav Florist

Website toko buket bunga kawat bulu handmade yang dibangun menggunakan HTML, CSS, JavaScript, dan PHP.


Deskripsi

YourFav Florist adalah website e-commerce sederhana untuk toko buket bunga handmade. Website ini menampilkan koleksi produk buket, form pemesanan, serta sistem manajemen favorit. Dilengkapi dengan sistem autentikasi berbasis PHP Session sehingga hanya pengguna yang sudah login yang dapat mengakses halaman utama.

Fitur

Sistem Login (PHP Session)
- Form login dengan input username dan password
- Validasi kredensial secara server-side (hardcode)
- Status login disimpan menggunakan $_SESSION
- Redirect otomatis ke halaman utama setelah login berhasil
- Halaman utama tidak bisa diakses tanpa login (session guard)
- Jika login gagal, menampilkan Bootstrap Alert 

Remember Me (Cookie)
- Checkbox *Ingat username saya* pada form login
- Jika dicentang, username disimpan di cookie selama 30 hari
- Saat membuka halaman login kembali, field username otomatis terisi dari cookie
- Jika tidak dicentang, cookie dihapus

Logout
- Tombol logout tersedia di navbar halaman utama
- Menghapus seluruh data session
- Redirect ke halaman login dengan notifikasi Bootstrap Alert sukses

Dark Mode
- Toggle dark/light mode di navbar
- Pilihan tema disimpan di localStorage agar diingat browser
- Transisi warna halus menggunakan CSS variables

Stok & Tombol Beli
- Setiap produk menampilkan jumlah stok tersedia
- Klik tombol Beli akan mengurangi stok secara langsung di halaman
- Tombol otomatis berubah menjadi *Habis* dan dinonaktifkan saat stok mencapai 0

Wishlist / Favorit
- Tambah atau hapus produk dari daftar favorit
- Data wishlist disimpan menggunakan sessionStorage
- Badge angka di navbar menampilkan jumlah item favorit secara real-time
- Daftar favorit dapat dilihat melalui modal dan bisa dikosongkan sekaligus

Form Pemesanan
- Form pemesanan dengan input nama, nomor WhatsApp, jenis buket, dan jumlah
- Setelah submit, menampilkan konfirmasi pesanan langsung di halaman
- Form otomatis direset dan pesan konfirmasi hilang setelah 5 detik


