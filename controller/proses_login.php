<?php
session_start();

// Hanya terima method POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../login.php');
    exit;
}

// Kredensial hardcode
$valid_users = [
    'septia' => 'septia123',
];

$username    = trim($_POST['username'] ?? '');
$password    = $_POST['password'] ?? '';
$remember_me = isset($_POST['remember_me']);

if ($username === '' || $password === '') {
    $_SESSION['login_error'] = 'Username dan password tidak boleh kosong.';
    header('Location: ../login.php');
    exit;
}

if (!isset($valid_users[$username]) || $valid_users[$username] !== $password) {
    $_SESSION['login_error'] = 'Username atau password salah. Silakan coba lagi.';
    header('Location: ../login.php');
    exit;
}

$_SESSION['logged_in'] = true;
$_SESSION['username']  = $username;

if ($remember_me) {
    setcookie('remember_username', $username, time() + (30 * 24 * 60 * 60), '/');
} else {
    setcookie('remember_username', '', time() - 3600, '/');
}

header('Location: ../index.php');
exit;
?>