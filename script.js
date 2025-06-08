function changeQty(btn, delta) {
  const span = btn.parentNode.querySelector('span');
  let qty = parseInt(span.textContent);
  qty = Math.max(0, qty + delta);
  span.textContent = qty;
}

function sendOrder() {
  const dishes = document.querySelectorAll('.dish');
  let order = [];
  let total = 0;

  dishes.forEach(dish => {
    const qty = parseInt(dish.querySelector('.controls span').textContent);
    if (qty > 0) {
      const name = dish.dataset.name;
      const price = parseInt(dish.dataset.price);
      const sum = qty * price;
      total += sum;
      order.push(`${name} - ${qty} шт. × ${price}`);
    }
  });

  const client_id = Telegram.WebApp.initDataUnsafe.user.id;

  fetch('https://c85793f6-3f4b-4465-8591-3285f6fcd0c8-00-2f8dqj76w4b6f.sisko.replit.dev/send-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ order, total, client_id })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "ok") {
      Telegram.WebApp.close();  // Закрыть мини-приложение
    } else {
      alert("Ошибка: " + data.detail);
    }
  });
}
