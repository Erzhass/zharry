// Elemen
const coffeeName = document.getElementById("coffeeName");
const quantity = document.getElementById("quantity");
const orderForm = document.getElementById("orderForm");
const clearAll = document.getElementById("clearAll");
const nextConfirm = document.getElementById("nextConfirm");
const orderList = document.getElementById("orderList");
const totalPrice = document.getElementById("totalPrice");

// Modal Popup
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const popupClose = document.getElementById("popupClose");

function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove("hidden");
}
popupClose.addEventListener("click", () => popup.classList.add("hidden"));

// Harga kopi
const prices = {
  Americano: 22000,
  Cappuccino: 25000,
  Latte: 27000,
  Espresso: 20000,
};

// Data pesanan
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Render tabel pesanan
function renderOrders() {
  orderList.innerHTML = "";
  let total = 0;

  orders.forEach((item) => {
    const subtotal = item.qty * item.price;
    total += subtotal;
    const row = document.createElement("tr");
    row.className = "hover:bg-purple-100 dark:hover:bg-gray-700 transition-all";
    row.innerHTML = `
      <td class="p-3">${item.name}</td>
      <td class="p-3">${item.qty}</td>
      <td class="p-3">Rp ${item.price.toLocaleString()}</td>
      <td class="p-3">Rp ${subtotal.toLocaleString()}</td>
    `;
    orderList.appendChild(row);
  });

  totalPrice.textContent = `Rp ${total.toLocaleString()}`;
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Tambah pesanan
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = coffeeName.value.trim();
  const qty = parseInt(quantity.value);

  if (!name || qty < 1) return showPopup("Masukkan data pesanan dengan benar!");

  const price = prices[name] || 0;
  const existing = orders.find((o) => o.name === name);

  if (existing) existing.qty += qty;
  else orders.push({ name, qty, price });

  renderOrders();
  showPopup("Pesanan berhasil ditambahkan!");
});

// Reset form
document.getElementById("resetForm").addEventListener("click", () => {
  orderForm.reset();
  showPopup("Form telah direset!");
});

// Hapus semua
clearAll.addEventListener("click", () => {
  if (orders.length === 0) return showPopup("Belum ada pesanan untuk dihapus!");
  orders = [];
  renderOrders();
  showPopup("Semua pesanan telah dihapus!");
});

// Lanjut ke konfirmasi
nextConfirm.addEventListener("click", () => {
  if (orders.length === 0) return showPopup("Belum ada pesanan!");
  window.location.href = "confirm.html";
});

// Tampilkan pesanan saat load
renderOrders();
