const confirmTable = document.getElementById("confirmTable");
const confirmTotal = document.getElementById("confirmTotal");
const backBtn = document.getElementById("backBtn");
const confirmBtn = document.getElementById("confirmBtn");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function renderConfirm() {
  confirmTable.innerHTML = "";
  let total = 0;

  orders.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 px-3">${item.name}</td>
      <td class="py-2 px-3">${item.quantity}</td>
      <td class="py-2 px-3">Rp${subtotal.toLocaleString()}</td>
    `;
    confirmTable.appendChild(row);
  });

  confirmTotal.textContent = `Rp${total.toLocaleString()}`;
}

// Tombol kembali
backBtn.addEventListener("click", () => {
  window.location.href = "order.html";
});

// Tombol konfirmasi
confirmBtn.addEventListener("click", () => {
  alert("✅ Pesanan berhasil dikirim!");
  localStorage.removeItem("orders");
  window.location.href = "index.html";
});

renderConfirm();
