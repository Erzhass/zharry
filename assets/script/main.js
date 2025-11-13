// script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const detailsBox = document.getElementById("details");
  const coffeeSelect = document.getElementById("coffeeSelect");

  // Jika form ditemukan → berarti di order.html
  if (form) {
    // Prefill kopi dari query ?coffee=
    const params = new URLSearchParams(window.location.search);
    const coffeeParam = params.get("coffee");
    if (coffeeParam && coffeeSelect) {
      coffeeSelect.value = decodeURIComponent(coffeeParam);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("customerName").value.trim();
      const coffee = coffeeSelect.value;
      const qty = parseInt(document.getElementById("quantity").value);

      if (!name || !coffee || qty < 1) {
        alert("Mohon isi semua data dengan benar.");
        return;
      }

      const order = {
        name,
        coffee,
        quantity: qty,
        time: new Date().toLocaleString("id-ID", {
          dateStyle: "long",
          timeStyle: "short",
        }),
      };

      // Simpan ke localStorage
      localStorage.setItem("coffeeOrder", JSON.stringify(order));

      // Arahkan ke halaman konfirmasi
      window.location.href = "confirm.html";
    });
  }

  // Jika detailsBox ditemukan → berarti di confirm.html
  if (detailsBox) {
    const order = JSON.parse(localStorage.getItem("coffeeOrder"));
    if (order) {
      detailsBox.innerHTML = `
        <p><strong>Nama:</strong> ${order.name}</p>
        <p><strong>Kopi:</strong> ${order.coffee}</p>
        <p><strong>Jumlah:</strong> ${order.quantity}</p>
        <p><strong>Waktu:</strong> ${order.time}</p>
      `;
    } else {
      detailsBox.innerHTML = `<p class="text-red-500">Tidak ada pesanan ditemukan. Silakan lakukan pemesanan terlebih dahulu.</p>`;
    }
  }
});
