// Ambil elemen penting
const coffeeName = document.getElementById("coffeeName");
const qty = document.getElementById("qty");
const addOrder = document.getElementById("addOrder");
const clearAll = document.getElementById("clearAll");
const goConfirm = document.getElementById("goConfirm");
const orderList = document.getElementById("orderList");
const totalPrice = document.getElementById("totalPrice");

// Ambil nama kopi dari URL (misal: ?coffee=Americano)
const params = new URLSearchParams(window.location.search);
const coffee = params.get("coffee");
if (coffee) coffeeName.value = coffee;

// Daftar harga kopi (bisa kamu ganti sesuai menu)
const prices = {
  Americano: 15000,
  Cappuccino: 20000,
  Latte: 18000,
  Mocha: 22000,
  Espresso: 17000,
};

// Ambil data dari localStorage
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Render tabel pesanan
function renderOrders() {
  orderList.innerHTML = "";
  let total = 0;

  orders.forEach((item, index) => {
    const subtotal = item.qty * item.price;
    total += subtotal;

    // Tambahkan animasi fade in
    const row = document.createElement("tr");
    row.className =
      "transition-all duration-300 hover:bg-purple-100 dark:hover:bg-gray-700";
    row.style.opacity = 0;
    row.innerHTML = `
      <td class="p-3">${item.name}</td>
      <td class="p-3">${item.qty}</td>
      <td class="p-3">Rp ${item.price.toLocaleString()}</td>
      <td class="p-3">Rp ${subtotal.toLocaleString()}</td>
    `;
    orderList.appendChild(row);

    // Animasi muncul
    setTimeout(() => {
      row.style.opacity = 1;
    }, 100);
  });

  totalPrice.textContent = `Rp ${total.toLocaleString()}`;
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Tambah ke pesanan
addOrder.addEventListener("click", () => {
  const name = coffeeName.value.trim();
  const jumlah = parseInt(qty.value);
  if (!name || jumlah < 1) return alert("Masukkan data pesanan dengan benar!");

  const price = prices[name] || 0;

  // Jika kopi sudah ada, update jumlah
  const existing = orders.find((o) => o.name === name);
  if (existing) {
    existing.qty += jumlah;
  } else {
    orders.push({ name, qty: jumlah, price });
  }

  renderOrders();
});

// Hapus semua pesanan
clearAll.addEventListener("click", () => {
  orders = [];
  renderOrders();
});

// Lanjut ke konfirmasi
goConfirm.addEventListener("click", () => {
  if (orders.length === 0) return alert("Belum ada pesanan!");
  window.location.href = "confirm.html";
});

// Jalankan saat halaman dimuat
renderOrders();
