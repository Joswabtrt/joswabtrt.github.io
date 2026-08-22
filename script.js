const products = [
    { id: "01", name: "WITHER", price: 20, desc: "Начальная донат-привилегия" },
    { id: "02", name: "OVERLORD", price: 50, desc: "Продвинутая привилегия" },
    { id: "03", name: "GUARD", price: 100, desc: "Защитник сервера" },
    { id: "04", name: "D.ADMIN", price: 190, desc: "Донат Администратор" },
    { id: "05", name: "SERVER", price: 290, desc: "Уникальный статус" },
    { id: "06", name: "STAFF", price: 450, desc: "Младший персонал" },
    { id: "07", name: "LUXURY", price: 690, desc: "Элитный статус" },
    { id: "08", name: "CUSTOM", price: 990, desc: "Кастомный префикс" },
    { id: "09", name: "ПРАВИТЕЛЬ", price: 1390, desc: "Властитель игрового мира" },
    { id: "10", name: "ФАНТОМ", price: 1750, desc: "Призрачный ранг" },
    { id: "11", name: "LITE OP", price: 2100, desc: "Облегченная операторка" },
    { id: "12", name: "RCON", price: 2500, desc: "Консольный доступ" },
    { id: "13", name: "ADMIN (ZENITH)", price: 2990, desc: "Высшая группа ЗЕНИТЫ" }
];

let balance = parseInt(localStorage.getItem('rub_balance')) || 0;
let currentSelectedProduct = null;

const el = document.getElementById('balance');
const rubProductsContainer = document.getElementById('rub-products');
const toast = document.getElementById('toast');

function fmt(n) { return n.toLocaleString('ru-RU'); }

function updateBalancesDisplay() {
    if (el) el.textContent = fmt(balance);
    localStorage.setItem('rub_balance', balance);
}

function renderProducts() {
    if (!rubProductsContainer) return;
    rubProductsContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-glow"></div>
            <div class="product-id">#${product.id}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="price-tag">${fmt(product.price)} <span>₽</span></div>
            <button class="buy-button" onclick="openDepositModal('${product.id}')">Купить</button>
        `;
        rubProductsContainer.appendChild(card);
    });
}

// Открытие EasyDonate-модалки с передачей параметров товара
window.openDepositModal = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentSelectedProduct = product;

    document.getElementById('selected-product-name').textContent = product.name;
    document.getElementById('modal-total-price').textContent = fmt(product.price);
    
    const modal = document.getElementById('deposit-modal');
    if (modal) modal.style.display = 'flex';
};

window.closeDepositModal = function() {
    const modal = document.getElementById('deposit-modal');
    if (modal) modal.style.display = 'none';
};

// Обработка клика по кнопке "Оплатить" в стиле платёжки
window.handlePaymentSubmit = function(event) {
    event.preventDefault();
    const nickname = document.getElementById('player-nickname').value.trim();
    const method = document.querySelector('input[name="pay_method"]:checked').value;

    if (!nickname) {
        show('Пожалуйста, введите ваш никнейм!');
        return;
    }

    if (method === 'sbp') {
        show(`Перенаправляем к оплате по СБП для игрока ${nickname}...`);
    } else {
        show(`Открываем шлюз банковских карт для игрока ${nickname}...`);
    }

    // Имитация успешной транзакции (через 2 секунды)
    setTimeout(() => {
        closeDepositModal();
        show(`Привилегия ${currentSelectedProduct.name} успешно отправлена на ник ${nickname}!`);
    }, 2000);
};

function show(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
}

// Переключение визуального стиля карточек методов оплаты при клике
document.addEventListener('change', (e) => {
    if (e.target.name === 'pay_method') {
        document.querySelectorAll('.method-card').forEach(card => card.classList.remove('active'));
        e.target.closest('.method-card').classList.add('active');
    }
});

window.onclick = function(event) {
    const modal = document.getElementById('deposit-modal');
    if (event.target === modal) modal.style.display = 'none';
};

updateBalancesDisplay();
renderProducts();
