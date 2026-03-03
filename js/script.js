// ============================================================
// 1. FITUR DARK MODE (LocalStorage & DOM)
//    Modul: Variabel, DOM Selection, classList, LocalStorage
// ============================================================

const btnTheme = document.getElementById('themeToggle');
const body     = document.body;

// Cek apakah ada simpanan tema di browser (LocalStorage)
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    btnTheme.innerHTML = '<i class="bi bi-sun-fill"></i>';
}

// Event: klik tombol untuk toggle dark/light mode
btnTheme.addEventListener('click', function () {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        // Simpan pilihan ke LocalStorage agar diingat browser
        localStorage.setItem('theme', 'dark');
        btnTheme.innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else {
        localStorage.removeItem('theme');
        btnTheme.innerHTML = '<i class="bi bi-moon-fill"></i>';
    }
});


// ============================================================
// 2. FITUR BELI – Kurangi Stok (EventListener & DOM Manipulation)
//    Modul: querySelectorAll, addEventListener, innerText, parseInt
// ============================================================

function aktifkanTombolBeli() {
    // Ambil semua tombol Beli dengan class .btn-detail
    const tombolBeli = document.querySelectorAll('.btn-detail');

    tombolBeli.forEach(function (button) {
        button.addEventListener('click', function (e) {
            // Naik ke .card-body dari tombol yang diklik
            const cardBody   = e.target.closest('.card-body');
            // Ambil elemen stok di dalam card yang sama
            const stokEl     = cardBody.querySelector('.stok-value');
            // Ambil angka stok saat ini
            let stok         = parseInt(stokEl.innerText);

            if (stok > 0) {
                // Kurangi stok dan tampilkan di DOM
                stok--;
                stokEl.innerText = stok;

                // Ambil nama produk dari card-title
                const namaBarang = cardBody.querySelector('.card-title').innerText;
                alert('Berhasil membeli ' + namaBarang + '! Stok tersisa: ' + stok);

                // Jika stok habis, nonaktifkan tombol
                if (stok === 0) {
                    e.target.disabled  = true;
                    e.target.innerText = 'Habis';
                }
            } else {
                alert('Stok Habis!');
                e.target.disabled  = true;
                e.target.innerText = 'Habis';
            }
        });
    });
}

aktifkanTombolBeli();


// ============================================================
// 3. FITUR WISHLIST / FAVORIT (SessionStorage & DOM)
//    Modul: SessionStorage, classList.toggle, innerHTML, querySelectorAll
// ============================================================

// Ambil wishlist dari SessionStorage (array nama produk)
let wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];

// Update badge angka di navbar setelah halaman load
updateBadgeWishlist();

// Aktifkan semua tombol Favorit
const tombolWishlist = document.querySelectorAll('.btn-wishlist');

tombolWishlist.forEach(function (button) {
    const namaProduk = button.getAttribute('data-product-name');

    // Tandai tombol jika produk sudah ada di wishlist
    if (wishlist.includes(namaProduk)) {
        button.classList.add('active');
        button.innerHTML = '<i class="bi bi-heart-fill"></i> Favorit';
    }

    button.addEventListener('click', function () {
        if (wishlist.includes(namaProduk)) {
            // Hapus dari wishlist
            wishlist = wishlist.filter(item => item !== namaProduk);
            button.classList.remove('active');
            button.innerHTML = '<i class="bi bi-heart"></i> Favorit';
        } else {
            // Tambah ke wishlist
            wishlist.push(namaProduk);
            button.classList.add('active');
            button.innerHTML = '<i class="bi bi-heart-fill"></i> Favorit';
        }

        // Simpan ke SessionStorage & update badge
        sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateBadgeWishlist();
    });
});

// Fungsi: update angka badge favorit di navbar
function updateBadgeWishlist() {
    const badge = document.getElementById('wishlist-count');
    badge.innerText = wishlist.length;
}

// Fungsi: tampilkan isi wishlist di dalam modal
function tampilkanWishlist() {
    const daftarEl = document.getElementById('daftar-wishlist');

    if (wishlist.length === 0) {
        daftarEl.innerHTML = '<li class="list-group-item text-center text-muted py-4">' +
                             '<i class="bi bi-heart fs-3 d-block mb-2"></i>Favorit Anda kosong</li>';
    } else {
        daftarEl.innerHTML = '';
        wishlist.forEach(function (nama) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex align-items-center gap-2';
            li.innerHTML = '<i class="bi bi-heart-fill text-danger"></i> ' + nama;
            daftarEl.appendChild(li);
        });
    }
}

// Fungsi: kosongkan seluruh wishlist
function hapusWishlist() {
    wishlist = [];
    sessionStorage.removeItem('wishlist');
    updateBadgeWishlist();
    tampilkanWishlist();

    // Reset semua tombol wishlist ke kondisi awal
    document.querySelectorAll('.btn-wishlist').forEach(function (btn) {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="bi bi-heart"></i> Favorit';
    });
}


// ============================================================
// 4. FITUR FORM PEMESANAN (Event submit & DOM innerText)
//    Modul: addEventListener 'submit', value, innerText, innerHTML
// ============================================================

const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Cegah reload halaman

    // Ambil nilai dari input menggunakan .value
    const nama        = document.getElementById('nama').value;
    const whatsapp    = document.getElementById('whatsapp').value;
    const jenisBuket  = document.getElementById('jenisBuket').value;
    const jumlah      = document.getElementById('jumlah').value;

    // Tampilkan pesan sukses ke DOM menggunakan innerText / innerHTML
    const resultEl = document.getElementById('formResult');
    resultEl.innerHTML =
        '<div class="alert alert-success">' +
        '<i class="bi bi-check-circle-fill me-2"></i>' +
        '<strong>Pesanan diterima!</strong> Halo <strong>' + nama + '</strong>, ' +
        'pesanan <strong>' + jenisBuket + '</strong> sebanyak <strong>' + jumlah + ' pcs</strong> ' +
        'akan segera kami konfirmasi via WhatsApp <strong>' + whatsapp + '</strong>.' +
        '</div>';

    // Reset form setelah submit
    form.reset();

    // Hilangkan pesan setelah 5 detik
    setTimeout(function () {
        resultEl.innerHTML = '';
    }, 5000);
});