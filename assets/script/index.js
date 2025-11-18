// Fungsi untuk mendapatkan keranjang dari localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Fungsi untuk menyimpan keranjang ke localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Fungsi untuk update tampilan keranjang
function updateCartDisplay() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        count += item.quantity;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex justify-between items-center border-b pb-2';
        itemDiv.innerHTML = `
            <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-sm text-gray-500">Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <div>
                <p class="font-semibold">Rp ${subtotal.toLocaleString()}</p>
                <button class="text-red-500 hover:text-red-700" onclick="removeFromCart(${index})">Hapus</button>
            </div>
        `;
        cartItems.appendChild(itemDiv);
    });
    
    cartTotal.textContent = `Rp ${total.toLocaleString()}`;
    cartCount.textContent = count;
}

// Fungsi untuk menambah item ke keranjang
function addToCart(name, price) {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price: parseInt(price), quantity: 1 });
    }
    
    saveCart(cart);
    updateCartDisplay();
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCartDisplay();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    
    // Tombol tambah ke keranjang
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-coffee');
            const price = button.getAttribute('data-price');
            addToCart(name, price);
        });
    });
    
    // Toggle keranjang
    const toggleCart = document.getElementById('toggleCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    
    toggleCart.addEventListener('click', () => {
        cartSidebar.classList.toggle('translate-x-full');
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.add('translate-x-full');
    });
    
    // Hapus semua
    document.getElementById('clearCart').addEventListener('click', () => {
        saveCart([]);
        updateCartDisplay();
    });
    
    // Lanjut ke pemesanan
    document.getElementById('proceedToOrder').addEventListener('click', () => {
        window.location.href = 'order.html';
    });
});