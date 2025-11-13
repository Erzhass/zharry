// index.js — toggler theme (persist ke localStorage)
(function () {
    const tbtn = document.getElementById("darkModeToggle"); // Diubah agar cocok dengan id di HTML
    const body = document.body;

    function applyTheme(theme) {
        body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        // Update teks tombol berdasarkan tema
        if (theme === "dark") {
            tbtn.textContent = "☀️ Light Mode";
        } else {
            tbtn.textContent = "🌙 Dark Mode";
        }
    }

    // Terapkan tema yang tersimpan saat halaman dimuat
    const saved = localStorage.getItem("theme") || "light";
    applyTheme(saved);

    // Event listener untuk toggle
    if (tbtn) {
        tbtn.addEventListener("click", () => {
            const currentTheme = body.getAttribute("data-theme");
            const nextTheme = currentTheme === "light" ? "dark" : "light";
            applyTheme(nextTheme);
        });
    }
})();