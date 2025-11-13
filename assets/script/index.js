(function () {
  const btn = document.getElementById("darkModeToggle");
  const body = document.body;

  function applyTheme(theme) {
    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
      body.classList.add("dark"); // untuk Tailwind
      btn.textContent = "☀️ Light Mode";
    } else {
      body.setAttribute("data-theme", "light");
      body.classList.remove("dark");
      btn.textContent = "🌙 Dark Mode";
    }
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  btn.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
  });
})();
