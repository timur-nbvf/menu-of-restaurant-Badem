const items = document.querySelectorAll(".menu-item");
const orderButton = document.getElementById("submit-order");

items.forEach((item) => {
  const plus = item.querySelector(".plus");
  const minus = item.querySelector(".minus");
  const count = item.querySelector(".count");

  plus.addEventListener("click", () => {
    count.textContent = parseInt(count.textContent) + 1;
  });

  minus.addEventListener("click", () => {
    const value = parseInt(count.textContent);
    if (value > 0) {
      count.textContent = value - 1;
    }
  });
});

orderButton.addEventListener("click", () => {
  const order = [];

  items.forEach((item) => {
    const name = item.querySelector(".item-name").textContent;
    const price = item.querySelector(".item-price").textContent;
    const count = parseInt(item.querySelector(".count").textContent);

    if (count > 0) {
      order.push({ name, price, count });
    }
  });

  if (order.length === 0) {
    alert("Выберите хотя бы одно блюдо.");
    return;
  }

  const payload = {
    order: order,
  };

  fetch("/send-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Заказ отправлен!");
      window.location.href = "/payment";
    })
    .catch((err) => {
      console.error(err);
      alert("Произошла ошибка при отправке заказа.");
    });
});
