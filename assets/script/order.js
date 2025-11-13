// Ambil elemen penting
const orderForm = document.getElementById("orderForm");
const orderList = document.getElementById("orderList");
const totalPriceEl = document.getElementById("totalPrice");
const clearAllBtn = document.getElementById("clearAll");
const resetFormBtn = document.getElementById("resetForm");
const nextConfirmBtn = document.getElementById("nextConfirm");

// Elemen modal
const customModal = document.getElementById("customModal");
const modalMessage = document.getElementById("modalMessage");
const modalButtons = document.getElementById("modalButtons");

// Ambil data dari localStorage (kalau ada)
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Fungsi untuk menampilkan modal kustom
function showModal(message, isConfirm = false, onConfirm = null) {
  modalMessage.innerHTML = message; // Gunakan innerHTML untuk mendukung ikon
  modalButtons.innerHTML = "";

  if (isConfirm) {
    // Tombol untuk konfirmasi (Ya/Tidak)
    modalButtons.innerHTML = `
      <button id="modalYes" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all font-semibold">Ya</button>
      <button id="modalNo" class="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all font-semibold">Tidak</button>
    `;
    document.getElementById("modalYes").addEventListener("click", () => {
      if (onConfirm) onConfirm();
      closeModal();
    });
    document.getElementById("modalNo").addEventListener("click", closeModal);
  } else {
    // Tombol OK untuk pesan error
    modalButtons.innerHTML = `
      <button id="modalOk" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all font-semibold">OK</button>
    `;
    document.getElementById("modalOk").addEventListener("click", closeModal);
  }

  // Tampilkan modal dengan animasi
  customModal.classList.remove("hidden");
  setTimeout(() => {
    customModal.classList.add("opacity-100");
    customModal.querySelector("div").classList.remove("scale-95");
  }, 10);
}

// Fungsi untuk menutup modal
function closeModal() {
  customModal.classList.add("opacity-0");
  customModal.querySelector("div").classList.add("scale-95");
  setTimeout(() => {
    customModal.classList.add("hidden");
    customModal.classList.remove("opacity-100");
  }, 300);
}

// Tambah pesanan baru
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const coffeeSelect = document.getElementById("coffeeName");
  const coffeeName = coffeeSelect.value;
  const price = parseInt(coffeeSelect.selectedOptions[0].dataset.price);
  const qty = parseInt(document.getElementById("quantity").value);

  if (!qty || qty <= 0) {
    showModal("Jumlah pesanan tidak boleh kosong! <span class='text-red-500 text-2xl'>❗</span>", false);
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
      </tr>
    `;
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
}

// Update jumlah pesanan
window.updateQty = function (index, newQty) {
  if (newQty <= 0) {
    showModal("Jumlah pesanan tidak boleh kosong! <span class='text-red-500 text-2xl'>❗</span>", false);
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
  showModal("Yakin mau menghapus semua pesanan? <span class='text-yellow-500 text-2xl'>❓</span>", true, () => {
    orders = [];
    localStorage.removeItem("orders");
    renderOrders();
  });
});

// Reset form input
resetFormBtn.addEventListener("click", () => {
  orderForm.reset();
});

// Lanjut ke halaman konfirmasi
nextConfirmBtn.addEventListener("click", () => {
  if (orders.length === 0) {
    showModal("Belum ada pesanan yang ditambahkan! <span class='text-red-500 text-2xl'>❗</span>", false);
    return;
  }
  window.location.href = "confirm.html";
});

// Tampilkan data saat halaman dimuat
renderOrders();