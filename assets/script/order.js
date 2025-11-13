// order.js
(function () {
  // key localStorage
  const KEY = "kopi_orders_v1";
  let orders = JSON.parse(localStorage.getItem(KEY)) || [];

  // DOM
  const coffeeSelect = document.getElementById("coffeeSelect");
  const quantityInput = document.getElementById("quantityInput");
  const addBtn = document.getElementById("addBtn");
  const ordersTable = document.getElementById("ordersTable");
  const totalPriceEl = document.getElementById("totalPrice");
  const toConfirm = document.getElementById("toConfirm");
  const clearAll = document.getElementById("clearAll");
  const clearBtn = document.getElementById("clearBtn");

  // preselect from query ?coffee=
  (function preselect() {
    const params = new URLSearchParams(location.search);
    const coffee = params.get("coffee");
    if (coffee) {
      for (const opt of coffeeSelect.options) {
        if (opt.value === coffee) {
          opt.selected = true;
          break;
        }
      }
    }
  })();

  function save() {
    localStorage.setItem(KEY, JSON.stringify(orders));
  }

  function formatRupiah(num) {
    return "Rp" + Number(num).toLocaleString("id-ID");
  }

  function calcTotal() {
    return orders.reduce((acc, it) => acc + it.price * it.quantity, 0);
  }

  function render() {
    ordersTable.innerHTML = "";
    orders.forEach((it, idx) => {
      const subtotal = it.price * it.quantity;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="py-2 px-3">${it.name}</td>
        <td class="py-2 px-3">
          <input data-idx="${idx}" class="orders-qty-input" type="number" min="1" value="${
        it.quantity
      }">
        </td>
        <td class="py-2 px-3">${formatRupiah(it.price)}</td>
        <td class="py-2 px-3">${formatRupiah(subtotal)}</td>
        <td class="py-2 px-3">
          <button data-del="${idx}" class="text-red-600 hover:underline">Hapus</button>
        </td>
      `;
      ordersTable.appendChild(tr);
    });

    totalPriceEl.textContent = formatRupiah(calcTotal());

    // attach listeners to quantity inputs & delete
    document.querySelectorAll(".orders-qty-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const idx = parseInt(e.target.dataset.idx);
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1;
        orders[idx].quantity = val;
        save();
        render();
      });
    });

    document.querySelectorAll("[data-del]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-del"));
        if (confirm("Hapus item?")) {
          orders.splice(idx, 1);
          save();
          render();
        }
      });
    });
  }

  addBtn.addEventListener("click", () => {
    const opt = coffeeSelect.options[coffeeSelect.selectedIndex];
    const name = opt.value;
    const price = parseInt(opt.dataset.price || "0", 10);
    const qty = parseInt(quantityInput.value, 10);

    if (!name || price <= 0) {
      alert("Pilih kopi terlebih dahulu");
      return;
    }
    if (isNaN(qty) || qty < 1) {
      alert("Jumlah minimal 1");
      return;
    }

    // jika item sama, gabungkan jumlah
    const exists = orders.find((it) => it.name === name);
    if (exists) {
      exists.quantity += qty;
    } else {
      orders.push({ name, price, quantity: qty });
    }
    save();
    render();
  });

  toConfirm.addEventListener("click", () => {
    if (orders.length === 0) {
      alert("Belum ada pesanan.");
      return;
    }
    location.href = "confirm.html";
  });

  clearAll.addEventListener("click", () => {
    if (!orders.length) return;
    if (confirm("Hapus semua pesanan?")) {
      orders = [];
      save();
      render();
    }
  });

  clearBtn.addEventListener("click", () => {
    quantityInput.value = 1;
    coffeeSelect.selectedIndex = 0;
  });

  // init render
  render();

  // small theme toggles for order page (optional)
  const t = document.getElementById("toggleThemeSmall");
  if (t) {
    t.addEventListener("click", () => {
      const body = document.body;
      const next =
        body.getAttribute("data-theme") === "light" ? "dark" : "light";
      body.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }
})();
