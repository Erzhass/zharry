// Fungsi untuk mendapatkan keranjang dari localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Fungsi untuk menyimpan keranjang ke localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Fungsi untuk update tabel pesanan
function updateOrderTable() {
    const cart = getCart();
    const orderList = document.getElementById('orderList');
    const totalPrice = document.getElementById('totalPrice');
    
    orderList.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-2">${item.name}</td>
            <td class="p-2">${item.quantity}</td>
            <td class="p-2">Rp ${item.price.toLocaleString()}</td>
            <td class="p-2">Rp ${subtotal.toLocaleString()}</td>
            <td class="p-2 text-center">
                <button class="text-red-500 hover:text-red-700" onclick="removeFromOrder(${index})">Hapus</button>
            </td>
        `;
        orderList.appendChild(row);
    });
    
    totalPrice.textContent = `Rp ${total.toLocaleString()}`;
}

// Fungsi untuk menghapus item dari pesanan
function removeFromOrder(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateOrderTable();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateOrderTable();
    
    // Form tambah pesanan
    document.getElementById('orderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const coffeeName = document.getElementById('coffeeName').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const price = parseInt(document.getElementById('coffeeName').selectedOptions[0].getAttribute('data-price'));
        
        const cart = getCart();
        const existingItem = cart.find(item => item.name === coffeeName);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name: coffeeName, price, quantity });
        }
        
        saveCart(cart);
        updateOrderTable();
        document.getElementById('orderForm').reset();
    });
    
    // Reset form
    document.getElementById('resetForm').addEventListener('click', () => {
        document.getElementById('orderForm').reset();
    });
    
    // Hapus semua
    document.getElementById('clearAll').addEventListener('click', () => {
        saveCart([]);
        updateOrderTable();
    });
    
    // Lanjut ke konfirmasi (placeholder)
    document.getElementById('nextConfirm').addEventListener('click', () => {
        alert('Lanjut ke konfirmasi - implementasi selanjutnya');
    });
});