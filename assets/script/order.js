// Ambil data dari localStorage
let orders = JSON.parse(localStorage.getItem("orders")) || [];
const orderForm = document.getElementById("orderForm");
const orderList = document.getElementById("orderList");
const totalPriceEl = document.getElementById("totalPrice");

// Menambahkan pesanan baru
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const coffeeSelect = document.getElementById("coffeeName");
  const coffeeName = coffeeSelect.value;
  const price = parseInt(coffeeSelect.selectedOptions[0].dataset.price);
  const qty = parseInt(document.getElementById("quantity").value);

  const existing = orders.find((item) => item.name === coffeeName);
  if (existing) {
    existing.qty += qty;
  } else {
    orders.push({ name: coffeeName, qty, price });
  }
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
});

// Render daftar pesanan
function renderOrders() {
  orderList.innerHTML = "";
  let total = 0;
  orders.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    orderList.innerHTML += `
      <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all">
        <td class="p-2">${item.name}</td>
        <td class="p-2">
          <input type="number" min="1" value="${
            item.qty
          }" class="w-16 p-1 border rounded text-center" onchange="updateQty(${index}, this.value)">
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

// Update jumlah
function updateQty(index, newQty) {
  orders[index].qty = parseInt(newQty);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

// Hapus satu pesanan
function deleteOrder(index) {
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

// Hapus semua
document.getElementById("clearAll").addEventListener("click", () => {
  orders = [];
  localStorage.removeItem("orders");
  renderOrders();
});

// Lanjut ke konfirmasi
document.getElementById("nextConfirm").addEventListener("click", () => {
  if (orders.length === 0) {
    alert("Pesanan masih kosong!");
    return;
  }
  window.location.href = "confirm.html";
});

renderOrders();
