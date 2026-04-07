let isLoginMode = true;
let currentUser = null;

// Database sederhana menggunakan LocalStorage
function handleAuth() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (!user || !pass) return alert("Isi semua bidang!");

    if (isLoginMode) {
        // Logika Login
        const storedUser = JSON.parse(localStorage.getItem(user));
        if (storedUser && storedUser.password ===pass) {
            currentUser = user;
            alert("Login Berhasil!");
            updateUI();
            closeModal('authSection');
        } else {
            alert("Username atau Password salah!");
        }
    } else {
        // Logika Daftar
        localStorage.setItem(user, JSON.stringify({ password: pass }));
        alert("Pendaftaran Berhasil! Silakan Login.");
        toggleAuthMode();
    }
}

function updateUI() {
    if (currentUser) {
        document.getElementById('userDisplay').innerText = "Halo, " + currentUser;
        document.getElementById('btnLogin').style.display = "none";
        document.getElementById('btnLogout').style.display = "block";
    } else {
        document.getElementById('userDisplay').innerText = "";
        document.getElementById('btnLogin').style.display = "block";
        document.getElementById('btnLogout').style.display = "none";
    }
}

function logout() {
    currentUser = null;
    updateUI();
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').innerText = isLoginMode ? "Login" : "Daftar Akun Baru";
    document.getElementById('toggleText').innerText = isLoginMode ? "Belum punya akun? Daftar di sini" : "Sudah punya akun? Login";
}

// Proses Order
let selectedGameName = "";

function selectGame(name) {
    if (!currentUser) return alert("Silakan Login terlebih dahulu untuk top up!");
    selectedGameName = name;
    document.getElementById('targetGame').innerText = "Top Up " + name;
    showSection('paymentSection');
}

function processPayment() {
    const gameId = document.getElementById('gameId').value;
    const nominal = document.getElementById('nominal').value;
    const method = document.querySelector('input[name="pay"]:checked')?.value;

    if (!gameId || !method) return alert("Mohon lengkapi data dan pilih metode pembayaran!");

    const receiptData = `
        <strong>User:</strong> ${currentUser}<br>
        <strong>Game:</strong> ${selectedGameName}<br>
        <strong>ID Tujuan:</strong> ${gameId}<br>
        <strong>Nominal:</strong> ${nominal}<br>
        <strong>Metode:</strong> ${method}<br>
        <strong>No. Referensi:</strong> GP-${Math.floor(Math.random() * 1000000)}<br>
        <strong>Tanggal:</strong> ${new Date().toLocaleString('id-ID')}
    `;

    document.getElementById('receiptData').innerHTML = receiptData;
    closeModal('paymentSection');
    showSection('receiptSection');
}

function showSection(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}