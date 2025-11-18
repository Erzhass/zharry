// Fungsi untuk toggle dark mode
const toggleDarkMode = () => {
  const body = document.body;
  const isDark = body.classList.contains('dark');
  if (isDark) {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

// Fungsi untuk set theme berdasarkan localStorage
const setTheme = () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
};

// Variabel global untuk orders (dari localStorage)
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Fungsi tambah ke keranjang
function addToCart(name, price) {
  const existing = orders.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    orders.push({ name, qty: 1, price });
  }
  localStorage.setItem("orders", JSON.stringify(orders));
  renderCart();
  // Animasi feedback
  document.body.classList.add("bg-green-50");
  setTimeout(() => document.body.classList.remove("bg-green-50"), 400);
}

// Render keranjang
function renderCart() {
  const cartEl = document.getElementById("cart");
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  cartItemsEl.innerHTML = "";
  let total = 0;

  if (orders.length === 0) {
    cartEl.classList.add("hidden");
    return;
  }

  cartEl.classList.remove("hidden");
  orders.forEach((item, index) => {
    const subtotal = item.qty * item.price;
    total += subtotal;
    cartItemsEl.innerHTML += `
      <div class="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-700">
        <span>${item.name} (x${item.qty})</span>
        <span>Rp ${subtotal.toLocaleString()}</span>
        <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">✕</button>
      </div>
    `;
  });
  cartTotalEl.textContent = `Rp ${total.toLocaleString()}`;
}

// Hapus item dari keranjang
function removeFromCart(index) {
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderCart();
}

// Checkout ke order.html
function checkout() {
  if (orders.length === 0) {
    alert("Keranjang kosong!");
    return;
  }
  window.location.href = "order.html";
}

// Event listener saat DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  setTheme();
  renderCart();  // Render keranjang saat halaman dimuat
  // Jika ada tombol toggle dark mode, tambahkan di sini
  // const toggleButton = document.getElementById('toggleDarkMode');
  // if (toggleButton) {
  //   toggleButton.addEventListener('click', toggleDarkMode);
  // }
});