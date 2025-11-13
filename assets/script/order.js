// Data pesanan
let orders = JSON.parse(localStorage.getItem("orders")) || [];

const coffeeSelect = document.getElementById("coffeeSelect");
const quantityInput = document.getElementById("quantityInput");
const orderTable = document.getElementById("orderTable");
const totalPriceEl = document.getElementById("totalPrice");
const addOrderBtn = document.getElementById("addOrderBtn");
const toConfirmBtn = document.getElementById("toConfirmBtn");

function renderOrders() {
  orderTable.innerHTML = "";
  let total = 0;

  orders.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 px-3">${item.name}</td>
      <td class="py-2 px-3">${item.quantity}</td>
      <td class="py-2 px-3">Rp${item.price.toLocaleString()}</td>
      <td class="py-2 px-3">Rp${subtotal.toLocaleString()}</td>
      <td class="py-2 px-3">
        <button onclick="editOrder(${index})" class="text-blue-600 hover:underline">Edit</button> |
        <button onclick="deleteOrder(${index})" class="text-red-600 hover:underline">Hapus</button>
      </td>
    `;
    orderTable.appendChild(row);
  });

  totalPriceEl.textContent = `Rp${total.toLocaleString()}`;
}

addOrderBtn.addEventListener("click", () => {
  const selected = coffeeSelect.options[coffeeSelect.selectedIndex];
  const name = selected.value;
  const price = parseInt(selected.getAttribute("data-price"));
  const quantity = parseInt(quantityInput.value);

  if (quantity < 1) return alert("Jumlah minimal 1!");

  orders.push({ name, price, quantity });
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
});

function editOrder(index) {
  const newQty = prompt("Masukkan jumlah baru:", orders[index].quantity);
  if (newQty && newQty > 0) {
    orders[index].quantity = parseInt(newQty);
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
  }
}

function deleteOrder(index) {
  if (confirm("Hapus pesanan ini?")) {
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
  }
}

toConfirmBtn.addEventListener("click", () => {
  if (orders.length === 0) return alert("Tambahkan pesanan terlebih dahulu!");
  window.location.href = "confirm.html";
});

renderOrders();
