(function () {
  const tbtn = document.getElementById("darkModeToggle");
  const body = document.body;

  function applyTheme(theme) {
    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
      tbtn.textContent = "☀️ Light Mode";
    } else {
      body.setAttribute("data-theme", "light");
      tbtn.textContent = "🌙 Dark Mode";
    }
    localStorage.setItem("theme", theme);
  }

  // 🔁 Saat reload, pakai tema terakhir dari localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  // 🖱️ Klik tombol untuk ganti tema
  tbtn.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
  });
})();
