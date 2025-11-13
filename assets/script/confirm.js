// confirm.js
(async function () {
  const KEY = "kopi_orders_v1";
  let orders = JSON.parse(localStorage.getItem(KEY)) || [];

  const confirmBody = document.getElementById("confirmBody");
  const confirmTotal = document.getElementById("confirmTotal");
  const backToEdit = document.getElementById("backToEdit");
  const confirmOrder = document.getElementById("confirmOrder");

  function formatRupiah(num) {
    return "Rp" + Number(num).toLocaleString("id-ID");
  }

  function render() {
    confirmBody.innerHTML = "";
    let total = 0;
    orders.forEach((it) => {
      const subtotal = it.price * it.quantity;
      total += subtotal;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="py-2 px-3">${it.name}</td>
        <td class="py-2 px-3">${it.quantity}</td>
        <td class="py-2 px-3">${formatRupiah(it.price)}</td>
        <td class="py-2 px-3">${formatRupiah(subtotal)}</td>
      `;
      confirmBody.appendChild(tr);
    });
    confirmTotal.textContent = formatRupiah(total);
  }

  backToEdit.addEventListener("click", () => (location.href = "order.html"));

  confirmOrder.addEventListener("click", async () => {
    if (!orders.length) {
      alert("Tidak ada pesanan");
      return;
    }

    // buat invoice (PDF) memakai jsPDF
    // menggunakan jspdf.umd
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("KopiKita - Invoice", 14, 20);
    doc.setFontSize(11);
    doc.text(`Tanggal: ${new Date().toLocaleString("id-ID")}`, 14, 28);

    let startY = 38;
    doc.setFontSize(12);
    doc.text("No", 14, startY);
    doc.text("Nama Kopi", 28, startY);
    doc.text("Qty", 110, startY);
    doc.text("Subtotal", 140, startY);

    startY += 6;
    let total = 0;
    orders.forEach((it, idx) => {
      const subtotal = it.price * it.quantity;
      total += subtotal;
      doc.text(String(idx + 1), 14, startY);
      doc.text(it.name, 28, startY);
      doc.text(String(it.quantity), 110, startY);
      doc.text(String(formatRupiah(subtotal)), 140, startY);
      startY += 7;
      if (startY > 270) {
        doc.addPage();
        startY = 20;
      }
    });

    doc.setFontSize(13);
    doc.text(`Total: ${formatRupiah(total)}`, 14, startY + 8);

    // simpan pdf
    doc.save(`invoice-${Date.now()}.pdf`);

    // hapus data dan beri notifikasi
    localStorage.removeItem(KEY);
    alert("✅ Pesanan berhasil dikirim!");
    location.href = "index.html";
  });

  // initial render
  render();

  // theme toggle small
  const tbtn = document.getElementById("toggleThemeConfirm");
  if (tbtn) {
    tbtn.addEventListener("click", () => {
      const body = document.body;
      const next =
        body.getAttribute("data-theme") === "light" ? "dark" : "light";
      body.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }
})();
