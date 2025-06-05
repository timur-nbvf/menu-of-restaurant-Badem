function changeQty(btn, delta) {
  const span = btn.parentNode.querySelector('span');
  let qty = parseInt(span.textContent);
  qty = Math.max(0, qty + delta);
  span.textContent = qty;
}

function submitOrder() {
  const urlParams = new URLSearchParams(window.location.search);
  const client_id = urlParams.get("client_id");
  if (!client_id) {
    alert("Ошибка: недостаточно данных (client_id отсутствует).");
    return;
  }

  const dishes = document.querySelectorAll('.dish');
  let orderLines = [];
  let total = 0;

  dishes.forEach(dish => {
    const qty = parseInt(dish.querySelector('.controls span').textContent);
    if (qty > 0) {
      const name = dish.dataset.name;
      const price = parseInt(dish.dataset.price);
      const sum = qty * price;
      orderLines.push(`${name} - ${qty} шт. ${sum.toLocaleString()} сум`);
      total += sum;
    }
  });

  if (orderLines.length === 0) {
    alert("Вы не выбрали ни одного блюда.");
    return;
  }

  const message = `Ваш заказ:\n\n${orderLines.join('\n')}\n\nОбщая сумма заказа: ${total.toLocaleString()} сум`;

  fetch("https://your-server-url/send-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      order: message,
      client_id: client_id
    })
  })
  .then(response => {
    if (!response.ok) throw new Error("Ошибка при отправке заказа");
    window.location.href = "https://example.com/payment";
  })
  .catch(error => {
    alert("Ошибка при отправке заказа: " + error.message);
  });
}
