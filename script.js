const products = [
    { id: "01", easydonate_id: "11111", name: "WITHER", price: 20, img: "assets/dragon.jpg" },
    { id: "02", easydonate_id: "22222", name: "OVERLORD", price: 50, img: "assets/overlord.jpg" },
    { id: "03", easydonate_id: "33333", name: "GUARD", price: 100, img: "assets/helper.jpg" },
    { id: "04", easydonate_id: "44444", name: "D.ADMIN", price: 190, img: "assets/magister.jpg" },
    { id: "05", easydonate_id: "55555", name: "SERVER", price: 290, img: "assets/ninja.jpg" },
    { id: "06", easydonate_id: "66666", name: "STAFF", price: 450, img: "assets/god.jpg" },
    { id: "07", easydonate_id: "77777", name: "LUXURY", price: 690, img: "assets/imperator.jpg" },
    { id: "08", easydonate_id: "88888", name: "CUSTOM", price: 990, img: "assets/dragon.jpg" },
    { id: "09", easydonate_id: "99999", name: "ПРАВИТЕЛЬ", price: 1390, img: "assets/overlord.jpg" },
    { id: "10", easydonate_id: "10101", name: "ФАНТОМ", price: 1750, img: "assets/helper.jpg" },
    { id: "11", easydonate_id: "11121", name: "LITE OP", price: 1850, img: "assets/magister.jpg" },
    { id: "12", easydonate_id: "12121", name: "RCON", price: 1950, img: "assets/ninja.jpg" },
    { id: "13", easydonate_id: "13131", name: "ADMIN (ZENITH)", price: 1990, img: "assets/god.jpg" }
];

const EASYDONATE_SHOP_ID = "УКАЖИТЕ_ЗДЕСЬ_ВАШ_SHOP_ID"; 
let currentSelectedProduct = null;
const container = document.getElementById('rub-products');

function renderProducts() {
    if (!container) return;
    container.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(12,10,20,0.9) 100%), url('${p.img}')`;
        card.innerHTML = `
            <div class="price-badge">${p.price} ₽</div>
            <div class="card-footer">
                <h3 class="product-title">${p.name}</h3>
                <div class="cart-btn-wrapper" onclick="openDepositModal('${p.id}')">
                    <svg class="cart-icon-svg" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

window.openDepositModal = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    currentSelectedProduct = product;
    document.getElementById('selected-product-name').textContent = product.name;
    document.getElementById('modal-total-price').textContent = product.price;
    document.getElementById('deposit-modal').style.display = 'flex';
};

window.closeDepositModal = function() {
    document.getElementById('deposit-modal').style.display = 'none';
};

window.handlePaymentSubmit = function(event) {
    event.preventDefault();
    const nickname = document.getElementById('player-nickname').value.trim();
    const coupon = document.getElementById('promo-code').value.trim();
    if (!nickname) return;

    let paymentUrl = `https://easydonate.ru{EASYDONATE_SHOP_ID}&customer=${encodeURIComponent(nickname)}&payment_method=sbp`;
    paymentUrl += `&product_id=${currentSelectedProduct.easydonate_id}`;
    if (coupon) paymentUrl += `&coupon=${encodeURIComponent(coupon)}`;
    
    window.location.href = paymentUrl;
};

renderProducts();
