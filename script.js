let balance=10000;
const el=document.getElementById('balance'), toast=document.getElementById('toast');
function fmt(n){return n.toLocaleString('ru-RU')}
function buy(name,price){
 if(balance<price){show('Недостаточно ZENITH для покупки '+name);return}
 balance-=price; el.textContent=fmt(balance); localStorage.setItem('zenithBalance',balance);
 show('Покупка '+name+' успешно оформлена!');
}
function show(text){toast.textContent=text;toast.style.display='block';setTimeout(()=>toast.style.display='none',2600)}
const saved=localStorage.getItem('zenithBalance');if(saved!==null){balance=Number(saved);el.textContent=fmt(balance)}