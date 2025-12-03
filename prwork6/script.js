let cart = [];
let currentProductId = null;
window.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    updateCartCount();
    if (document.getElementById('cartContent')) {
        renderCart();
    }
});
function saveCartToStorage() {
    localStorage.setItem('toyCart', JSON.stringify(cart));
}
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('toyCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const uniqueItems = cart.length;
        cartCount.textContent = uniqueItems;
        
        if (uniqueItems === 0) {
            cartCount.classList.add('hidden');
        } else {
            cartCount.classList.remove('hidden');
        }
    }
}
function openCart() {
    if (cart.length === 0) {
        showModal('emptyCartModal');
    } else {
        window.location.href = 'cart.html';
    }
}
function showQuantityModal(productId) {
    currentProductId = productId;
    document.getElementById('quantityInput').value = 1;
    showModal('quantityModal');
}
function changeQuantity(delta) {
    const input = document.getElementById('quantityInput');
    let value = parseInt(input.value) || 1;
    value += delta;
    if (value < 1) value = 1;
    if (value > 99) value = 99;
    input.value = value;
}
function addToCart() {
    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;
    const productCard = document.querySelector(`[data-id="${currentProductId}"]`);
    if (!productCard) return;
    const product = {
        id: currentProductId,
        name: productCard.dataset.name,
        price: parseFloat(productCard.dataset.price),
        oldPrice: productCard.dataset.oldPrice ? parseFloat(productCard.dataset.oldPrice) : null,
        image: productCard.dataset.image,
        quantity: quantity
    };
    const existingProduct = cart.find(item => item.id === currentProductId);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push(product);
    }
    saveCartToStorage();
    updateCartCount();
    closeModal('quantityModal');
    showModal('addedModal');
}
function goToCart() {
    window.location.href = 'cart.html';
}
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});
function scrollProducts(direction) {
    console.log('Прокрутка товарів:', direction);
}
function renderCart() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Ваша корзина порожня</h2>
                <p>Додайте товари до корзини, щоб продовжити покупки</p>
                <a href="index.html" class="back-button">Перейти до каталогу</a>
            </div>
        `;
        return;
    }
    let cartHTML = '<div class="cart-items">';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='images/placeholder.jpg'">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} грн</div>
                    ${item.oldPrice ? `<div class="old-price">${item.oldPrice} грн</div>` : ''}
                </div>
                <div class="cart-item-quantity">
                    <button onclick="changeCartQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeCartQuantity(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">${itemTotal} грн</div>
                <button class="cart-item-remove" onclick="removeItem(${index})">Видалити</button>
            </div>
        `;
    });
    cartHTML += '</div>';
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartHTML += `
        <div class="cart-summary">
            <h2>Підсумок замовлення</h2>
            <div class="summary-row">
                <span>Кількість товарів:</span>
                <span>${totalItems} шт</span>
            </div>
            <div class="summary-row">
                <span>Загальна сума:</span>
                <span>${totalPrice} грн</span>
            </div>
            <button class="checkout-button" onclick="checkout()">Оформити замовлення</button>
        </div>
    `;
    cartContent.innerHTML = cartHTML;
}
function changeCartQuantity(index, delta) {
    if (cart[index]) {
        cart[index].quantity += delta;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCartToStorage();
        updateCartCount();
        renderCart();
    }
}
function removeItem(index) {
    if (confirm('Ви впевнені, що хочете видалити цей товар?')) {
        cart.splice(index, 1);
        saveCartToStorage();
        updateCartCount();
        renderCart();
    }
}
function checkout() {
    if (cart.length === 0) {
        alert('Ваша корзина порожня!');
        return;
    }
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderDetails = cart.map(item => 
        `${item.name} - ${item.quantity} шт × ${item.price} грн = ${item.quantity * item.price} грн`
    ).join('\n');
    alert(`Дякуємо за замовлення!\n\nДеталі замовлення:\n${orderDetails}\n\nЗагальна сума: ${totalPrice} грн\n\nМенеджер зв'яжеться з вами найближчим часом.`);
    cart = [];
    saveCartToStorage();
    updateCartCount();
    renderCart();
}