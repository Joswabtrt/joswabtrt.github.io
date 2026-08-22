// Полный список всех 13 привилегий с уменьшенными ценами за Рубли (RCON = 2500 ₽)
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
    { id: "13", name: "ADMIN (ZENITH)", price: 2990, desc: "Высшая привилегия из группы ЗЕНИТЫ" }
];

// Инициализация баланса в рублях (начинается с 0)
let balance = parseInt(localStorage.getItem('rub_balance')) || 0;

// Элементы интерфейса страницы
const el = document.getElementById('balance');
const rubProductsContainer = document.getElementById('rub-products');
const toast = document.getElementById('toast');

function fmt(n) { return n.toLocaleString('ru-RU'); }

// Обновление отображения баланса на сайте
function updateBalancesDisplay() {
    if (el) el.textContent = fmt(balance);
    localStorage.setItem('rub_balance', balance);
}

// Автоматическая генерация карточек всех привилегий в блок на сайте
function renderProducts() {
    const container = rubProductsContainer || 
                      document.getElementById('zenith-products') || 
                      document.querySelector('.products-grid');
                      
    if (!container) return;
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-id">${product.id}</div>
            <h3>${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="product-price">${fmt(product.price)} ₽</div>
            <button onclick="buy('${product.name}', ${product.price})">Купить через СБП</button>
        `;
        container.appendChild(card);
    });
}

// Логика кнопки «Купить»
window.buy = function(name, price) {
    if (balance >= price) {
        balance -= price;
        updateBalancesDisplay();
        show('Покупка ' + name + ' успешно оформлена!');
    } else {
        show('Недостаточно средств. Открываем оплату по СБП...');
        setTimeout(() => {
            openDepositModal(price);
        }, 800);
    }
};

// Управление модальным окном пополнения / прямой покупки через СБП
window.openDepositModal = function(autoAmount = "") {
    const modal = document.getElementById('deposit-modal');
    const amountInput = document.getElementById('deposit-amount');
    
    if (modal) modal.style.display = 'flex';
    if (amountInput && autoAmount) amountInput.value = autoAmount;
};

window.closeDepositModal = function() {
    const modal = document.getElementById('deposit-modal');
    if (modal) modal.style.display = 'none';
};

// Функция вывода всплывающих уведомлений (toast)
function show(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2600);
}

// Закрытие окна пополнения при клике по фону
window.onclick = function(event) {
    const modal = document.getElementById('deposit-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Запуск функций при загрузке страницы сайта
updateBalancesDisplay();
renderProducts();
