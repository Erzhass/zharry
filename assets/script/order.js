// Ambil elemen penting dengan validasi
const orderForm = document.getElementById("orderForm");
const orderList = document.getElementById("orderList");
const totalPriceEl = document.getElementById("totalPrice");
const clearAllBtn = document.getElementById("clearAll");
const resetFormBtn = document.getElementById("resetForm");
const nextConfirmBtn = document.getElementById("nextConfirm");
const cartPreviewEl = document.getElementById("cartPreview");
const previewQtyEl = document.getElementById("previewQty");
const previewTotalEl = document.getElementById("previewTotal");

// Fungsi untuk mengambil data dari localStorage dengan error handling
function getOrdersFromStorage() {
  try {
    const stored = localStorage.getItem("orders");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return [];
  }
}

// Fungsi untuk menyimpan data ke localStorage dengan error handling
function saveOrdersToStorage(orders) {
  try {
    localStorage.setItem("orders", JSON.stringify(orders));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Ambil data dari localStorage (kalau ada)
let orders = getOrdersFromStorage();

// Tambah pesanan baru
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const coffeeSelect = document.getElementById("coffeeName");
    const coffeeName = coffeeSelect ? coffeeSelect.value : "";
    const price = coffeeSelect ? parseInt(coffeeSelect.selectedOptions[0].dataset.price) : 0;
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
    saveOrdersToStorage(orders);

    // Animasi efek nambah
    document.body.classList.add("bg-green-50");
    setTimeout(() => document.body.classList.remove("bg-green-50"), 400);

    renderOrders();
    orderForm.reset();
  });
}

// Render daftar pesanan ke tabel
function renderOrders() {
  if (!orderList || !totalPriceEl) return; // Validasi elemen

  orderList.innerHTML = "";
  let total = 0;
  let totalQty = 0;

  if (orders.length === 0) {
    orderList.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-gray-400 py-4">Belum ada pesanan.</td>
      </tr>
    `;
    totalPriceEl.textContent = "Rp 0";
    if (cartPreviewEl) cartPreviewEl.classList.add("hidden");
    return;
  }

  if (cartPreviewEl) cartPreviewEl.classList.remove("hidden");
  orders.forEach((item, index) => {
    const subtotal = item.qty * item.price;
    total += subtotal;
    totalQty += item.qty;

    orderList.innerHTML += `
      <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all">
        <td class="p-2">${item.name}</td>
        <td class="p-2">
          <input type="number" min="1" value="${item.qty}"
            class="w-16 p-1 border rounded text-center text-gray-800 dark:text-gray-100 bg-transparent"
            onchange="updateQty(${index}, this.value)">
        </td>
        <td class="p-2">Rp ${item.price.toLocaleString()}</td>
        <td class="p-2">Rp ${subtotal.toLocaleString()}</td>
        <td class="p-2 text-center">
          <button onclick="deleteOrder(${index})"
            class="text-red-500 hover:text-red-700 transition-all">🗑️</button>
        </td>
      </tr>
    `;
  });

  totalPriceEl.textContent = `Rp ${total.toLocaleString()}`;
  if (previewQtyEl) previewQtyEl.textContent = totalQty;
  if (previewTotalEl) previewTotalEl.textContent = `Rp ${total.toLocaleString()}`;
}

// Update jumlah pesanan
window.updateQty = function (index, newQty) {
  if (newQty <= 0) {
    alert("Jumlah harus minimal 1!");
    return;
  }
  orders[index].qty = parseInt(newQty);
  saveOrdersToStorage(orders);
  renderOrders();
};

// Hapus pesanan tertentu
window.deleteOrder = function (index) {
  orders.splice(index, 1);
  saveOrdersToStorage(orders);
  renderOrders();

  // Animasi efek hapus
  document.body.classList.add("bg-red-50");
  setTimeout(() => document.body.classList.remove("bg-red-50"), 400);
};

// Hapus semua pesanan
if (clearAllBtn) {
  clearAllBtn.addEventListener("click", () => {
    if (confirm("Yakin mau menghapus semua pesanan?")) {
      orders = [];
      saveOrdersToStorage(orders);
      renderOrders();
    }
  });
}

// Reset form input
if (resetFormBtn) {
  resetFormBtn.addEventListener("click", () => {
    if (orderForm) orderForm.reset();
  });
}

// Lanjut ke halaman konfirmasi
if (nextConfirmBtn) {
  nextConfirmBtn.addEventListener("click", () => {
    if (orders.length === 0) {
      alert("Belum ada pesanan yang ditambahkan!");
      return;
    }
    window.location.href = "confirm.html";
  });
}

// Tampilkan data saat halaman dimuat
renderOrders();