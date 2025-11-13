// Ambil elemen
const orderForm = document.getElementById("orderForm");
const orderList = document.getElementById("orderList");
const totalPriceEl = document.getElementById("totalPrice");
const clearAllBtn = document.getElementById("clearAll");
const resetFormBtn = document.getElementById("resetForm");
const nextConfirmBtn = document.getElementById("nextConfirm");
const toggleDark = document.getElementById("toggleDark");

// Ambil data dari localStorage (kalau ada)
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// 🌙 Toggle Dark Mode
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Tambah pesanan baru
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const coffeeSelect = document.getElementById("coffeeName");
  const coffeeName = coffeeSelect.value;
  const price = parseInt(coffeeSelect.selectedOptions[0].dataset.price);
  const qty = parseInt(document.getElementById("quantity").value);

  if (!qty || qty <= 0) {
    alert("Jumlah pesanan tidak boleh kosong!");
    return;
  }

  // Cek apakah sudah ada pesanan kopi tersebut
  const existing = orders.find((item) => item.name === coffeeName);
  if (existing) {
    existing.qty += qty;
  } else {
    orders.push({ name: coffeeName, qty, price });
  }

  // Simpan ke localStorage
  localStorage.setItem("orders", JSON.stringify(orders));

  // Animasi efek nambah
  document.body.classList.add("bg-green-50");
  setTimeout(() => document.body.classList.remove("bg-green-50"), 400);

  renderOrders();
  orderForm.reset();
});

// Render daftar pesanan ke tabel
function renderOrders() {
  orderList.innerHTML = "";
  let total = 0;

  if (orders.length === 0) {
    orderList.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-gray-400 py-4">Belum ada pesanan.</td>
      </tr>`;
    totalPriceEl.textContent = "Rp 0";
    return;
  }

  orders.forEach((item, index) => {
    const subtotal = item.qty * item.price;
    total += subtotal;

    orderList.innerHTML += `
      <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all">
        <td class="p-2">${item.name}</td>
        <td class="p-2">
          <input type="number" min="1" value="${
            item.qty
          }" class="w-16 p-1 border rounded text-center text-gray-800 dark:text-gray-100 bg-transparent" onchange="updateQty(${index}, this.value)">
        </td>
        <td class="p-2">Rp ${item.price.toLocaleString()}</td>
        <td class="p-2">Rp ${(item.qty * item.price).toLocaleString()}</td>
        <td class="p-2 text-center">
          <button onclick="deleteOrder(${index})" class="text-red-500 hover:text-red-700 transition-all">🗑️</button>
        </td>
      </tr>`;
  });

  totalPriceEl.textContent = `Rp ${total.toLocaleString()}`;
}

// Update jumlah pesanan
window.updateQty = function (index, newQty) {
  if (newQty <= 0) {
    alert("Jumlah harus minimal 1!");
    return;
  }
  orders[index].qty = parseInt(newQty);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
};

// Hapus pesanan tertentu
window.deleteOrder = function (index) {
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();

  // Animasi efek hapus
  document.body.classList.add("bg-red-50");
  setTimeout(() => document.body.classList.remove("bg-red-50"), 400);
};

// Hapus semua pesanan
clearAllBtn.addEventListener("click", () => {
  if (confirm("Yakin mau menghapus semua pesanan?")) {
    orders = [];
    localStorage.removeItem("orders");
    renderOrders();
  }
});

// Reset form input
resetFormBtn.addEventListener("click", () => {
  orderForm.reset();
});

// Lanjut ke halaman konfirmasi
nextConfirmBtn.addEventListener("click", () => {
  if (orders.length === 0) {
    alert("Belum ada pesanan yang ditambahkan!");
    return;
  }
  window.location.href = "confirm.html";
});

// Tampilkan data saat halaman dimuat
renderOrders();
