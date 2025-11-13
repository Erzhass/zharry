let orders = JSON.parse(localStorage.getItem("orders")) || [];

const coffeeSelect = document.getElementById("coffeeSelect");
const quantityInput = document.getElementById("quantityInput");
const addOrderBtn = document.getElementById("addOrderBtn");
const orderTable = document.getElementById("orderTable");
const totalPriceEl = document.getElementById("totalPrice");
const toConfirmBtn = document.getElementById("toConfirmBtn");

function renderOrders() {
  orderTable.innerHTML = "";
  let total = 0;

  orders.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 px-3">${item.name}</td>
      <td class="py-2 px-3">${item.quantity}</td>
      <td class="py-2 px-3">Rp${item.price.toLocaleString()}</td>
      <td class="py-2 px-3">Rp${subtotal.toLocaleString()}</td>
    `;
    orderTable.appendChild(row);
  });

  totalPriceEl.textContent = `Rp${total.toLocaleString()}`;
}

// Tambah pesanan
addOrderBtn.addEventListener("click", () => {
  const selected = coffeeSelect.options[coffeeSelect.selectedIndex];
  const name = selected.value;
  const price = parseInt(selected.getAttribute("data-price"));
  const quantity = parseInt(quantityInput.value);

  if (quantity < 1) {
    alert("Jumlah minimal 1!");
    return;
  }

  // Tambahkan ke array
  orders.push({ name, price, quantity });
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
});

// Lanjut ke konfirmasi
toConfirmBtn.addEventListener("click", () => {
  if (orders.length === 0) {
    alert("Belum ada pesanan!");
    return;
  }
  window.location.href = "confirm.html";
});

renderOrders();
