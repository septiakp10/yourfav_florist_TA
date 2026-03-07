<?php
session_start();

// Jika sudah login, langsung ke index
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    header('Location: index.php');
    exit;
}

// Ambil cookie remember me untuk pre-fill username
$cookie_username = $_COOKIE['remember_username'] ?? '';

// Ambil pesan error dari session (dikirim oleh proses_login.php)
$error = $_SESSION['login_error'] ?? '';
unset($_SESSION['login_error']); // Hapus setelah ditampilkan
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login – YourFav Florist</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/style.css">
    <style>
        body {
            background-color: #fff0f5;
        }
        .login-card {
            border: 1px solid #f5c6d0;
            border-radius: 12px;
        }
        .brand-name {
            color: #CF7486;
            font-weight: 700;
            font-size: 1.5rem;
        }
        .btn-pink {
            background-color: #CF7486;
            border-color: #CF7486;
            color: #fff;
            font-weight: 600;
        }
        .btn-pink:hover {
            background-color: #B85A70;
            border-color: #B85A70;
            color: #fff;
        }
        .form-control:focus {
            border-color: #CF7486;
            box-shadow: 0 0 0 0.2rem rgba(207,116,134,0.2);
        }
        .form-check-input:checked {
            background-color: #CF7486;
            border-color: #CF7486;
        }
        .text-pink { color: #CF7486; }
    </style>
</head>
<body class="d-flex align-items-center justify-content-center min-vh-100">

<div class="w-100" style="max-width: 400px; padding: 0 16px;">

    <!-- Brand -->
    <div class="text-center mb-4">
        <div class="brand-name">🌸 YourFav Florist</div>
        <p class="text-muted small mb-0">Masuk untuk melanjutkan</p>
    </div>

    <div class="card login-card shadow-sm">
        <div class="card-body p-4">

            <!-- Alert Error -->
            <?php if ($error): ?>
            <div class="alert alert-danger d-flex align-items-center gap-2 py-2" role="alert">
                <i class="bi bi-exclamation-circle-fill"></i>
                <span><?= htmlspecialchars($error) ?></span>
            </div>
            <?php endif; ?>

            <!-- Alert Logout -->
            <?php if (isset($_GET['logout']) && $_GET['logout'] === '1'): ?>
            <div class="alert alert-success d-flex align-items-center gap-2 py-2" role="alert">
                <i class="bi bi-check-circle-fill"></i>
                <span>Berhasil logout. Sampai jumpa! 👋</span>
            </div>
            <?php endif; ?>

            <!-- Form → action ke controller/proses_login.php -->
            <form method="POST" action="controller/proses_login.php">

                <div class="mb-3">
                    <label class="form-label fw-semibold" for="username">Username</label>
                    <input type="text" class="form-control" id="username" name="username"
                           placeholder="Masukkan username"
                           value="<?= htmlspecialchars($cookie_username) ?>"
                           required autocomplete="username">
                </div>

                <div class="mb-3">
                    <label class="form-label fw-semibold" for="password">Password</label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="password" name="password"
                               placeholder="Masukkan password"
                               required autocomplete="current-password">
                        <button class="btn btn-outline-secondary" type="button" id="togglePassword" tabindex="-1">
                            <i class="bi bi-eye" id="eyeIcon"></i>
                        </button>
                    </div>
                </div>

                <div class="mb-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="remember_me" name="remember_me"
                               <?= $cookie_username ? 'checked' : '' ?>>
                        <label class="form-check-label small" for="remember_me">
                            Ingat username saya
                        </label>
                    </div>
                </div>

                <button type="submit" class="btn btn-pink w-100">
                    <i class="bi bi-box-arrow-in-right me-1"></i> Masuk
                </button>

            </form>
        </div>
    </div>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
<script>
    document.getElementById('togglePassword').addEventListener('click', function () {
        const pw = document.getElementById('password');
        const icon = document.getElementById('eyeIcon');
        if (pw.type === 'password') {
            pw.type = 'text';
            icon.className = 'bi bi-eye-slash';
        } else {
            pw.type = 'password';
            icon.className = 'bi bi-eye';
        }
    });
</script>
</body>
</html>