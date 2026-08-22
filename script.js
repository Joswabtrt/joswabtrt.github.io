// Список товаров с разделением по типу валюты (RUB или ZENITH)
const products = [
    // Товары за РУБЛИ (Реальный донат)
    { id: "01", name: "WITHER", type: "RUB", price: 49, desc: "Начальная донат-привилегия" },
    { id: "02", name: "OVERLORD", type: "RUB", price: 99, desc: "Продвинутая привилегия" },
    { id: "03", name: "GUARD", type: "RUB", price: 149, desc: "Защитник сервера" },
    { id: "04", name: "D.ADMIN", type: "RUB", price: 249, desc: "Донат Администратор" },
    { id: "05", name: "SERVER", type: "RUB", price: 399, desc: "Уникальный статус" },
    { id: "06", name: "STAFF", type: "RUB", price: 549, desc: "Младший персонал" },
    { id: "07", name: "LUXURY", type: "RUB", price: 699, desc: "Элитный статус" },
    
    // Товары за ВАЛЮТУ ZENITH (Игровой магазин)
    { id: "08", name: "CUSTOM", type: "ZENITH", price: 4000, desc: "Кастомный префикс" },
    { id: "09", name: "ПРАВИТЕЛЬ", type: "ZENITH", price: 5000, desc: "Властитель игрового мира" },
    { id: "10", name: "ФАНТОМ", type: "ZENITH", price: 6000, desc: "Призрачный ранг" },
    { id: "11", name: "LITE OP", type: "ZENITH", price: 7500, desc: "Облегченная операторка" },
    { id: "12", name: "RCON", type: "ZENITH", price: 9000, desc: "Консольный доступ" },
    { id: "13", name: "ADMIN", type: "ZENITH", price: 12000, desc: "Полный администратор" }
];

// Инициализация балансов из localStorage или выдача дефолтных значений
let zenithBalance = parseInt(localStorage.getItem('zenith_balance')) || 10000;
let rubBalance = parseInt(localStorage.getItem('rub_balance')) || 500;

const zenithBalanceEl = document.getElementById('zenith-balance');
const rubBalanceEl = document.getElementById('rub-balance');
const rubProductsContainer = document.getElementById('rub-products');
const zenithProductsContainer = document.getElementById('zenith-products');

// Функция обновления интерфейса балансов
function updateBalancesDisplay() {
    zenithBalanceEl.textContent = zenithBalance.toLocaleString();
    rubBalanceEl.textContent = rubBalance.toLocaleString();
    localStorage.setItem('zenith_balance', zenithBalance);
    localStorage.setItem('rub_balance', rubBalance);
}

// Генерация карточек товаров
function renderProducts() {
    rubProductsContainer.innerHTML = '';
    zenithProductsContainer.innerHTML = '';

    products.forEach(product => {
        const currencySign = product.type === "RUB" ? "₽" : "ZENITH";
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-id">${product.id}</div>
            <h3>${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="product-price">${product.price} ${currencySign}</div>
            <button onclick="buyProduct('${product.id}')">Купить</button>
        `;

        if (product.type === "RUB") {
            rubProductsContainer.appendChild(card);
        } else {
            zenithProductsContainer.appendChild(card);
        }
    });
}

// Логика покупки товара
window.buyProduct = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (product.type === "RUB") {
        if (rubBalance >= product.price) {
            rubBalance -= product.price;
            alert(`Успешная покупка! Привилегия ${product.name} активирована.`);
        } else {
            alert(`Недостаточно средств на балансе Рублей! Требуется еще ${product.price - rubBalance} ₽.`);
        }
    } else if (product.type === "ZENITH") {
        if (zenithBalance >= product.price) {
            zenithBalance -= product.price;
            alert(`Успешная покупка! Привилегия ${product.name} куплена за очки ZENITH.`);
        } else {
            alert(`Недостаточно валюты ZENITH! Требуется еще ${product.price - zenithBalance} ZENITH.`);
        }
    }
    updateBalancesDisplay();
};

// Запуск при загрузке страницы
updateBalancesDisplay();
renderProducts();let balance=10000;
const el=document.getElementById('balance'), toast=document.getElementById('toast');
function fmt(n){return n.toLocaleString('ru-RU')}
function buy(name,price){
 if(balance<price){show('Недостаточно ZENITH для покупки '+name);return}
 balance-=price; el.textContent=fmt(balance); localStorage.setItem('zenithBalance',balance);
 show('Покупка '+name+' успешно оформлена!');
}
function show(text){toast.textContent=text;toast.style.display='block';setTimeout(()=>toast.style.display='none',2600)}
const saved=localStorage.getItem('zenithBalance');if(saved!==null){balance=Number(saved);el.textContent=fmt(balance)}
