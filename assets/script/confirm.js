const confirmList = document.getElementById("confirmList");
const confirmTotal = document.getElementById("confirmTotal");
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Tampilkan pesanan
function renderConfirm() {
  confirmList.innerHTML = "";
  let total = 0;
  orders.forEach((item) => {
    const subtotal = item.qty * item.price;
    total += subtotal;
    confirmList.innerHTML += `
      <tr class="border-b border-gray-200 dark:border-gray-700">
        <td class="p-2">${item.name}</td>
        <td class="p-2">${item.qty}</td>
        <td class="p-2">Rp ${item.price.toLocaleString()}</td>
        <td class="p-2">Rp ${subtotal.toLocaleString()}</td>
      </tr>`;
  });
  confirmTotal.textContent = `Rp ${total.toLocaleString()}`;
}
renderConfirm();

// Konfirmasi dan buat PDF
document.getElementById("confirmOrder").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Struk Pesanan Kedai Kopi Mantap", 20, 20);
  let y = 40;
  orders.forEach((item) => {
    doc.text(
      `${item.name} (${item.qty}) - Rp ${(
        item.qty * item.price
      ).toLocaleString()}`,
      20,
      y
    );
    y += 10;
  });
  doc.text(confirmTotal.textContent, 20, y + 10);
  doc.save("struk-pesanan.pdf");

  alert("Pesanan berhasil dikonfirmasi!");
  localStorage.removeItem("orders");
  window.location.href = "index.html";
});
