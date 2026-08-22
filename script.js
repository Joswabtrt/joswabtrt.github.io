// Список товаров: теперь все за Рубли, цены идут строго по порядку (RCON = 4000 ₽)
const products = [
    { id: "01", name: "WITHER", type: "RUB", price: 50, desc: "Начальная донат-привилегия" },
    { id: "02", name: "OVERLORD", type: "RUB", price: 150, desc: "Продвинутая привилегия" },
    { id: "03", name: "GUARD", type: "RUB", price: 300, desc: "Защитник сервера" },
    { id: "04", name: "D.ADMIN", type: "RUB", price: 500, desc: "Донат Администратор" },
    { id: "05", name: "SERVER", type: "RUB", price: 750, desc: "Уникальный статус" },
    { id: "06", name: "STAFF", type: "RUB", price: 1000, desc: "Младший персонал" },
    { id: "07", name: "LUXURY", type: "RUB", price: 1400, desc: "Элитный статус" },
    { id: "08", name: "CUSTOM", type: "RUB", price: 1900, desc: "Кастомный префикс" },
    { id: "09", name: "ПРАВИТЕЛЬ", type: "RUB", price: 2500, desc: "Властитель игрового мира" },
    { id: "10", name: "ФАНТОМ", type: "RUB", price: 3100, desc: "Призрачный ранг" },
    { id: "11", name: "LITE OP", type: "RUB", price: 3500, desc: "Облегченная операторка" },
    { id: "12", name: "RCON", type: "RUB", price: 4000, desc: "Консольный доступ" },
    { id: "13", name: "ADMIN", type: "RUB", price: 4500, desc: "Полный администратор" }
];

// Инициализация балансов
let balance = 5000; // Баланс в Рублях для покупки на сайте
let zenithBalance = parseInt(localStorage.getItem('zenith_balance')) || 10000; // Отдельная валюта сервера (PlayerPoints)

const el = document.getElementById('balance'); // Элемент баланса рублей на сайте
const zenithBalanceEl = document.getElementById('zenith-balance'); // Элемент баланса PlayerPoints
const rubProductsContainer = document.getElementById('rub-products');
const toast = document.getElementById('toast');

function fmt(n) { return n.toLocaleString('ru-RU'); }

// Функция обновления отображения балансов
function updateBalancesDisplay() {
    if (el) el.textContent = fmt(balance);
    if (zenithBalanceEl) zenithBalanceEl.textContent = fmt(zenithBalance);
    localStorage.setItem('rub_balance', balance);
    localStorage.setItem('zenith_balance', zenithBalance);
}

// Генерация карточек товаров за рубли
function renderProducts() {
    if (!rubProductsContainer) return;
    rubProductsContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-id">${product.id}</div>
            <h3>${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="product-price">${fmt(product.price)} ₽</div>
            <button onclick="buy('${product.name}', ${product.price})">Купить</button>
        `;
        rubProductsContainer.appendChild(card);
    });
}

// Логика покупки за рубли через вашу систему уведомлений (toast)
window.buy = function(name, price) {
    if (balance < price) {
        show('Недостаточно средств для покупки ' + name);
        return;
    }
    balance -= price;
    updateBalancesDisplay();
    show('Покупка ' + name + ' успешно оформлена!');
};

function show(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2600);
}

// Загрузка сохраненного баланса рублей
const savedRub = localStorage.getItem('rub_balance');
if (savedRub !== null) {
    balance = Number(savedRub);
}

// Запуск скрипта
updateBalancesDisplay();
renderProducts();
