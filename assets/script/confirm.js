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

  // Set font dan styling untuk tampilan mewah
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 102, 51); // Warna hijau gelap untuk header

  // Header dengan nama kedai dan info
  doc.text("Kedai Kopi Mantap", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text("Jl. Kopi Enak No. 123, Jakarta", 105, 30, { align: "center" });
  doc.text("Tel: (021) 123-4567 | Email: info@kopimantap.com", 105, 35, {
    align: "center",
  });

  // Tambahkan tanggal dan waktu
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID");
  const timeStr = now.toLocaleTimeString("id-ID");
  doc.text(`Tanggal: ${dateStr} | Waktu: ${timeStr}`, 20, 45);

  // Garis pemisah header
  doc.setLineWidth(0.5);
  doc.line(20, 50, 190, 50);

  // Header tabel
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(0, 102, 51);
  doc.text("Item", 20, 60);
  doc.text("Qty", 100, 60);
  doc.text("Harga", 130, 60);
  doc.text("Subtotal", 160, 60);

  // Garis bawah header tabel
  doc.line(20, 65, 190, 65);

  // Daftar item
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  let y = 75;
  orders.forEach((item) => {
    const subtotal = item.qty * item.price;
    doc.text(item.name, 20, y);
    doc.text(item.qty.toString(), 100, y);
    doc.text(`Rp ${item.price.toLocaleString()}`, 130, y);
    doc.text(`Rp ${subtotal.toLocaleString()}`, 160, y);
    y += 10;
  });

  // Garis pemisah sebelum total
  doc.line(20, y, 190, y);
  y += 10;

  // Total
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0, 102, 51);
  doc.text(`Total: ${confirmTotal.textContent}`, 160, y, { align: "right" });

  // Footer dengan pesan mewah
  y += 20;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text("Terima kasih atas kunjungan Anda!", 105, y, { align: "center" });
  doc.text("Nikmati kopi terbaik di Kedai Kopi Mantap.", 105, y + 10, {
    align: "center",
  });
  doc.text(
    "Kunjungi kami lagi untuk pengalaman yang tak terlupakan.",
    105,
    y + 20,
    { align: "center" }
  );

  // Tambahkan elemen mewah: border halaman
  doc.setLineWidth(1);
  doc.rect(10, 10, 190, 277); // Border luar

  // Simpan PDF
  doc.save("struk-pesanan.pdf");

  // Hapus alert dan ganti dengan popup aesthetic
  localStorage.removeItem("orders");

  // Buat elemen overlay popup
  const popupOverlay = document.createElement("div");
  popupOverlay.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 opacity-0";

  // Buat konten popup
  const popupBox = document.createElement("div");
  popupBox.className = `
  bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center
  transform scale-95 transition-transform duration-300 w-80
`;

  // Tambahkan isi popup
  popupBox.innerHTML = `
  <h2 class="text-2xl font-bold text-green-600 mb-3">✅ Pesanan Berhasil!</h2>
  <p class="text-gray-600 dark:text-gray-300 mb-6">
    Terima kasih telah memesan di <b>Kedai Kopi Mantap</b> ☕<br>
    Struk pesanan Anda telah diunduh.
  </p>
  <button id="goHomeBtn" class="
    bg-green-600 hover:bg-green-700 text-white font-semibold
    px-5 py-2 rounded-full transition duration-300
  ">Kembali ke Beranda</button>
`;

  // Masukkan popup ke overlay
  popupOverlay.appendChild(popupBox);
  document.body.appendChild(popupOverlay);

  // Animasi muncul (fade-in & scale-up)
  setTimeout(() => {
    popupOverlay.classList.remove("opacity-0");
    popupBox.classList.remove("scale-95");
    popupBox.classList.add("scale-100");
  }, 50);

  // Tombol kembali ke index.html
  document.getElementById("goHomeBtn").addEventListener("click", () => {
    popupOverlay.classList.add("opacity-0");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 300);
  });
});
