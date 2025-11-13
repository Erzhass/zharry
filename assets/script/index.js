        (function () {
            const tbtn = document.getElementById("darkModeToggle"); // Diubah agar cocok dengan id di HTML
            const body = document.body;
            function applyTheme(theme) {
                if (theme === "dark") {
                    body.classList.add("dark");
                    body.setAttribute("data-theme", "dark");
                    tbtn.textContent = "☀️ Light Mode";
                } else {
                    body.classList.remove("dark");
                    body.setAttribute("data-theme", "light");
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
                    const currentTheme = body.getAttribute("data-theme");
                    const nextTheme = currentTheme === "light" ? "dark" : "light";
                    applyTheme(nextTheme);
                });
            }
        })();