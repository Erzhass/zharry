     // index.js — toggler theme (persist ke localStorage)
        (function () {
          const tbtn = document.getElementById("toggleTheme");
          const root = document.documentElement;
          const body = document.body;
          function applyTheme(theme) {
            body.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
          }
          const saved = localStorage.getItem("theme") || "light";
          applyTheme(saved);
          if (tbtn) {
            tbtn.addEventListener("click", () => {
              const next =
                body.getAttribute("data-theme") === "light" ? "dark" : "light";
              applyTheme(next);
            });
          }
        })();