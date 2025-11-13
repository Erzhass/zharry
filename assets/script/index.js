
// index.js — toggler theme (persist ke localStorage)
(function () {
  const tbtn = document.getElementById("toggleTheme");
  const root = document.documentElement;
  const body = document.body;
  
  function applyTheme(theme) {
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }
  
  // Ambil tema yang disimpan atau default ke "light"
  const saved = localStorage.getItem("theme") || "light";
  applyTheme(saved);

  if (tbtn) {
    tbtn.addEventListener("click", () => {
      // Toggle: jika saat ini "light", ubah ke "dark"; jika "dark", ubah ke "light"
      const currentTheme = body.getAttribute("data-theme");
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      applyTheme(nextTheme);
    });
  }
})();