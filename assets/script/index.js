// index.js — Toggle dark mode menggunakan Tailwind
(function () {
    const tbtn = document.getElementById("darkModeToggle");
    const html = document.documentElement; // Target <html> untuk class "dark"

    function applyTheme(theme) {
        if (theme === "dark") {
            html.classList.add("dark");
            tbtn.textContent = "☀️ Light Mode";
        } else {
            html.classList.remove("dark");
            tbtn.textContent = "🌙 Dark Mode";
        }
        localStorage.setItem("theme", theme);
    }

    // Terapkan tema yang tersimpan saat halaman dimuat
    const saved = localStorage.getItem("theme") || "light";
    applyTheme(saved);

    // Event listener untuk toggle
    if (tbtn) {
        tbtn.addEventListener("click", () => {
            const currentTheme = html.classList.contains("dark") ? "dark" : "light";
            const nextTheme = currentTheme === "light" ? "dark" : "light";
            applyTheme(nextTheme);
        });
    }
})();